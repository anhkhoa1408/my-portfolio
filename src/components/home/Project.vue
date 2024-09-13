<script setup lang="ts">
interface CardData {
  name: string;
  iconUrl: string;
  imageUrl: string;
}

const { data } = defineProps<{
  data: CardData;
}>();
</script>

<template>
  <div class="project-card">
    <img :src="data.imageUrl" class="w-full h-[200px] object-cover mb-2 rounded-[8px]" />
    <div class="flex items-center justify-between">
      <img :src="data.iconUrl" class="w-[25px] h-[25px] object-cover" />
      <p class="text-xs text-white font-medium">{{ data.name }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.project-card {
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background-color: rgba(47, 68, 68, 0.45);
  padding: 0.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}
</style>
