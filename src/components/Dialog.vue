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
      bg-black
       bg-opacity-50
      transform
      transition-all
      duration-1000
    "
    @click="close"
    :class="`${show ? 'scale-100' : 'scale-0'}`"
  >
    <button class="top-3 right-3 fixed p-5 text-white" @click="close">
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div class="flex w-auto transform duration-500">
      <quote-card :quote="quote" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Dialog",
  props: ["quote", "show", "close"],
};
</script>

<style></style>
