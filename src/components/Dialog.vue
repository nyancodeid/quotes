<template>
  <div class="fixed flex h-screen w-full z-10 inset-0 mx-auto overflow-auto justify-center items-center bg-black bg-opacity-50 transform backdrop-filter backdrop-blur-lg
    " @click="emit('close')" :class="`${show ? 'scale-100' : 'scale-0'}`"
  >
    <button class="top-3 right-3 fixed p-5 text-white" @click="close">
      <i-ri-close-fill class="text-2xl" />
    </button>
      <quote-card :quote="quote" />
    <div class="flex w-[92vw] md:w-auto transform ease-out duration-300" :class="`${show ? 'scale-100' : 'scale-0'}`">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, toRef } from "vue";

interface Quote { }

const props = defineProps<{
  quote: Quote,
  show: boolean
}>();

const emit = defineEmits([ "close" ]);

const quote = toRef(props, "quote");
const show = toRef(props, "show");
</script>

<style></style>
