<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'

import useLozad from '../composables/useLozad'

import { IQuote } from '../types.d'
import { generateQuoteMeta } from '../utils/meta'

const route = useRoute()
const { reObserver } = useLozad('img.lozad')

useHead(generateQuoteMeta(route.meta.quote))

const quote = ref<IQuote>(route.meta.quote)

onMounted(() => {
  reObserver()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div v-if="!!quote" class="flex flex-col w-11/12 md:w-6/12 mb-[86px]">
      <div class="grid grid-flow-row-dense grid-cols-1 gap-5 md:gap-6 xl:gap-8">
        <quote-card :quote="quote" size="xl" class="z-20 p-3" />
      </div>
      <div class="mt-6">
        <quote-more :id="quote.id" :author="quote.author" />
      </div>
    </div>
  </div>
</template>

<style>
.quote-card--page-view {
  @apply md:hover:rotate-0;
}
</style>
