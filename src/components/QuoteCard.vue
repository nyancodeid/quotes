<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
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

const props = defineProps({
  quote: {
    type: Object as PropType<Quote>
  }
});

function getGradientByIndex (index: number = 0) {
  return gradients[index];
}
</script>

<template>
  <div class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
    <div data-id="test" class="w-full flex flex-col" :class="getGradientByIndex(props.quote?.gradient_id)">
      <div class="sm:max-w-sm sm:flex-none md:w-auto flex flex-col items-start relative p-6 xl:p-8">
        <h2 class="text-xl font-semibold mb-2">
          <i-ri-double-quotes-l />
        </h2>
        <p class="font-medium text-lg text-white mb-4">
          {{ props.quote?.text }}
        </p>
        <p class="text-sm text-gray-100">- {{ props.quote?.author }}</p>
      </div>
      <div class="mt-auto p-6 pt-1">
        <div class="flex items-start" v-if="props.quote?.github?.available">
          <img :src="props.quote?.github?.avatar_url" class="rounded-full w-[24px] h-[24px] mr-2" alt="Github Profile Pic" />

          <div class="flex flex-col">
            <a class="text-xs" :href="`https://github.com/${props.quote?.username}`" nofollow="true" target="_blank">{{ props.quote?.github?.name }}</a>

            <div class="flex items-center">
              <span class="text-xs mr-2 text-white text-opacity-80">
                <span class="font-bold text-white">{{ props.quote?.github?.followers }}</span> followers
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
