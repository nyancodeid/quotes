<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import lozad from 'lozad'

import { IQuote, ISearch } from '../types'
import { chunk, NotEmpty } from '../utils/helpers'
import quotesRaw from '../assets/quotes.json'

import { isFavoriteShow, favoriteLists } from '../composables/useFavorite'
import useDialog from '../composables/useDialog'
import useLozad from '../composables/useLozad'

const CHUNKED_SIZE = 8

const allQuotes = ref<Quote[]>(quotesRaw)
let quotesChunked = chunk(allQuotes.value, CHUNKED_SIZE)

const quotes = ref<IQuote[]>(quotesChunked[0])
const quotesCount = ref(allQuotes.value.length)
const quotesIndex = ref(0)
const galleryElement = ref<HTMLDivElement>()

const { reObserver } = useLozad('img.lozad')
const { isShowDialog, selectedQuote, showDialog, closeDialog } = useDialog()

const isEmpty = computed(() => (quotes.value.length === 0 && quotesIndex.value === 0))

function loadQuotes() {
  if (quotesIndex.value > (quotesChunked.length - 1)) return

  const quotesLists = quotesChunked[quotesIndex.value]

  if (quotes.value.length > 0) {
    quotes.value = [
      ...quotes.value,
      ...quotesLists,
    ]
  }
}

function onSearchChanged(search: ISearch) {
  const filtered = allQuotes.value.filter((quote) => {
    if (search.keyword.length === 0) return true

    switch (search.filter) {
      case 'quotes':
        return (quote.text.toLowerCase().includes(search.keyword.toLowerCase()))
      case 'from':
        return (quote.author.toLowerCase().includes(search.keyword.toLowerCase()))
      case 'user':
        if (!quote.github?.available)
          return (quote.username.toLowerCase().includes(search.keyword.toLowerCase()))

        return (quote.github?.name.toLowerCase().includes(search.keyword.toLowerCase()))
      default:
        return true
    }
  })

  applyfilteredQuotes(filtered)
}

function applyfilteredQuotes(filtered: IQuote[]) {
  quotesChunked = chunk(filtered, CHUNKED_SIZE)
  quotesIndex.value = 0
  quotesCount.value = filtered.length
  quotes.value = quotesChunked[0] || []

  reObserver()
}

const handleScroll = useThrottleFn(() => {
  if (!galleryElement.value) return

  if (galleryElement.value.getBoundingClientRect().bottom < (window.innerHeight + 800)) {
    if (quotesIndex.value < (quotesChunked.length - 1)) {
      quotesIndex.value = quotesIndex.value + 1

      loadQuotes()
      reObserver()
    }
  }
}, 100)

watch([isFavoriteShow, favoriteLists], () => {
  if (isFavoriteShow.value) {
    const filtered: IQuote[] = favoriteLists.value.map((quoteId) => {
      const item = allQuotes.value.find(quote => quote.id === quoteId)

      return item || null
    }).filter(NotEmpty)

    applyfilteredQuotes(filtered)
  }
  else {
    applyfilteredQuotes(allQuotes.value)
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  reObserver()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <quote-dialog :quote="selectedQuote" :show="isShowDialog" @close="closeDialog" />

  <quote-search :count="quotesCount" @searchChanged="onSearchChanged" />

  <div ref="galleryElement" class="flex flex-col items-center justify-center">
    <div class="w-11/12 md:w-3/4 mb-[86px]">
      <div class="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
        <section class="flex" :class="{'col-span-full': isEmpty }">
          <div class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg p-2 bg-gradient-to-br from-red-100 to-blue-100">
            <div class="w-full flex flex-col dark:bg-gray-800 dark:rounded-2.2xl">
              <div class="flex flex-col items-start relative p-6 xl:p-8">
                <h1 class="mb-2 text-gray-800 dark:text-red-100">
                  <i-ri-chat-quote-line class="text-xl md:text-3xl" />
                </h1>
                <p class="font-medium text-lg md:text-2xl text-gray-800 dark:text-red-100 mb-4">
                  <span v-if="!isEmpty">Submit quote milikmu dengan berkontribusi langsung di
                    Repository Github.</span>
                  <span v-else>Quote yang kamu cari tidak ditemukan? <br /><span class="text-base md:text-lg">bantu kami dengan berkontribusi langsung di Repository Github kami.</span></span>
                </p>
              </div>
              <div class="p-6 pt-1 mt-auto">
                <a
                  class="rounded-xl text-sm text-gray-800 bg-gray-300 hover:bg-blue-200 dark:text-red-100 dark:bg-gray-700 dark:hover:bg-gray-900 transition-colors py-2 px-4"
                  href="https://github.com/nyancodeid/quotes#contribute"
                >Kontribusi Sekarang
                  <i-ri-arrow-right-line
                    class="inline-block"
                  /></a>
              </div>
            </div>
          </div>
        </section>
        <section
          v-for="quote in quotes"
          :key="quote.id"
          class="quote-card--container flex cursor-pointer"
          :class="{'md:col-span-2': quote.text.length > 150}"
          @click.stop="showDialog(quote, $event)"
        >
          <quote-card :quote="quote" />
        </section>
      </div>
    </div>
  </div>
</template>

<style></style>
