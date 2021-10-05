<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Theme } from '../types.d';

const theme = ref<Theme | string>();
const titleTheme = ref<string>();

function toggleTheme () {
  switch (theme.value) {
    case Theme.System:
      localStorage.theme = Theme.Light;
      break;

    case Theme.Light:
      localStorage.theme = Theme.Dark;
      break;
  
    default:
      localStorage.theme = Theme.System;
      break;
  }

  updateTheme();
}

function updateTheme () {
  if (!("theme" in localStorage)) {
    localStorage.theme = Theme.System;
  }

  const element = document.querySelector("#app");

  switch (localStorage.theme) {
    case Theme.System:
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        element?.classList.add("dark");
      } else {
        element?.classList.remove("dark");
      }
      break;

    case Theme.Dark:
      element?.classList.add("dark");
      break;

    case Theme.Light:
      element?.classList.remove("dark");
      break;
  }

  theme.value = localStorage.theme;
  parseThemeTitle();
}

function parseThemeTitle () {
  switch (theme.value) {
    case Theme.System:
      titleTheme.value = 'Ubah ke Mode Terang';
      break;

    case Theme.Light:
      titleTheme.value = 'Ubah ke Mode Gelap';
      break;
  
    default:
      titleTheme.value = 'Ubah ke Tema Sistem';
      break;
  }
}

onMounted(function () {
  theme.value = localStorage.getItem("theme") || "system";
  updateTheme();

  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener("change", () => {
      if (theme.value !== Theme.System) return false;

      updateTheme();
    });
});
</script>

<template>
  <div class="relative py-12 flex flex-col items-center">
    <div class="absolute right-4 top-4">
      <button 
        class="p-2 border rounded-full text-gray-900 dark:text-gray-100" 
        :title="titleTheme"
        @click="toggleTheme"
      >
        <i-mdi-circle-half-full v-if="theme === 'system'" />
        <i-ri-sun-line v-else-if="theme === 'light'" />
        <i-ri-moon-clear-line v-else />
      </button>
    </div>

    <h1 class="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">#Quote's</h1>
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
</style>
