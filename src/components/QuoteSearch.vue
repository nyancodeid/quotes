<script setup lang="ts">
import { ref, toRef } from "vue";
import { debouncedWatch } from "@vueuse/core";

import { Search } from "../types";

const props = defineProps<{
  count: number
}>();
const emit = defineEmits<{
  (e: "searchChanged", search: Search): void
}>();

const count = toRef(props, "count");
const filter = ref("quotes");
const search = ref("");

function onFilterChanged (selected: string) {
  filter.value = selected;
}
const clearSearch = () => {
  search.value = "";

  emit('searchChanged', {
    keyword: "",
    filter: filter.value,
  });
}

debouncedWatch(search, () => {
  emit('searchChanged', {
    keyword: search.value,
    filter: filter.value,
  });
}, { debounce: 100 });
</script>

<template>
  <div class="search-wrapper">
    <div class="search-container">
      <div class="search-main">
        <quotes-filter :filter="filter" @filterChanged="onFilterChanged" />

        <i-heroicons-solid-search class="search-main--icon" />

        <div class="search-main--action">
          <span class="action-badge"><b>{{ count }}</b> quotes</span>
          <button v-if="search.length > 0" class="action-badge" @click="clearSearch"><i-mdi-close-circle-outline class="inline-block" /> clear</button>  
        </div>

        <input class="search-main--input" type="text" v-model="search" placeholder="Search">
      </div>
    </div>
  </div>
</template>

<style>
.search-wrapper {
  @apply flex flex-col items-center justify-center;
}
.search-container {
  @apply w-11/12 md:w-3/4 mb-8 p-1 relative;
}
.search-main {
  @apply flex justify-between items-center rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 dark:focus-within:ring-offset-gray-800 focus-within:ring-indigo-500;
}
.search-main--icon {
  @apply absolute text-gray-600 dark:text-gray-100 top-3 left-[62px] md:left-[118px];
}
.search-main--action {
  @apply flex absolute right-1 text-right z-10;
}
.search-main--action .action-badge {
  @apply text-[11px] leading-[20px] py-0 px-[7px] inline-block mr-2 md:mr-3 rounded-xl ring-1 text-purple-800 dark:text-purple-400 ring-purple-300 bg-[#e0daf8] dark:bg-[#1c2332];
}
.search-main--input {
  @apply pl-9 pr-4 py-2 border border-l-0 bg-gray-100 focus:bg-gray-50 border-gray-300 text-sm rounded-r-md w-full transition appearance-none outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-500;
}
</style>