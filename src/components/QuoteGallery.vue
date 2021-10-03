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
        <section class="flex" v-for="quote: any in quotes" :key="quote.id">
          <quote-card :quote="quote" />
        </section>
      </div>
    </div>
  </div>
</template>

<style>
</style>
