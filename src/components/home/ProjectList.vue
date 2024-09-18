<script setup lang="ts">
import { ArrowTurnDownRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/16/solid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, ref } from "vue";
import Tab from "@/components/tab/Tab.vue";
import Project from "./Project.vue";
import WorksProjectList from "./WorksProjectList.vue";
import SideProjectList from "./SideProjectList.vue";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const activeTab = ref(0);

const tabs = [
  { name: "Works Projects", component: WorksProjectList },
  { name: "Side Projects", component: SideProjectList },
];
</script>

<template>
  <section
    id="projects"
    :class="[
      'flex flex-col py-10 md:py-16 lg:py-32 bg-black',
      { 'lg:h-[1360px]': activeTab === 1, 'work-projects': activeTab === 0 },
    ]"
  >
    <h1 class="font-bold text-3xl xl:text-5xl self-center mb-10 gradient-text">Projects</h1>
    <Tab :tabs="tabs" v-model:active-tab="activeTab" />
  </section>
</template>
