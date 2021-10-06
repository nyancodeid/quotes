<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import lozad from "lozad";

import { Quote } from "../types.d";
import { chunk } from "../utils/helpers";
import quotesRaw from "../assets/quotes.json"

let observer: lozad.Observer;
let allQuotes = ref(quotesRaw)
let quotesChunked = chunk(allQuotes.value, 8);

const quotes = ref<Quote[]>(quotesChunked[0]);
const quotesIndex = ref(0);
const galleryElement = ref<HTMLDivElement>();

const isShowDialog = ref(false);
const selectedQuote = ref<Quote>();

const search = ref("")
const showFilter = ref(false)
const searchFilter = ref(["quotes", "from", "user"]);
const chooseFilter = ref(searchFilter.value[0])

function filterQuotes(valueSearch: string, type: string){
  let arr = allQuotes.value.filter((e) =>{
    if(type == "quotes"){
      return valueSearch.toLowerCase().split(' ').every(v => e.text.toLowerCase().includes(valueSearch))
    }
    else if(type == "from"){
      return valueSearch.toLowerCase().split(' ').every(v => e.author.toLowerCase().includes(valueSearch))
    }
    else if(type == "user"){
      return valueSearch.toLowerCase().split(' ').every(v => e.github.name.toLowerCase().includes(valueSearch))
    }
  })
  return arr
}

watch(search, (newValue) => {
  let arr = filterQuotes(newValue, chooseFilter.value)
  quotesChunked = chunk(arr, 8)
  quotes.value = quotesChunked[0]
  quotesIndex.value = 0
})

watch(chooseFilter, (newValue) => {
  let arr = filterQuotes(search.value, newValue)
  quotesChunked = chunk(arr, 8)
  quotes.value = quotesChunked[0]
  quotesIndex.value = 0
})

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

  initializeLozad();
});
onUnmounted(function () {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Dialog v-if="selectedQuote" :quote="selectedQuote" :show="isShowDialog" @close="closeDialog" />
  <!-- search box -->
  <div class="flex flex-col items-center justify-center">
    <div class="w-11/12 md:w-3/4 mb-[86px] bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 rounded-lg relative">
      <div class="flex justify-between items-center p-1">
        <button @focus="showFilter = true" @blur="showFilter = false" @mousedown="showFilter == true? showFilter = false : showFilter = true" @click.prevent class="relative appearance-none bg-gradient-to-r from-purple-600 to-red-400 rounded-l-md py-2 px-3 h-full flex justify-between items-center">
          <span class="text-white flex justify-between items-center capitalize">{{ chooseFilter }}</span>
          <span class="text-white ml-4 cursor-pointer transition" :class="showFilter? 'transform rotate-180' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
          </span>
          <div class="absolute left-0 right-0 top-full z-10 rounded-lg bg-gradient-to-r from-purple-500 via-pink-400 to-red-400 transition-all" :class="showFilter? 'opacity-100' : 'opacity-0'">
            <span v-for="(filter, index) in searchFilter" :key="index + 'filter'" class="capitalize text-white block px-3 py-1 hover:font-bold" @click="chooseFilter = filter">{{ filter }}</span>
          </div>
        </button>
        <input type="text" v-model="search" placeholder="Search" class="py-2 px-3 rounded-r-md w-full transition appearance-none outline-none font-semibold">
      </div>
    </div>
  </div>

  <div ref="galleryElement" class="flex flex-col items-center justify-center">
    <div class="w-11/12 md:w-3/4 mb-[86px]">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
        <section class="flex">
          <div class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg p-2 bg-gradient-to-br from-red-100 to-blue-100">
            <div class="w-full flex flex-col dark:bg-gray-800 dark:rounded-2.2xl">
              <div class="sm:max-w-sm sm:flex-none md:w-auto flex flex-col items-start relative p-6 xl:p-8">
                <h1 class="mb-2 text-gray-800 dark:text-red-100">
                  <i-ri-chat-quote-line class="text-3xl" />
                </h1>
                <p class="font-medium text-2xl text-gray-800 dark:text-red-100 mb-4">
                  Submit quote milikmu dengan berkontribusi langsung di
                  Repository Github.
                </p>
              </div>
              <div class="p-6 pt-1 mt-auto">
                <a
                  class="rounded-xl text-gray-800 bg-gray-300 hover:bg-blue-200 dark:text-red-100 dark:bg-gray-700 dark:hover:bg-gray-900 transition-colors py-2 px-4
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
