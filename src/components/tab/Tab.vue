<script setup lang="ts">
import { ref, type Component, KeepAlive } from "vue";

const { tabs } = defineProps({
  tabs: {
    type: Array<{
      name: string;
      component: Component;
    }>,
    required: true,
  },
});

const activeTab = defineModel<number>("activeTab", { required: true });
</script>

<template>
  <div
    :style="{ '--left': `${activeTab * 100}%`, '--width': `calc(100% / ${tabs.length})` }"
    class="self-center flex items-center justify-center tab mb-10 shrink-0"
  >
    <template v-for="(tab, index) in tabs">
      <button @click="activeTab = index" class="tab-item">{{ tab.name }}</button>
    </template>
  </div>

  <KeepAlive>
    <component :is="tabs[activeTab].component"></component>
  </KeepAlive>
</template>

<style lang="css" scoped>
.tab {
  @apply border-2 border-solid border-secondary-100 overflow-hidden relative;

  &::before {
    content: "";
    @apply absolute ease-in-out duration-1000 left-0 top-0 bottom-0;
    width: var(--width);
    transform: translateX(var(--left));
    background-image: linear-gradient(132.6deg, #478bd6 23.3%, #25d8d3 84.7%);
  }

  .tab-item {
    @apply w-[140px] py-2 flex items-center justify-center text-white z-10;
  }
}
</style>
