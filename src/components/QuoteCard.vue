<script setup lang="ts">
import { toRef, withDefaults } from "vue";
import { Quote } from "../types";
import { gradients } from "../utils/gradients"; 

interface Props {
  quote: Quote;
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: "sm"
});

const quote = toRef(props, "quote");
const size = toRef(props, "size");

function getGradientByIndex (index: number = 0) {
  return gradients[index];
}
</script>

<template>
  <div class="w-full relative text-white overflow-hidden flex rounded-3xl shadow-lg md:hover:rotate-1 duration-300" :class="(size === 'lg') ? 'scale-1 md:scale-150 md:hover:scale-160' : 'md:hover:scale-105'">
    <div class="w-full flex flex-col" :class="getGradientByIndex(quote.gradient_id)">
      <div class="sm:max-w-sm sm:flex-none md:w-auto flex flex-col items-start relative p-6 xl:p-8">
        <h2 class="text-xl font-semibold mb-2">
          <i-ri-double-quotes-l />
        </h2>
        <p class="font-medium text-white mb-4" :class="(size === 'lg') ? 'text-xl md:text-lg' : 'text-lg'">
          {{ quote.text }}
        </p>
        <p class="text-sm text-gray-100">- {{ quote.author }}</p>
      </div>
      <div class="mt-auto p-6 pt-1">
        <div class="flex items-start" v-if="quote.github?.available">
          <img :data-src="quote.github?.avatar_url" class="lozad rounded-full w-[24px] h-[24px] mr-2" alt="Github Profile Pic" />

          <div class="flex flex-col">
            <a class="text-xs" :href="`https://github.com/${quote.username}`" nofollow="true" target="_blank">{{ quote.github?.name }}</a>

            <div class="flex items-center">
              <span class="text-xs mr-2 text-white text-opacity-80">
                <span class="font-bold text-white">{{ quote.github?.followers }}</span> followers
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
