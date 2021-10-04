<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import lozad from "lozad";

import { Quote } from "../types";
import { chunk } from "../utils/helpers";
import quotesRaw from "../assets/quotes.json"

let observer: lozad.Observer;
const quotesChunked = chunk(quotesRaw, 8);

const quotes = ref<Quote[]>(quotesChunked[0]);
const quotesIndex = ref(0);
const galleryElement = ref<HTMLDivElement>();

const isShowDialog = ref(false);
const selectedQuote = ref<Quote>();

function displayDialog(quote: Quote) {
  isShowDialog.value = true;
  selectedQuote.value = quote;

  initializeLozad();
}
function closeDialog(){
  isShowDialog.value = false
  selectedQuote.value = undefined;
}

function initializeLozad() {
  nextTick(function () {
    observer?.observe();
  });
}

function loadQuotes () {
  if (quotesIndex.value > (quotesChunked.length - 1)) return;

  const quotesLists = quotesChunked[quotesIndex.value];

  if (quotes.value.length > 0) {
    quotes.value = [
      ...quotes.value,
      ...quotesLists
    ];
  }
}

function handleScroll () {
  if (!galleryElement.value) return;

  if (galleryElement.value.getBoundingClientRect().bottom < (window.innerHeight + 400)) {
    if (quotesIndex.value < (quotesChunked.length - 1)) {
      quotesIndex.value = quotesIndex.value + 1;

      loadQuotes();
      initializeLozad();
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
  }
}

onMounted(function () {
  window.addEventListener("scroll", handleScroll);
  observer = lozad("img.lozad");

  loadQuotes();
  initializeLozad();
});
onUnmounted(function () {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Dialog v-if="selectedQuote" :quote="selectedQuote" :show="isShowDialog" @close="closeDialog" />

  <div ref="galleryElement" class="flex flex-col items-center justify-center">
    <div class="w-11/12 md:w-3/4 mb-[86px]">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
        <section class="flex">
          <div class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
            <div class="w-full flex flex-col bg-gradient-to-br from-red-100 to-blue-100">
              <div class="sm:max-w-sm sm:flex-none md:w-auto flex flex-col items-start relative p-6 xl:p-8">
                <h1 class="mb-2 text-gray-800">
                  <i-ri-chat-quote-line class="text-3xl" />
                </h1>
                <p class="font-medium text-2xl text-gray-800 mb-4">
                  Submit quote milikmu dengan berkontribusi langsung di
                  Repository Github.
                </p>
              </div>
              <div class="p-6 pt-1 mt-auto">
                <a
                  class="rounded-xl text-gray-800 bg-gray-300 hover:bg-blue-200 transition-colors py-2 px-4
                  "
                  href="https://github.com/nyancodeid/quotes#contribute"
                  >Kontribusi Sekarang
                  <i-ri-arrow-right-line class="inline-block"
                /></a>
              </div>
            </div>
          </div>
        </section>
        <section
          class="quote-card--container flex cursor-pointer"
          v-for="quote in quotes"
          :key="quote.id"
          @click="displayDialog(quote)"
        >
          <quote-card :quote="quote" />
        </section>
      </div>
    </div>
  </div>
</template>

<style></style>
