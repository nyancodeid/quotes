<script setup lang="ts">
import { ref } from "vue";

const filter = ref("quotes");

const emit = defineEmits([ "searchChanged" ]);

function onFilterChanged (selected: string) {
  filter.value = selected;
}
function onSearchChanged (event: Event) {
  emit('searchChanged', {
    keyword: (event.target as HTMLInputElement).value,
    filter: filter.value,
  });
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-11/12 md:w-3/4 mb-8 p-1 relative">
      <div class="flex justify-between items-center rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 dark:focus-within:ring-offset-gray-800 focus-within:ring-indigo-500">
        <QuotesFilter :filter="filter" @filterChanged="onFilterChanged" />

        <i-heroicons-solid-search class="absolute text-gray-600 dark:text-gray-100 top-3 left-[118px]" />

        <input type="text" @input="onSearchChanged" placeholder="Search" class="pl-9 pr-4 py-2 border border-l-0 border-gray-300 text-sm rounded-r-md w-full transition appearance-none outline-none dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600">
      </div>
    </div>
  </div>
</template>