<template>
  <div class="max-w-md">
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input
        v-model="search"
        type="search"
        class="block w-full p-4 ps-10 bg-gray-100 text-sm text-gray-900 rounded-lg
        focus:ring-blue-500 focus:border-blue-500"
        :placeholder="placeholder"
        @keyup.enter="onSearch"
      />
      <button
        type="submit"
        class="text-white absolute end-2.5 bottom-2.5 bg-sky-700 hover:bg-sky-800
          active:outline-none active:ring-blue-300 text-xs uppercase
          font-medium rounded-lg px-4 py-2 dark:bg-sky-600 dark:hover:bg-sky-700
          dark:active:ring-blue-800 focus:bg-sky-800"
        @click="onSearch"
      >{{ buttonLabel }}</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const emit = defineEmits(['search'])
const search = ref("")

const onSearch = () => {
  emit("search", search.value)
}

const props = defineProps({
  label: { type: String, default: "Search" },
  placeholder: String,
  buttonLabel: { type: String, default: "Search" },
})
</script>
