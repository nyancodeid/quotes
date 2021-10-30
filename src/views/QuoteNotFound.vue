<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'

import { shuffle } from '../utils/helpers'

useHead({
  title: 'Quotes — Not Found',
})

const notFoundCharLists = [
  '(◕‿‿◕｡)',
  '(ಥ﹏ಥ)',
  '\(^Д^)/',
  '(ﾉ◕ヮ◕)ﾉ',
  '(^_^)b',
  'ಠ╭╮ಠ',
  '(o^^)o',
  '(~˘▾˘)~',
  'ᕙ(⇀‸↼‶)ᕗ',
  '(；一_一)',
]

const notFoundChar = ref('')

const shuffleChar = () => {
  notFoundChar.value = shuffle([
    ...notFoundCharLists,
    ...notFoundCharLists,
  ])[0]
}

onMounted(() => {
  shuffleChar()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col w-11/12 md:w-6/12 mb-[86px] text-center">
      <span class="block text-emoji-font text-[140px] mb-8 dark:text-gray-100">{{ notFoundChar }}</span>
      <span class="block text-2xl mb-8 dark:text-gray-100">Halaman yang anda tuju tidak dapat ditemukan.</span>

      <div class="flex justify-center">
        <a href="/" class="mr-2 px-6 py-3 rounded-xl text-purple-800 bg-gray-200 dark:text-yellow-300 dark:bg-gray-600">
          <i-mdi-home-outline class="inline-block" />
          Home
        </a>
        <button class="px-6 py-3 rounded-xl text-purple-800 bg-gray-200 dark:text-yellow-300 dark:bg-gray-600" @click="shuffleChar">
          <i-ri-shuffle-fill class="inline-block" />
          Acak Emoji
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.text-emoji-font {
  font-family: Helvetica Neue,sans-serif;
}
</style>
