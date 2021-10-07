<script setup lang="ts">
import { ref, toRef } from "vue";

const filterOpen = ref(false);
const filterOptions = ref(["quotes", "from", "user"]);

const props = defineProps<{
  filter: string
}>();
const emit = defineEmits([ "filterChanged" ]);

const selectedFilter = toRef(props, "filter");

function changeFilterHandler (option: string) {
  emit('filterChanged', option);

  filterOpen.value = false;
}
</script>

<template>
  <div class="relative inline-block text-left">
    <div class="w-[106px]">
      <button type="button" class="inline-flex justify-between w-full rounded-l-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-sm font-medium capitalize text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:border-gray-200 transition-colors duration-300 focus:outline-none" id="menu-button" aria-expanded="true" aria-haspopup="true" @click="filterOpen = !filterOpen">
        {{ (selectedFilter === "") ? "Filter" : selectedFilter }}
        <i-heroicons-solid-chevron-down class="-mr-1 ml-2 h-5 w-5" />
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      leave-active-class="transition ease-in duration-75"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div class="origin-top-left absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black dark:ring-gray-500 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" v-if="filterOpen">
        <div class="py-1" role="none">
          <button class="block w-full text-left px-4 py-2 text-sm capitalize" role="menuitem" tabindex="-1" v-for="option in filterOptions" :key="option" :class="(option === selectedFilter) ? `bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200` : `text-gray-700 dark:text-gray-300`" @click="changeFilterHandler(option)">{{ option }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>