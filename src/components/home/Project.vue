<script setup lang="ts">
interface CardData {
  name: string;
  iconUrl: string;
  imageUrl: string;
}

const { data, isActive } = defineProps<{
  data: CardData;
  isActive: boolean;
}>();
</script>

<template>
  <div :class="['project-card animate-border', { active: isActive }]">
    <div class="project-card-inner">
      <img :src="data.imageUrl" class="w-full h-[200px] object-cover mb-2 rounded-[8px]" />
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

@keyframes borderAnimation {
  0% {
    --border-angle: 0deg;
  }
  100% {
    --border-angle: 360deg;
  }
}
</style>
