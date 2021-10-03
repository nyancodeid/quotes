<script setup lang="ts">
import { defineProps, ref, toRef } from "vue";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { gradients } from "../utils/gradients"; 

interface GithubProfile {
  available: boolean
  name?: string
  avatar_url?: string
  followers?: number
  following?: number
}
interface Quote {
  id: string,
  gradient_id: number,
  username: string
  github?: GithubProfile
  text: string
  author: string
}

const props = defineProps<{
  quote: Quote
}>();

const quote = toRef(props, "quote");
const card = ref(null);

function getGradientByIndex (index: number = 0) {
  return gradients[index];
}
function saveQuoteCardAsImage () {
  if (!card.value) return;

  domtoimage.toBlob(card.value).then(blob => {
    saveAs(blob, `quotes-nyandev-id-${Date.now()}.png`);
  });
}
</script>

<template>
  <div ref="card" class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
    <div data-id="test" class="w-full flex flex-col" :class="getGradientByIndex(quote.gradient_id)">
      <div class="sm:max-w-sm sm:flex-none md:w-auto flex flex-col items-start relative p-6 xl:p-8">
        <h2 class="text-xl font-semibold mb-2">
          <i-ri-double-quotes-l />
        </h2>
        <p class="font-medium text-lg text-white mb-4">
          {{ quote.text }}
        </p>
        <p class="text-sm text-gray-100">- {{ quote.author }}</p>
      </div>
      <div class="mt-auto p-6 pt-1">
        <div class="flex items-center" v-if="quote.github?.available">
          <img :src="quote.github?.avatar_url" class="rounded-full w-[24px] h-[24px] mr-2 mb-1" loading="lazy" alt="Github Profile Pic" />

          <div class="flex flex-col flex-1">
            <a class="text-xs" :href="`https://github.com/${quote.username}`" nofollow="true" target="_blank">{{ quote.github?.name }}</a>

            <div class="flex items-center">
              <span class="text-xs mr-2 text-white text-opacity-80">
                <span class="font-bold text-white">{{ quote.github?.followers }}</span> followers
              </span>
            </div>
          </div>

          <div class="flex" title="Simpan quote menjadi gambar">
            <i-ri-save-line class="cursor-pointer" @click="saveQuoteCardAsImage" /> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
