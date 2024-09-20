<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";

const progressRef = useTemplateRef<HTMLDivElement>("progress");

const updateProgressWidth = () => {
  if (!progressRef?.value?.style) return;

  progressRef.value.style.width = `${
    (window.scrollY * 100) / (document.documentElement.scrollHeight - window.innerHeight)
  }%`;
};

onMounted(() => {
  window.addEventListener("scroll", updateProgressWidth);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateProgressWidth);
});
</script>

<template>
  <div ref="progress" class="fixed z-[1000] top-0 left-0 h-[5px] rounded-md bg-gradient-main"></div>
</template>

<style lang="css" scoped></style>
