<script setup lang="ts">
import { ref, toRef, computed, withDefaults } from 'vue'

import { Quote } from '../types'
import { isValidLink } from '../utils/helpers'
import { gradients } from '../utils/gradients'

import useSaveCard from '../composables/useSaveCard'
import { isFavorite, toggleIsFavorite } from '../composables/useFavorite'

const props = withDefaults(defineProps<{
  quote: Quote
  size?: string
}>(), {
  size: 'sm',
})

const quote = toRef(props, 'quote')
const size = toRef(props, 'size')

const { card, saveCard } = useSaveCard()

const isFavorited = computed(() => isFavorite(quote.value.id))

function getGradientByIndex(index = 0) {
  return gradients[index]
}
</script>

<template>
  <div ref="card" class="w-full relative text-white overflow-hidden flex rounded-3xl shadow-lg p-2" :class="((size === 'lg') ? 'md:scale-150 md:hover:scale-160' : 'md:hover:rotate-1 md:hover:scale-105 duration-300') + ' ' + getGradientByIndex(quote.gradient_id)">
    <div class="w-full flex flex-col dark:bg-gray-800 dark:rounded-2.2xl">
      <div class="flex flex-col items-start relative p-6 xl:p-8">
        <h2 class="text-xl font-semibold mb-2">
          <i-ri-double-quotes-l />
        </h2>
        <p class="font-medium text-white mb-4" :class="(size === 'lg') ? 'text-xl md:text-lg' : 'text-lg'">
          {{ quote.text }}
        </p>
        <p v-if="isValidLink(quote.author_detail_url)" class="text-sm text-gray-100">
          - <a :href="quote.author_detail_url" target="_blank" :title="`Read more about ${quote.author}`" rel="noreferrer nofollow" class="pb-1 hover:border-b-2 hover:border-gray-200">{{ quote.author }}</a>
        </p>
        <p v-else class="text-sm text-gray-100">
          - {{ quote.author }}
        </p>
      </div>
      <div class="mt-auto p-6 pt-1">
        <div v-if="quote.github?.available" class="flex items-center">
          <img
            v-if="(size !== 'lg')"
            :data-src="`${quote.github?.avatar_url}&s=24`"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            class="lozad rounded-full bg-gray-800 mr-2 mt-[2px] mb-1"
            width="24"
            height="24"
            alt="Github Profile Pic"
          />
          <img
            v-else
            :src="`${quote.github?.avatar_url}&s=72`"
            class="rounded-full bg-gray-800 mr-2 mt-[2px] mb-1"
            width="24"
            height="24"
            alt="Github Profile Pic"
          />

          <div class="flex flex-col flex-1">
            <div>
              <a class="text-xs" :href="`https://github.com/${quote.username}`" nofollow="true" target="_blank">{{ quote.github?.name }}</a>
            </div>

            <div class="flex items-center">
              <span class="text-xs mr-2 text-white text-opacity-80">
                <span class="font-bold text-white">{{ quote.github?.followers }}</span> followers
              </span>
            </div>
          </div>

          <div class="flex">
            <div class="p-2 rounded-full hover:bg-black hover:bg-opacity-25 transition-colors hide-on-save button-favorite cursor-pointer" :class="{ 'dark:text-red-500 dark:hover:bg-red-500 dark:hover:bg-opacity-20': isFavorited }" title="Jadikan sebagai yang di favoritkan" @click.stop="toggleIsFavorite(quote.id)">
              <i-ri-heart-2-fill v-if="isFavorited" />
              <i-ri-heart-2-line v-else />
            </div>

            <div v-if="(size === 'lg')" class="p-2 rounded-full hover:bg-black hover:bg-opacity-25 dark:hover:bg-gray-600 transition-colors hide-on-save button-save cursor-pointer" title="Simpan quote menjadi gambar" @click.stop="saveCard">
              <i-ri-save-line />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
