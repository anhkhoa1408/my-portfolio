<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref(0);
</script>

<template>
  <section id="work-exp" class="bg-black">
    <div class="container mx-auto py-10 md:py-16 lg:py-32 flex flex-col">
      <h1 class="font-bold text-3xl xl:text-5xl mb-10 self-center text-center gradient-text">Workings And Education</h1>
      <div
        :style="{ '--left': activeTab === 0 ? '0%' : '100%' }"
        class="self-center flex items-center justify-center tab"
      >
        <button @click="activeTab = 0" class="tab-item">Working</button>
        <button @click="activeTab = 1" class="tab-item">Education</button>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.tab {
  @apply border-2 border-solid border-secondary-100 overflow-hidden relative;

  &::before {
    content: "";
    @apply absolute ease-in-out duration-1000 left-0 w-[50%] top-0 bottom-0;
    transform: translateX(var(--left));
    background-image: linear-gradient(132.6deg, #478bd6 23.3%, #25d8d3 84.7%);
  }

  .tab-item {
    @apply w-[120px] py-2 flex items-center justify-center text-white z-10;
  }
}
</style>
