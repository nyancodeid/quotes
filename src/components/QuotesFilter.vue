<script setup lang="ts">
import { ref, toRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  filter: string
}>()
const emit = defineEmits<{
  (e: 'filterChanged', filter: string): void
}>()

const filterOpen = ref(false)
const selectedFilter = toRef(props, 'filter')
const filterPopupElement = ref<HTMLDivElement>()
const filterOptions = ref(['quotes', 'from', 'user'])

onClickOutside(filterPopupElement, () => {
  if (filterOpen.value) filterOpen.value = false
})

function changeFilterHandler(option: string) {
  emit('filterChanged', option)

  filterOpen.value = false
}
</script>

<template>
  <div ref="filterPopupElement" class="filter-container">
    <div class="filter-button--container">
      <button
        id="menu-button"
        type="button"
        class="filter-button"
        aria-label="Search Filter"
        aria-expanded="true"
        aria-haspopup="true"
        @click="filterOpen = !filterOpen"
      >
        <span class="hidden md:inline-block">{{ selectedFilter }}</span>
        <i-heroicons-outline-filter class="h-5 w-5 md:hidden" />

        <i-heroicons-solid-chevron-down class="hidden md:inline-block -mr-1 ml-2 h-5 w-5" />
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
      <div
        v-if="filterOpen"
        class="filter-popup--container"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <button
            v-for="option in filterOptions"
            :key="option"
            class="filter-popup--menu-item"
            role="menuitem"
            tabindex="-1"
            :class="{ active: (option === selectedFilter) }"
            @click="changeFilterHandler(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.filter-container {
  @apply relative inline-block text-left;
}
.filter-button--container {
  @apply w-[48px] md:w-[106px];
}
.filter-button--container button.filter-button {
  @apply inline-flex justify-between w-full rounded-l-md border border-gray-300 dark:border-gray-500 shadow-sm px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm font-medium capitalize text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:border-gray-200 transition-colors duration-300 focus:outline-none;
}
.filter-popup--container {
  @apply origin-top-left absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black dark:ring-gray-500 ring-opacity-5 focus:outline-none;
}
.filter-popup--container button.filter-popup--menu-item {
  @apply block w-full text-left px-4 py-2 text-sm capitalize text-gray-700 dark:text-gray-300;
}
.filter-popup--container button.filter-popup--menu-item.active {
  @apply bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200;
}
</style>
