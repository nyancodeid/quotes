<script setup lang="ts">
import { ref, onMounted } from 'vue'
import rawQuotes from '../assets/quotes.json'

import { IQuote } from '../types.d'
import { shuffle } from '../utils/helpers'

const props = defineProps<{
  id: string
  author: string
}>()

const getQuotesByAuthor = (): IQuote[] => {
  const filtered = rawQuotes.filter(quote => (quote.author === props.author && quote.id !== props.id))

  return shuffle(filtered).slice(0, 4)
}

const quotes = ref<IQuote[]>([])

onMounted(() => {
  quotes.value = getQuotesByAuthor()
})
</script>

<template>
  <div v-if="quotes.length > 0">
    <h2 class="mt-12 mb-5 text-xl dark:text-white">
      Quotes lain dari {{ author }} :
    </h2>
    <div class="grid grid-flow-row-dense grid-cols-2 gap-5">
      <section v-for="quote in quotes" :key="quote.id" class="quote-card--container flex cursor-pointer">
        <quote-card-mini :quote="quote" />
      </section>
    </div>
  </div>
</template>

<style></style>
