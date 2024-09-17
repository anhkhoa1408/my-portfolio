<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const blockWrapEle = document.getElementById("block-wrap");

  if (!blockWrapEle) return;

  blockWrapEle.addEventListener("mouseover", (e) => {
    const target = e.target as HTMLDivElement;
    if (target?.closest(".block")) {
      target.classList.toggle("fade");
    }
  });
});
</script>

<template>
  <div
    id="block-wrap"
    class="items-center flex-wrap content-center overflow-hidden hidden lg:flex absolute left-0 right-0 top-0 h-[600px] z-0"
  >
    <div v-for="i in 100" :key="i" class="max-w-[7%] basis-[7%] h-[105px] shrink-0 block"></div>
  </div>
</template>

<style lang="css" scoped>
.fade {
  animation: Fade 0.75s ease-in-out;
}

@keyframes Fade {
  from {
    opacity: 0;
    background-color: transparent;
  }
  to {
    opacity: 0.3;
    @apply bg-slate-50;
  }
}
</style>
