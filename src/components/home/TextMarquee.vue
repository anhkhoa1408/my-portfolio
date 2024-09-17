<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

const { children, reverse, classname } = defineProps({
  children: {
    type: String,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  classname: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  const timeline = gsap.timeline();

  timeline.fromTo(
    reverse ? "#marquee-reverse" : "#marquee",
    {
      x: reverse ? -300 : 0,
    },
    {
      x: reverse ? 0 : -300,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#collaboration",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
});
</script>

<template>
  <div class="overflow-hidden whitespace-nowrap flex flex-nowrap bg-black my-8">
    <div :id="reverse ? 'marquee-reverse' : 'marquee'" class="flex whitespace-nowrap gap-10 flex-nowrap">
      <span
        v-for="index in 15"
        :key="index"
        :class="['block text-lg lg:text-3xl text-slate-50 font-bold', classname]"
        >{{ children }}</span
      >
    </div>
  </div>
</template>
