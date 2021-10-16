<script setup lang="ts">
import { ref, toRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Quote } from '../types'

const props = defineProps<{
  quote?: Quote
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close', event: Event): void
}>()

const quote = toRef(props, 'quote')
const show = toRef(props, 'show')
const card = ref<HTMLDivElement>()

onClickOutside(card, event => emit('close', event), { event: 'click' })
</script>

<template>
  <div
    class="fixed flex h-screen w-full z-20 inset-0 mx-auto overflow-auto justify-center items-center bg-black bg-opacity-50 transform backdrop-filter backdrop-blur-lg"
    :class="show ? 'scale-100' : 'scale-0'"
  >
    <button class="top-3 right-3 fixed p-5 text-white" @click="emit('close', $event)">
      <i-ri-close-fill class="text-2xl" />
    </button>
    <transition
      enter-active-class="transition ease-out duration-300"
      leave-active-class="transition ease-in duration-300"
      enter-from-class="transform scale-90"
      enter-to-class="transform scale-100"
      leave-from-class="transform scale-100"
      leave-to-class="transform scale-90"
    >
      <div v-if="quote && show" ref="card" class="flex w-[92vw] md:w-auto">
        <quote-card :quote="quote" size="lg" class="sm:max-w-sm sm:flex-none" />
      </div>
    </transition>
  </div>
</template>

<style></style>
