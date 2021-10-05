<template>
  <div
    class="
      fixed
      flex
      h-screen
      w-full
      z-10
      inset-0
      mx-auto
      overflow-auto
      justify-center
      items-center
      bg-black bg-opacity-50
      transform
      backdrop-filter backdrop-blur-lg
    "
    @click="emit('close')"
    :class="`${show ? 'scale-100' : 'scale-0'}`"
  >
    <button class="top-3 right-3 fixed p-5 text-white" @click="close">
      <i-ri-close-fill class="text-2xl" />
    </button>
    <button class="text-white fixed top-3 left-3 p-5" @click="saveQuote">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
        />
      </svg>
    </button>
    <div
      class="flex w-[92vw] md:w-auto transform ease-out duration-300"
      :class="`${show ? 'scale-100 md:scale-150 md:hover:scale-160' : 'scale-0'}`" 
      ref="quoteRef"
    >
      <quote-card  :quote="quote" size="lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import html2canvas from "html2canvas"
import { toRef, ref } from "vue";
import { Quote } from "../types";

const props = defineProps<{
  quote: Quote;
  show: boolean;
}>();

const emit = defineEmits(["close"]);

const quoteRef = ref(null)
const quote = toRef(props, "quote");
const show = toRef(props, "show");

async function saveQuote(){
 let quoteEl: any = quoteRef.value
 console.log(quoteEl)
 const file = ((await html2canvas(quoteEl)).toDataURL())
 download(file)
}

function download(url: string){
  let a = document.createElement("a")
  a.href = url
  a.download = quote.value.id
  a.click()
  a.remove()
}

</script>

<style></style>
