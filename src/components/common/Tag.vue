<template>
  <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5">
    {{ label }}
  </span>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  item: Object,
  keyname: 'string'
})

const label = computed(() => props.item[props.keyname])
</script>
