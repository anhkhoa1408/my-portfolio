<script setup lang="ts">
import { ref } from "vue";
import BlockBackground from "./BlockBackground.vue";
import Experiences from "./Experiences.vue";
import Education from "./Education.vue";
import Tab from "@/components/tab/Tab.vue";

const activeTab = ref(0);

const tabs = [
  { name: "Experience", component: Experiences },
  { name: "Education", component: Education },
];
</script>

<template>
  <section id="exp-and-edu" class="bg-black relative">
    <BlockBackground />
    <div class="container mx-auto py-10 md:py-16 lg:py-32 flex flex-col z-1">
      <h1 class="font-bold text-3xl xl:text-5xl mb-10 self-center text-center gradient-text">
        Experiences And Education
      </h1>

      <Tab :tabs="tabs" v-model:active-tab="activeTab" />
    </div>
  </section>
</template>
