import { provide } from "vue"
import { createPersistentStore } from "./localStorageWrapper"

const openAlexStore = createPersistentStore("Open-Alex")
const articles = openAlexStore.createEntity("Articles", "id")
const savedArticles = articles.createIndex("Saved")
const searchedArticles = articles.createIndex("Search")

export default {
  install (app, options) {
    app.provide("localStore", { savedArticles, searchedArticles })
  }
}
