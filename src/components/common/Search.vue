<template>
  <div class="relative">
    <span class="uppercase text-xs">{{ label}}</span>
    <input
      v-model="search"
      type="search"
      class="block w-full p-4 bg-gray-100 text-sm text-gray-900 rounded-lg
      focus:ring-sky-500 focus:border-sky-500"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue';

const search = defineModel({ default: "" })
const props = defineProps({
  label: { type: String, default: "Search" },
  placeholder: String,
})
</script>
