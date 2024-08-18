<script setup>
import { ref, inject } from 'vue';
import ArticleList from '../components/modules/articles/ArticleList.vue'

const { savedArticles } = inject("localStore")
const articles = ref(savedArticles.all())
</script>

<template>
  <main>
    <h2 class="pb-4 text-xl font-semibold">Saved Articles</h2>
    <ArticleList :items="articles" />
  </main>
</template>
