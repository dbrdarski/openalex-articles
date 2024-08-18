<script setup>
import axios from "axios"
import { ref, onMounted } from "vue";

import ArticleList from '../components/modules/articles/ArticleList.vue'
import Search from "../components/common/Search.vue"

const articles = ref([])
const fetchArticles = (options) => axios.get(`https://api.openalex.org/works?${new URLSearchParams(options).toString()}`)
const getArticles = async (search = "", { page = 1, perPage = 10 } = {}) => {
  articles.value = (await fetchArticles({ page, "per-page": perPage, search }))?.data?.results
}

onMounted(() => {
  getArticles()
})

</script>

<template>
  <main>
    <h2 class="pb-4 text-xl font-semibold">Science Article Search</h2>
    <Search
      placeholder="Search artiles"
      class="pb-4"
      @search="getArticles"
    />
    <ArticleList :items="articles" />
  </main>
</template>
