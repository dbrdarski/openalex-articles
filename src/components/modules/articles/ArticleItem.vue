<template>
  <div class="flex items-center rtl:space-x-reverse bg-gray-100 p-4">
    <div class="flex-shrink-0 min-w-6">
      <div
        :title="saved ? 'Remove article' : 'Save article'"
        class="hover:bg-gray-300 p-2 mr-4 rounded-full cursor-pointer"
        @click="toggleSaved"
      >
        <Heart :full="saved" />
      </div>
    </div>
    <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate pb-1">
        {{item.title}}
        </p>
        <p class="text-sm text-gray-500 truncate">
          Authorship:
          <Tag
            v-for="authorship in item.authorships"
            :key="authorship.author.id"
            :item="authorship.author"
            keyname="display_name"
          />
        </p>
        <p class="text-sm text-gray-500 truncate">
          Topics:
          <Tag
            v-for="topic in item.topics"
            :key="topic.id"
            :item="topic"
            keyname="display_name"
          />
        </p>
        <p class="text-sm text-gray-500 truncate">
          Tags:
          <Tag
            v-for="topic in item.keywords"
            :key="topic.id"
            :item="topic"
            keyname="display_name"
          />
        </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, inject } from 'vue'
import Tag from "../../common/Tag.vue"
import Heart from "../../common/Heart.vue"

const { savedArticles } = inject("localStore")
const toggleSaved = () => {
  saved.value ? savedArticles.remove(props.item.id) : savedArticles.add(props.item.id, props.item)
  saved.value = !saved.value
}

const props = defineProps({
  item: Object
})

const saved = ref(savedArticles.has(props.item.id))

</script>
