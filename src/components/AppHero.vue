<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { usePreferredDark } from '@vueuse/core';
import { Theme } from '../types.d';

const theme = ref<Theme | string>();
const isSystemDark = usePreferredDark();

watch(isSystemDark, _ => {
  if (theme.value === Theme.System) {
    updateTheme();
  }
});

const themeSteps = computed<Array<string>>(() => {
  return isSystemDark.value
    ? [Theme.System, Theme.Light, Theme.Dark]
    : [Theme.System, Theme.Dark, Theme.Light];
});

function getNextTheme () {
  const themeIndex = themeSteps.value.findIndex(t => t === theme.value);
  const nextThemeIndex = (themeIndex + 1) % themeSteps.value.length;

  return themeSteps.value[nextThemeIndex];
}

const titleTheme = computed<string>(() => {
  switch (getNextTheme()) {
    case Theme.Dark:
      return 'Ubah ke Mode Gelap';

    case Theme.Light:
      return 'Ubah ke Mode Terang';
  
    default:
      return 'Ubah ke Tema Sistem';
  }
});

function toggleTheme () {
  localStorage.theme = getNextTheme();
  updateTheme();
}

function updateTheme () {
  if (!("theme" in localStorage)) {
    localStorage.theme = Theme.System;
  }

  const element = document.querySelector("#app");

  switch (localStorage.theme) {
    case Theme.System:
      if (isSystemDark.value) {
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
}

onMounted(function () {
  theme.value = localStorage.getItem("theme") || "system";
  updateTheme();
});
</script>

<template>
  <div class="relative py-12 flex flex-col items-center">
    <div class="absolute right-4 top-4 md:right-8 md:top-8">
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
.button-toggle-theme {
  -webkit-tap-highlight-color: transparent;
}
</style>
