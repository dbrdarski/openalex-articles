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
    createEntity(entityName, primaryKey) {
      validateName(entityName, "Table name")
      if (tables.has(entityName)) {
        throw Error(`Table '${entityName}' already exists in  store '${storeName}'!`)
      }
      const tableKey = `${storeName}--${entityName}`
      const getPrimaryKey = record => validatePrimaryKey(record[primaryKey])
      const createRecordKey = pk => `${tableKey}--#${pk}`

      const records = new Map()
      const indexes = new Map()

      return {
        createIndex(indexName) {
          if (indexes.has(indexName)) {
            throw Error(`Index '${indexName}' already exists in  store '${storeName}.${entityName}'!`)
          }

          const index = new Set()
          indexes.set(indexName, index)

          const indexKey = `${tableKey}.${indexName}`
          const updateRecordIndex = () => {
            localStorage.setItem(indexKey, JSON.stringify(Array.from(index)))
          }

          const loadRecords = () => {
            for (const pk of JSON.parse(localStorage.getItem(indexKey) ?? "[]")) {
              index.add(pk)
              const recordKey = createRecordKey(pk)
              const recordJSON = localStorage.getItem(recordKey)
              recordJSON && records.set(pk, JSON.parse(recordJSON))
            }
          }

          const removeRecord = (pk) => {
            const inUse = Array.from(indexes, mapValue)
              .find((index) => index.has(pk))

            if (!inUse) {
              records.delete(pk)
              localStorage.removeItem(createRecordKey(pk))
            }
          }

          const store = {
            save(record) {
              const pk = getPrimaryKey(record)
              store.add(pk, record)
            },
            add(pk, record) {
              const recordKey = createRecordKey(pk)
              index.add(pk)
              records.set(pk, record)
              localStorage.setItem(recordKey, JSON.stringify(record))
              updateRecordIndex()
            },
            remove(pk) {
              index.delete(pk)
              removeRecord(pk)
              updateRecordIndex()
            },
            has(pk) {
              return index.has(pk)
            },
            get(pk) {
              return index.has(pk) ? records.get(pk) : null
            },
            all() {
              return Array.from(index, store.get)
            },
            drop() {
              Array.from(index, store.remove)
              return true
            }
          }

          loadRecords()

          return store

        }
      }
    }
  }
}
