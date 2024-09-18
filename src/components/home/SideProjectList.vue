<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Designer Portfolio",
    imageUrl: "/images/project/pnhi-port.png",
    url: "",
  },
  {
    name: "My Portfolio",
    imageUrl: "/images/project/my-port.png",
    url: "",
  },
  {
    name: "E-store Flower",
    imageUrl: "/images/project/flower.png",
    url: "",
  },
  {
    name: "Clear Hackathon",
    imageUrl: "/images/project/hackathon.jpg",
    url: "https://blockid.vbchain.vn/lookup?sr=093106H433",
  },
  {
    name: "Portfolio Mailer",
    imageUrl: "/images/project/mail.png",
    url: "https://blockid.vbchain.vn/lookup?sr=093106H433",
    class: "object-center",
  },
];

onMounted(() => {
  const projects = gsap.utils.toArray("#projects .side-project");

  gsap.to(projects, {
    xPercent: -100 * (projects.length - 2),
    scrollTrigger: {
      trigger: "#projects",
      pin: true,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
});
</script>

<template>
  <id id="side-projects" class="flex overflow-x-hidden flex-nowrap gap-10 px-10">
    <template v-for="(project, index) in projects" :key="index">
      <div class="flex-none h-[300px] bg-white rounded-lg w-[450px] side-project transform-gpu overflow-hidden">
        <img
          :class="['w-full h-full object-cover object-left-top rounded-lg overflow-hidden', project.class]"
          :src="project.imageUrl"
        />
      </div>
    </template>
  </id>
</template>

<style lang="css" scoped>
.cursor-detail {
  @apply bg-primary text-white p-2 fixed z-50;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
</style>
