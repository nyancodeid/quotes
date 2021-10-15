<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '../utils/theme';
import { isFavoriteShow, toggleFavoriteShow } from "../composables/useFavorite";

const { theme, titleTheme, toggleTheme, updateTheme } = useTheme();

onMounted(function () {
  updateTheme();
});
</script>

<template>
  <div class="relative pt-12 pb-4 md:py-12 flex flex-col items-center">
    <div class="absolute right-4 top-4 md:right-8 md:top-8 space-x-3">
      <button
        @click="toggleFavoriteShow"
        :class="`${isFavoriteShow ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`"
        class="button-toggle-fav p-2 border rounded-full"
      >
        <i-ri-heart-2-fill v-if="isFavoriteShow" />
        <i-ri-heart-2-line v-else />
      </button>
      <button 
        class="button-toggle-theme p-2 border rounded-full text-gray-900 dark:text-gray-100" 
        :title="titleTheme"
        @click="toggleTheme"
      >
        <i-mdi-circle-half-full v-if="theme === 'system'" />
        <i-ri-sun-line v-else-if="theme === 'light'" />
        <i-ri-moon-clear-line v-else />
      </button>
    </div>

    <h1 class="mt-4 md:mt-0 text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">#Quote's</h1>
    <p class="w-11/12 md:w-1/2 mb-4 text-sm md:text-xl text-center text-gray-500 dark:text-gray-50">Kumpulan quote oleh orang-orang hebat di dunia sebagai penasehat dan penyemangat. Dibuat untuk memeriahkan event Hacktoberfest 2021.</p>
    
    <div class="w-11/12 md:w-1/2 flex justify-center mb-4">
      <a class="mr-1" href="https://github.com/nyancodeid/quotes">
        <img src="https://img.shields.io/badge/github-quotes-brightgreen?logo=github&style=flat" alt="Repository">
      </a>
      <a class="mr-1" href="https://github.com/nyancodeid/quotes/pulls">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="Repository">
      </a>
      <a class="mr-1" href="https://github.com/nyancodeid/quotes/issues">
        <img src="https://img.shields.io/github/issues/nyancodeid/quotes" alt="Repository">
      </a>
      <a href="https://github.com/nyancodeid/quotes/pulls">
        <img src="https://img.shields.io/github/issues-pr/nyancodeid/quotes" alt="Repository">
      </a>
    </div>
  </div>
</template>

<style>
.button-toggle-theme, .button-toggle-fav {
  -webkit-tap-highlight-color: transparent;
}
</style>
