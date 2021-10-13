<script setup lang="ts">
import { computed, ref, toRef, withDefaults } from "vue";

import { Quote } from "../types";
import { useSaveQuoteCard } from "../utils/save-card";
import { gradients } from "../utils/gradients";
import { isQuoteLike, likeTriggerQuote } from "../utils/likeQuote";

interface Props {
  quote: Quote;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "sm",
});

const quote = toRef(props, "quote");
const size = toRef(props, "size");

function triggerLike(){
  isLike.value = !isLike.value
  likeTriggerQuote(quote.value)
}

const isLike = ref(isQuoteLike(quote.value.id))

const { card, exportCard } = useSaveQuoteCard();

function getGradientByIndex(index: number = 0) {
  return gradients[index];
}
function isValidLink(link?: string): boolean {
  if (typeof link !== "string") return false;
  if (!link.startsWith("https://") && !link.startsWith("http://")) return false;

  return true;
}
</script>

<template>
  <div
    ref="card"
    class="
      w-full
      relative
      text-white
      overflow-hidden
      flex
      rounded-3xl
      shadow-lg
      p-2
    "
    :class="
      (size === 'lg'
        ? 'md:scale-150 md:hover:scale-160'
        : 'md:hover:rotate-1 md:hover:scale-105 duration-300') +
      ' ' +
      getGradientByIndex(quote.gradient_id)
    "
  >
    <div class="w-full flex flex-col dark:bg-gray-800 dark:rounded-2.2xl">
      <div class="flex flex-col items-start relative p-6 xl:p-8">
        <h2 class="text-xl font-semibold mb-2">
          <i-ri-double-quotes-l />
        </h2>
        <p
          class="font-medium text-white mb-4"
          :class="size === 'lg' ? 'text-xl md:text-lg' : 'text-lg'"
        >
          {{ quote.text }}
        </p>
        <p
          class="text-sm text-gray-100"
          v-if="isValidLink(quote.author_detail_url)"
        >
          -
          <a
            :href="quote.author_detail_url"
            target="_blank"
            :title="`Read more about ${quote.author}`"
            rel="noreferrer nofollow"
            class="pb-1 hover:border-b-2 hover:border-gray-200"
            >{{ quote.author }}</a
          >
        </p>
        <p class="text-sm text-gray-100" v-else>- {{ quote.author }}</p>
      </div>
      <div class="mt-auto p-6 pt-1">
        <div class="flex items-center" v-if="quote.github?.available">
          <img
            :data-src="`${quote.github?.avatar_url}&s=36`"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            class="
              lozad
              rounded-full
              bg-gray-800
              w-[24px]
              h-[24px]
              mr-2
              mt-[2px]
              mb-1
            "
            alt="Github Profile Pic"
          />

          <div class="flex flex-col flex-1">
            <div>
              <a
                class="text-xs"
                :href="`https://github.com/${quote.username}`"
                nofollow="true"
                target="_blank"
                >{{ quote.github?.name }}</a
              >
            </div>

            <div class="flex items-center">
              <span class="text-xs mr-2 text-white text-opacity-80">
                <span class="font-bold text-white">{{
                  quote.github?.followers
                }}</span>
                followers
              </span>
            </div>
          </div>

          <div
            v-if="size === 'lg'"
            class="
              p-2
              rounded-full
              hover:bg-black hover:bg-opacity-25
              dark:hover:bg-gray-600
              transition-colors
              button-save
              cursor-pointer
            "
            :class="`${isLike && 'text-red-500'}`"
            title="Like Quote"
            @click="triggerLike"
          >
            <svg
              v-if="isLike"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <div
            v-if="size === 'lg'"
            class="
              p-2
              rounded-full
              hover:bg-black hover:bg-opacity-25
              dark:hover:bg-gray-600
              transition-colors
              button-save
              cursor-pointer
            "
            title="Simpan quote menjadi gambar"
            @click.stop="exportCard"
          >
            <i-ri-save-line class="button-save cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
