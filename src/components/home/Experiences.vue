<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted } from "vue";
gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Middle Frontend Engineer",
    company: "LNP Technologies",
    startDate: "October 2024",
    endDate: "Present",
    position: "Full-time",
  },
  {
    title: "Frontend Blockchain Developer",
    company: "Vietnam Blockchain Corporation",
    startDate: "August 2022",
    endDate: "April 2024",
    position: "Full-time",
  },
  {
    title: "Frontend Developer",
    company: "Vietnam Blockchain Corporation",
    startDate: "September 2021",
    endDate: "August 2022",
    position: "Part-time",
  },
  {
    title: "Internship",
    company: "Vietnam Blockchain Corporation",
    startDate: "July 2021",
    endDate: "September 2021",
  },
];

onMounted(() => {
  gsap.from(".experience-item", {
    scrollTrigger: {
      trigger: "#exp-and-edu",
      start: "top 10%",
      toggleActions: "play reverse play reverse",
    },
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 1,
  });

  gsap.fromTo(
    ".with-pacer",
    {
      "--height": 0,
    },
    {
      "--height": "calc(100% + 8px)",
      duration: 1,
      stagger: 1,
      scrollTrigger: {
        trigger: "#exp-and-edu",
        start: "top 10%",
        toggleActions: "play reverse play reverse",
      },
    },
  );
});
</script>

<template>
  <div class="flex rounded-md p-6 bg-glass gap-10">
    <div class="flex flex-col ml-12">
      <div
        v-for="(item, index) in experiences"
        :key="item.title"
        class="flex flex-col px-0 experience-item with-pacer [&:not(:last-child)]:pb-16 gap-2"
      >
        <div class="flex items-start lg:items-center justify-start gap-2 lg:gap-3 flex-col lg:flex-row">
          <p class="font-semibold">{{ item.title }}</p>

          <div class="hidden lg:flex items-center gap-2">
            <div class="size-2 bg-blue-500 rounded-full"></div>
            <p class="gradient-text text-sm lg:text-base">{{ item.company }}</p>
            <div v-if="item.position" class="bg-primary px-2 py-1 text-xs">{{ item.position }}</div>
          </div>

          <div class="flex flex-col lg:hidden gap-2">
            <p class="gradient-text text-sm lg:text-base">{{ item.company }}</p>
            <div v-if="item.position" class="bg-primary px-2 py-1 text-xs w-fit">
              {{ item.position }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 text-sm">
          <p>{{ item.startDate }}</p>
          <p class="h-[1px] w-[10px] bg-secondary"></p>
          <p>{{ item.endDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.experience-item {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    width: 16px;
    height: 16px;
    top: 16px;
    border-radius: 50%;
    border: 4px solid white;
    transform: translate(-43px, -50%);
  }
}

.with-pacer {
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 12px;
    width: 10px;
    height: var(--height);
    transform: translateX(-40px);
    background: oklch(79.962% 0.1321 191.811);
  }
}
</style>
