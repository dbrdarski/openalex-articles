import { provide } from "vue"
import { createPersistentStore } from "./localStorageWrapper"

const openAlexStore = createPersistentStore("Open-Alex")
const articles = openAlexStore.createTable("Articles", "id")

export default {
  install (app, options) {
    app.provide("localStore", { articles })
  }
}
