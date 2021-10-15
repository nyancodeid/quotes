<script setup lang="ts">
import { toRef, withDefaults } from "vue";

import { Quote } from "../types";
import { useSaveQuoteCard } from "../utils/save-card";
import { isValidLink } from "../utils/helpers";
import { gradients } from "../utils/gradients"; 

const props = withDefaults(defineProps<{
  quote: Quote;
  size?: string
}>(), {
  size: "sm"
});

const quote = toRef(props, "quote");
const size = toRef(props, "size");

const { card, exportCard } = useSaveQuoteCard();

function getGradientByIndex (index: number = 0) {
  return gradients[index];
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
        <p class="text-sm text-gray-100" v-if="isValidLink(quote.author_detail_url)">- <a :href="quote.author_detail_url" target="_blank" :title="`Read more about ${quote.author}`" rel="noreferrer nofollow" class="pb-1 hover:border-b-2 hover:border-gray-200">{{ quote.author }}</a></p>
        <p class="text-sm text-gray-100" v-else>- {{ quote.author }}</p>
      </div>
      <div class="mt-auto p-6 pt-1">
        <div class="flex items-center" v-if="quote.github?.available">
          <img v-if="quote.github?.avatar_url" :data-src="`${quote.github?.avatar_url}&s=${size === 'lg' ? '48' : '24'}`" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lozad rounded-full bg-gray-800 w-[24px] h-[24px] mr-2 mt-[2px] mb-1" alt="Github Profile Pic" />

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

          <div v-if="(size === 'lg')" class="p-2 rounded-full hover:bg-black hover:bg-opacity-25 dark:hover:bg-gray-600 transition-colors button-save cursor-pointer" title="Simpan quote menjadi gambar" @click.stop="exportCard">
            <i-ri-save-line class="button-save cursor-pointer" /> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
