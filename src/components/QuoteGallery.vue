<script setup lang="ts">
import { ref, onMounted } from "vue";

const quotes = ref({});

async function loadQuotes () {
  const quotes_url = new URL('../assets/quotes.json', import.meta.url).href

  const res = await fetch(quotes_url, { method: "GET" })
  const data = await res.json();

  quotes.value = data;
}

onMounted(async function() {
  await loadQuotes();
});

</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-11/12 md:w-3/4 mb-[86px]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 xl:gap-8">
        <section class="flex">
          <div class="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg">
            <div class="w-full flex flex-col bg-gradient-to-br from-red-100 to-blue-100">
              <div class="sm:max-w-sm sm:flex-none md:w-auto flex flex-col items-start relative p-6 xl:p-8">
                <h1 class="mb-2 text-gray-800">
                  <i-ri-chat-quote-line class="text-3xl" />
                </h1>
                <p class="font-medium text-2xl text-gray-800 mb-4">
                  Submit quote milimu dengan berkontribusi langsung di Repository Github.
                </p>
              </div>
              <div class="p-6 pt-1 mt-auto">
                <a class="rounded-xl text-gray-800 bg-gray-300 hover:bg-blue-200 transition-colors py-2 px-4" href="https://github.com/nyancodeid/quotes#contribute">Kontribusi Sekarang <i-ri-arrow-right-line class="inline-block" /></a>
              </div>
            </div>
          </div>
        </section>
        <section class="flex" v-for="quote: any in quotes" :key="quote.id">
          <quote-card :quote="quote" />
        </section>
      </div>
    </div>
  </div>
</template>

<style>
</style>
