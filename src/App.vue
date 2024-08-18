<script setup>
import Header from "./components/sections/Header.vue"
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />
  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
.main-content {
  padding: 1em;
}
</style>
