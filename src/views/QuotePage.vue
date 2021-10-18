<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import useLozad from '../composables/useLozad'

import { Quote } from '../types.d'
import { shuffle } from '../utils/helpers'
import QuoteLists from '../assets/quotes.json'

const route = useRoute()
const { reObserver } = useLozad('img.lozad')

const slug = route.params.slug
const quote = ref<Quote>()
const quotes = ref<Quote[]>([])

function findQuoteBySlug(slug: string | string[]) {
  return (QuoteLists as Quote[]).find(quote => quote.slug === slug)
}

onMounted(() => {
  const selectedQuote = findQuoteBySlug(slug)

  if (!selectedQuote) return false

  quote.value = selectedQuote

  quotes.value = shuffle((QuoteLists as Quote[])
    .filter(quote => quote.text.length <= 100))
    .slice(0, 4)

  reObserver()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div v-if="!!quote" class="flex flex-col w-11/12 md:w-3/4 mb-[86px]">
      <div class="grid grid-flow-row-dense grid-cols-1 gap-5 md:gap-6 xl:gap-8">
        <quote-card :quote="quote" size="xl" />
      </div>

      <h2 class="text-xl text-gray-700 dark:text-gray-200 my-5 md:my-6 xl:my-8">
        Quote yang lain
      </h2>

      <div class="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
        <section
          v-for="item in quotes"
          :key="item.id"
          class="quote-card--container flex cursor-pointer last:hidden 2xl:last:flex"
          :class="{'md:col-span-2': quote.text.length > 150}"
        >
          <quote-card :quote="item" />
        </section>
      </div>
    </div>
  </div>
</template>

<style>
.quote-card--page-view {
  @apply md:hover:rotate-0;
}
</style>
