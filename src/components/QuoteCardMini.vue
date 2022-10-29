<script setup lang="ts">
import { toRef } from 'vue'

import { IQuote } from '../types.d'
import { gradients } from '../utils/gradients'
import { isValidLink } from '../utils/helpers'

const props = defineProps<{
  quote: IQuote
}>()

const quote = toRef(props, 'quote')

function getGradientByIndex(index = 0) {
  return gradients[index]
}
function truncateText(text: string, length = 52) {
  return `${text.substring(0, length).trimEnd()}...`
}
</script>

<template>
  <div ref="card" class="card-size--mini w-full relative text-white overflow-hidden flex rounded-3xl shadow-lg p-2" :class="getGradientByIndex(quote.gradient_id)">
    <div class="w-full flex flex-col dark:bg-gray-800 dark:rounded-2.2xl">
      <div class="card-content flex flex-col items-start relative p-3 xl:p-5">
        <a :href="`/quote/${quote.slug}`" target="_blank" class="absolute top-4 right-6 p-2 rounded-full hover:bg-black hover:bg-opacity-25 dark:hover:bg-gray-600 transition-colors hide-on-save button-save cursor-pointer" @click.stop>
          <i-mdi-open-in-new />
        </a>

        <h2 class="card-content--icon flex-1">
          <i-ri-double-quotes-l />
        </h2>
        <p class="card-content--text">
          {{ truncateText(quote.text) }}
        </p>
        <p v-if="isValidLink(quote.author_detail_url)" class="card-content--author text-sm text-gray-100">
          - <a :href="quote.author_detail_url" target="_blank" :title="`Read more about ${quote.author}`" rel="noreferrer noopener" class="pb-1 hover:border-b-2 hover:border-gray-200">{{ quote.author }}</a>
        </p>
        <p v-else class="card-content--author text-sm md:whitespace-nowrap text-gray-100">
          - {{ quote.author }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.card-size--mini {
  @apply md:hover:rotate-1 md:hover:scale-105 duration-300;
}
.card-size--mini .card-content .card-content--text {
  @apply text-lg;
}
</style>
