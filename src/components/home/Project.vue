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
    <img :src="data.imageUrl" class="w-full h-[200px] object-cover mb-2" />
    <div class="flex items-center justify-between">
      <img :src="data.iconUrl" class="w-[25px] h-[25px] object-cover" />
      <p class="text-xs text-white font-medium">{{ data.name }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.project-card {
  backdrop-filter: blur(6px) saturate(180%);
  -webkit-backdrop-filter: blur(6px) saturate(180%);
  background-color: rgba(21, 21, 21, 0.7);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;

  &:hover {
  }
}
</style>
