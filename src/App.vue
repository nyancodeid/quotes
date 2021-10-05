<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(function() {
  const element = document.querySelector("#app");

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    element?.classList.add('dark');
  } else {
    element?.classList.remove('dark');
  }

  if (!('theme' in localStorage) && element?.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
</script>

<template>
  <div class="app-container dark:bg-gray-800 transition-colors">
    <app-hero />
    <quote-gallery />

    <div class="flex justify-center pb-[54px]">
      <span class="text-gray-400 text-xs">Copyright &copy; 2021 - Build with <i-ri-heart-fill class="text-red-500 inline-block" /> from Indonesia</span>
    </div>
  </div>
</template>

<style>
</style>
