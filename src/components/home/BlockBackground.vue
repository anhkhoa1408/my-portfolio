<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const mouseEnterBlockHandler = (e: Event) => {
  const target = e.target as HTMLDivElement;
  if (target?.closest(".block")) {
    target.classList.toggle("fade");
  }
};

onMounted(() => {
  const blockWrapEle = document.getElementById("block-wrap");
  blockWrapEle?.addEventListener("mouseover", mouseEnterBlockHandler);
});

onUnmounted(() => {
  const blockWrapEle = document.getElementById("block-wrap");
  blockWrapEle?.removeEventListener("mouseover", mouseEnterBlockHandler);
});
</script>

<template>
  <div
    id="block-wrap"
    class="items-center flex-wrap content-center overflow-hidden hidden lg:flex absolute left-0 right-0 top-0 z-0"
  >
    <div v-for="i in 100" :key="i" class="max-w-[5%] basis-[5%] h-[70px] shrink-0 block m-1"></div>
  </div>
</template>

<style lang="css" scoped>
.fade {
  animation: Fade 1.5s ease-in-out;
}

@keyframes Fade {
  0%,
  20% {
    opacity: 0.5;
    @apply bg-secondary-50;
  }
  100% {
    opacity: 0;
    background-color: transparent;
  }
}
</style>
