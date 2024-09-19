<script setup lang="ts">
import Tab from "@/components/tab/Tab.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";
import BlockBackground from "./BlockBackground.vue";
import Education from "./Education.vue";
import Experiences from "./Experiences.vue";
import { useTextReveal } from "@/composables/useTextReveal";

gsap.registerPlugin(ScrollTrigger);

useTextReveal("#exp-and-edu-title");

const activeTab = ref(0);

const tabs = [
  { name: "Experience", component: Experiences },
  { name: "Education", component: Education },
];

onMounted(() => {
  gsap.to("body", {
    scrollTrigger: {
      trigger: "#exp-and-edu",
      start: "top 20%",
      end: "top 30%",
      toggleActions: "play reverse play reverse",
      onLeave: () => {
        activeTab.value = 1;
      },
      onLeaveBack: () => {
        activeTab.value = 0;
      },
    },
  });
});
</script>

<template>
  <section id="exp-and-edu" class="bg-black relative">
    <BlockBackground />
    <div class="container mx-auto py-10 md:py-16 lg:py-32 flex flex-col z-1">
      <h1 id="exp-and-edu-title" class="font-bold text-3xl xl:text-5xl mb-10 self-center text-center gradient-text">
        Experiences And Education
      </h1>

      <Tab :tabs="tabs" v-model:active-tab="activeTab" />
    </div>
  </section>
</template>
