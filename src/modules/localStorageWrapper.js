const mapKey = ([key]) => key
const mapValue = ([_, value]) => value

const validateName = (name, description) => {
  if (!name || typeof name !== "string") {
    throw Error(`${description} must be a non empty string`)
  }
}

const validatePrimaryKey = (key) => {
  if (!key) {
    throw Error('Invalid primary key')
  }
  return key
}

export function createPersistentStore(storeName) {
  validateName(storeName, "Store name")
  const tables = new Set

  return {
    createTable(tableName, primaryKey) {
      validateName(tableName, "Table name")
      if (tables.has(tableName)) {
        throw Error(`Table '${tableName}' already exists in  store '${storeName}'!`)
      }
      const tableKey = `${storeName}--${tableName}`
      const getPrimaryKey = record => validatePrimaryKey(record[primaryKey])
      const createRecordKey = pk => `${tableKey}--#${pk}`

      const records = new Map()

      const loadRecords = () => {
        for (const pk of JSON.parse(localStorage.getItem(tableKey) ?? "[]")) {
          const recordKey = createRecordKey(pk)
          const recordJSON = localStorage.getItem(recordKey)
          recordJSON && records.set(pk, JSON.parse(recordJSON))
        }
      }

      const updateRecordIndex = () => {
        localStorage.setItem(tableKey, JSON.stringify(Array.from(records, mapKey)))
      }

      const store = {
        save(record) {
          const pk = getPrimaryKey(record)
          store.add(pk, record)
        },
        add(pk, record) {
          const recordKey = createRecordKey(pk)
          records.set(pk, record)
          localStorage.setItem(recordKey, JSON.stringify(record))
          updateRecordIndex()
        },
        remove(pk) {
          records.delete(pk)
          localStorage.removeItem(createRecordKey(pk))
          updateRecordIndex()
        },
        has(pk) {
          return records.has(pk)
        },
        get(pk) {
          return records.get(pk)
        },
        all() {
          return Array.from(records, mapValue)
        },
      }

      loadRecords()

      return store
    }
  }
}
