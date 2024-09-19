<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { onMounted } from "vue";
import TextMarquee from "./TextMarquee.vue";

gsap.registerPlugin(ScrollTrigger);

const gradientPercentage = {
  value: 0,
};

onMounted(() => {
  const gradientTextEle = document.getElementById("collaborate-text");

  if (!gradientTextEle) return;

  gsap.to(gradientPercentage, {
    duration: 1,
    value: 100,
    ease: "power1.out",
    roundProps: "value",
    onUpdate: function () {
      gradientTextEle.style.background = `linear-gradient(90deg, #FFF 0%, #FFF 50%, #25d8d3 51%, #25d8d3 100%) ${gradientPercentage.value.toString()}% / 300% 100% text`;
    },
    scrollTrigger: {
      trigger: "#collaboration",
      start: "top center",
      end: "bottom +=500",
      scrub: true,
    },
  });
});
</script>

<template>
  <section id="collaboration" class="py-10 md:py-16 lg:py-32 flex flex-col justify-center bg-black">
    <TextMarquee children="Frontend Developer" :reverse="true" />
    <h1 class="text-2xl lg:text-4xl font-bold self-center lg:my-5">
      <span class="text-white">Contact to </span>
      <span id="collaborate-text">collaborate?</span>
    </h1>
    <TextMarquee children="Software Engineer" />
  </section>
</template>

<style lang="css" scoped>
#collaborate-text {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #25d8d3 51%, #25d8d3 102%) 0% / 300% 100% text;
}
</style>
