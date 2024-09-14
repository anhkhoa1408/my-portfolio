<script setup lang="ts">
import HoverEffect from "hover-effect";
import { onMounted } from "vue";

interface CardData {
  name: string;
  iconUrl: string;
  imageUrl: string;
  displacementImage: string;
}

const { data, isActive, index } = defineProps<{
  data: CardData;
  isActive: boolean;
  index: number;
}>();

onMounted(() => {
  new HoverEffect({
    parent: document.querySelector(`.spiral-card.x-${index} .project-card-logo-effect`),
    intensity: -0.65,
    speedOut: 1.2,
    speedIn: 1.2,
    image1: data.imageUrl,
    image2: data.displacementImage,
    displacementImage: data.imageUrl,
  });
});
</script>

<template>
  <div class="project-card-logo-effect"></div>
  <div :class="['project-card animate-border', { active: isActive }]">
    <div class="project-card-inner">
      <div class="h-[200px] mb-2"></div>
      <div class="flex items-center justify-between">
        <img :src="data.iconUrl" class="w-[25px] h-[25px] object-cover" />
        <p class="text-xs text-white font-medium">{{ data.name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.project-card.active {
  background: linear-gradient(to right, black, #00000058),
    conic-gradient(from var(--border-angle), #000000, aqua 94%, lightblue 90%, aqua 94%) border-box;
  animation: borderAnimation 5s linear infinite;
  border-radius: 16px;
  position: relative;
}

.project-card-inner {
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background-color: rgba(47, 68, 68, 0.45);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  border-radius: 16px;
}

.project-card-logo-effect {
  inset: 0;
  z-index: 10;
  position: absolute;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  inset: 8px;
}

@keyframes borderAnimation {
  0% {
    --border-angle: 0deg;
  }
  100% {
    --border-angle: 360deg;
  }
}
</style>
