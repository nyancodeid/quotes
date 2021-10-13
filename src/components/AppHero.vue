<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { usePreferredDark, useStorage } from "@vueuse/core";
import { Theme } from "../types.d";
import { showLikeToggle, isShowLike } from "../utils/likeQuote";

const theme = useStorage("theme", Theme.System);
const isSystemDark = usePreferredDark();

watch(isSystemDark, (_) => {
  if (theme.value === Theme.System) {
    updateTheme();
  }
});

const themeSteps = computed<Array<string>>(() => {
  return isSystemDark.value
    ? [Theme.System, Theme.Light, Theme.Dark]
    : [Theme.System, Theme.Dark, Theme.Light];
});

const themeIndex = computed<number>(() => {
  return themeSteps.value.findIndex((t) => t === theme.value);
});

const nextTheme = computed<Theme | string>(() => {
  const nextThemeIndex = (themeIndex.value + 1) % themeSteps.value.length;
  return themeSteps.value[nextThemeIndex];
});

function toggle() {
  showLikeToggle();
}

const titleTheme = computed<string>(() => {
  switch (nextTheme.value) {
    case Theme.Dark:
      return "Ubah ke Mode Gelap";

    case Theme.Light:
      return "Ubah ke Mode Terang";

    default:
      return "Ubah ke Tema Sistem";
  }
});

function toggleTheme() {
  theme.value = nextTheme.value;

  updateTheme();
}

function updateTheme() {
  const element = document.querySelector("#app");

  switch (theme.value) {
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
}

onMounted(function () {
  updateTheme();
});
</script>

<template>
  <div class="relative py-12 flex flex-col items-center">
    <div
      class="absolute right-4 top-4 md:right-8 md:top-8 space-x-3"
      title="tampilkan quote yang disukai"
    >
      <button
        @click="toggle"
        :class="`${isShowLike ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`"
        class="rounded-full p-2 border border-white"
      >
        <svg
          v-if="isShowLike"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <button
        class="
          button-toggle-theme
          p-2
          border
          rounded-full
          text-gray-900
          dark:text-gray-100
        "
        :title="titleTheme"
        @click="toggleTheme"
      >
        <i-mdi-circle-half-full v-if="theme === 'system'" />
        <i-ri-sun-line v-else-if="theme === 'light'" />
        <i-ri-moon-clear-line v-else />
      </button>
    </div>

    <h1
      class="
        text-6xl
        font-bold
        mb-4
        text-transparent
        bg-clip-text bg-gradient-to-br
        from-pink-400
        to-purple-600
      "
    >
      #Quote's
    </h1>
    <p
      class="
        w-11/12
        md:w-1/2
        mb-4
        text-sm
        md:text-xl
        text-center text-gray-500
        dark:text-gray-50
      "
    >
      Kumpulan quote oleh orang-orang hebat di dunia sebagai penasehat dan
      penyemangat. Dibuat untuk memeriahkan event Hacktoberfest 2021.
    </p>

    <div class="w-11/12 md:w-1/2 flex justify-center mb-4">
      <a class="mr-1" href="https://github.com/nyancodeid/quotes">
        <img
          src="https://img.shields.io/badge/github-quotes-brightgreen?logo=github&style=flat"
          alt="Repository"
        />
      </a>
      <a class="mr-1" href="https://github.com/nyancodeid/quotes/pulls">
        <img
          src="https://img.shields.io/badge/PRs-welcome-brightgreen"
          alt="Repository"
        />
      </a>
      <a class="mr-1" href="https://github.com/nyancodeid/quotes/issues">
        <img
          src="https://img.shields.io/github/issues/nyancodeid/quotes"
          alt="Repository"
        />
      </a>
      <a href="https://github.com/nyancodeid/quotes/pulls">
        <img
          src="https://img.shields.io/github/issues-pr/nyancodeid/quotes"
          alt="Repository"
        />
      </a>
    </div>
  </div>
</template>

<style>
.button-toggle-theme {
  -webkit-tap-highlight-color: transparent;
}
</style>
