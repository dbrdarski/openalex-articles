<template>
  <ul class="divide-gray-200 dark:divide-gray-700">
    <li class="pb-3 sm:pb-4"
      v-for="item in items"
      :key="item.id"
    >
      <ArticleItem
        :item="item"
      />
    </li>
  </ul>
</template>

<script setup>
import ArticleItem from './ArticleItem.vue'
import { defineProps } from 'vue';

const props = defineProps(['items'])
</script>
