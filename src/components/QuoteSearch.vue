<script setup lang="ts">
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";

import { Search } from "../types";

const filter = ref("quotes");

const emit = defineEmits<{
  (e: "searchChanged", search: Search): void
}>();

function onFilterChanged (selected: string) {
  filter.value = selected;
}
const onSearchChanged = useDebounceFn((event: Event) => {
  emit('searchChanged', {
    keyword: (event.target as HTMLInputElement).value,
    filter: filter.value,
  });
}, 100);
</script>

<template>
  <div class="search-wrapper">
    <div class="search-container">
      <div class="search-main">
        <quotes-filter :filter="filter" @filterChanged="onFilterChanged" />

        <i-heroicons-solid-search class="search-main--icon" />

        <input class="search-main--input" type="text" @input="onSearchChanged" placeholder="Search">
      </div>
    </div>
  </div>
</template>

<style>
.search-wrapper {
  @apply flex flex-col items-center justify-center;
}
.search-wrapper .search-container {
  @apply w-11/12 md:w-3/4 mb-8 p-1 relative;
}
.search-wrapper .search-container .search-main {
  @apply flex justify-between items-center rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 dark:focus-within:ring-offset-gray-800 focus-within:ring-indigo-500;
}
.search-wrapper .search-container .search-main .search-main--icon {
  @apply absolute text-gray-600 dark:text-gray-100 top-3 left-[118px];
}
.search-wrapper .search-container .search-main .search-main--input {
  @apply pl-9 pr-4 py-2 border border-l-0 bg-gray-100 focus:bg-gray-50 border-gray-300 text-sm rounded-r-md w-full transition appearance-none outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-500;
}
</style>