<template>
  <div class="relative">
    <span class="uppercase text-xs">{{ label}}</span>
    <input
      v-model="date"
      type="date"
      class="block w-full p-4 bg-gray-100 text-sm text-gray-900 rounded-lg
      focus:ring-sky-500 focus:bordesky-500"
      :placeholder="placeholder"
      @keyup.enter="onSearch"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const date = defineModel({ default: "" })
const props = defineProps({
  label: { type: String, default: "Date" },
  placeholder: String,
})
</script>
