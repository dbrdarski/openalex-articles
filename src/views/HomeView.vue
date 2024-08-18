<template>
  <main>
    <h2 class="pb-4 text-xl font-semibold">Science Article Search</h2>
    <div class="pb-4 flex gap-4 items-end">
      <Search
        label="Search articles"
        class="max-w-md flex-grow"
        placeholder="Publicaion title, abstract, fulltext..."
        v-model="search"
      />
      <MaskedDateInput
        v-model="from"
        label="From"
        class="max-w-xs"
      />
      <MaskedDateInput
        v-model="to"
        label="To"
        class="max-w-sm"
      />
      <button
        type="submit"
        class="text-white bg-sky-700 hover:bg-sky-800 flex gap-2 relative
          active:outline-none active:ring-sky-300 text-sm uppercase
          font-medium rounded-lg p-6 py-4 focus:bg-sky-800"
          @click="getArticles(
            search,
            createFilters({ from_publication_date: from, to_publication_date: to })
          )"
      >
      <div class="inset-y-0 start-0 -translate-x-1 translate-y-0.5">
        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      Search</button>
    </div>
    <ArticleList :items="articles" />
  </main>
</template>

<script setup>
import axios from "axios"
import { ref, inject } from "vue";

import ArticleList from '../components/modules/articles/ArticleList.vue'
import Search from "../components/common/Search.vue"
import MaskedDateInput from "../components/common/MaskedDateInput.vue"

const { searchedArticles } = inject("localStore")
const articles = ref(searchedArticles.all())
const search = localStorage.getItem("ArticleSearch")
const from = ref()
const to = ref()

const createFilters = (filters) => Object.entries(filters)
  .filter(([_, value]) => value)
  .map(([key, value]) => `${key}:${value}`)
  .join("+")

const fetchArticles = (options) => axios.get(`https://api.openalex.org/works?${new URLSearchParams(options).toString()}`)

// limited perPage items to 10 for smaller payloads, 'page' and 'perPage' are not used as pagination is not implemented
const getArticles = async (search = "", filter, { page = 1, perPage = 10 } = {}) => {
  const results = articles.value = (await fetchArticles({
    search,
    page,
    "per-page": perPage,
    ...filter && { filter },
  }))?.data?.results

  localStorage.setItem("ArticleSearch", search)
  searchedArticles.drop()
  for (const article of results) {
    searchedArticles.save(article)
  }
}
</script>
