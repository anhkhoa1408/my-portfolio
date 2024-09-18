<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "My Portfolio",
    imageUrl: "/images/project/my-port.png",
    url: "object-left-top",
    class: "object-left-top",
  },
  {
    name: "Designer Portfolio",
    imageUrl: "/images/project/pnhi-port.png",
    url: "",
    class: "object-left-top",
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
  const matchMedia = gsap.matchMedia();

  matchMedia.add("(min-width: 1024px)", () => {
    const projects = gsap.utils.toArray("#side-projects .side-project");
    gsap.to(projects, {
      xPercent: -100 * (projects.length - 1),
      padding: 0,
      scrollTrigger: {
        trigger: "#side-projects",
        pin: true,
        pinnedContainer: "#side-projects",
        start: "top 200px",
        end: "bottom top",
        scrub: true,
      },
    });
  });
});
</script>

<template>
  <id id="side-projects" class="flex flex-nowrap gap-4 lg:gap-10 px-5 lg:px-10">
    <template v-for="(project, index) in projects" :key="index">
      <div
        class="flex-none w-[80vw] h-[300px] md:h-[300px] md:w-[450px] lg:h-[400px] lg:w-[500px] bg-white rounded-lg side-project transform-gpu overflow-hidden"
      >
        <img
          :class="['w-full h-full object-cover rounded-lg overflow-hidden', project.class]"
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

@media (hover: hover) {
  #side-projects {
    overflow-x: hidden;
  }
}

@media (hover: none) {
  #side-projects {
    overflow-x: auto;
    scroll-snap-type: x mandatory;

    & .side-project {
      scroll-snap-align: center;
    }
  }
}
</style>
