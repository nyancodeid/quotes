<script setup lang="ts">
import { toRef } from "vue";
import { Quote } from "../types";

const props = defineProps<{
  quote?: Quote,
  show: boolean
}>();

const emit = defineEmits([ "close" ]);

const quote = toRef(props, "quote");
const show = toRef(props, "show");
</script>

<template>
  <div class="fixed flex h-screen w-full z-10 inset-0 mx-auto overflow-auto justify-center items-center bg-black bg-opacity-50 transform backdrop-filter backdrop-blur-lg" :class="show ? 'scale-100' : 'scale-0'" @click="emit('close', $event)"
  >
    <button class="top-3 right-3 fixed p-5 text-white" @click="close">
      <i-ri-close-fill class="text-2xl" />
    </button>
    <transition
      enter-active-class="transition ease-out duration-200"
      leave-active-class="transition ease-in duration-100"
      enter-from-class="transform opacity-0 scale-50"
      enter-to-class="transform opacity-100 scale-100"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-50"
    >
      <div v-if="quote && show" class="flex w-[92vw] md:w-auto">
        <quote-card :quote="quote" size="lg" class="sm:max-w-sm sm:flex-none" />
      </div>
    </transition>
  </div>
</template>

<style></style>
