<script setup lang="ts">
import gsap from "gsap";
import SplitType from "split-type";
import { onMounted } from "vue";

const counter = { value: 0 };

onMounted(() => {
  const counterEle = document.getElementById("counter");
  if (counterEle) {
    const timeline = gsap.timeline();

    const matchMedia = gsap.matchMedia();

    new SplitType("#hello", {
      types: "chars",
      tagName: "span",
    });

    matchMedia
      .add("(max-width: 768px)", () => {
        timeline.add("loading-and-welcome", 0).fromTo(
          "#hello span",
          {
            letterSpacing: "1rem",
            ease: "power2.out",
            duration: 2,
            delay: 0.5,
          },
          {
            letterSpacing: "0.5rem",
          },
          "loading-and-welcome",
        );
      })
      .add("(min-width: 768px)", () => {
        timeline.add("loading-and-welcome", 0).fromTo(
          "#hello span",
          {
            letterSpacing: "5rem",
            ease: "power4.out",
            duration: 2,
            delay: 0.5,
          },
          {
            letterSpacing: "0.6rem",
          },
          "loading-and-welcome",
        );
      });

    timeline
      .to(
        counter,
        {
          duration: 2.5,
          value: 100,
          ease: "power1.out",
          roundProps: "value",
          onUpdate: function () {
            counterEle.innerText = `${counter.value.toString()}%`; // Update the displayed value
          },
        },
        "loading-and-welcome",
      )
      .add("end-counter", 2.5)
      .to(
        "#top-splash",
        {
          transform: "translateY(-160%)",
          duration: 0.75,
        },
        "end-counter",
      )
      .to(
        "#bottom-splash",
        {
          transform: "translateY(160%)",
          duration: 0.75,
        },
        "end-counter",
      )
      .to(
        "#counter",
        {
          opacity: 0,
          duration: 0.25,
        },
        "end-counter",
      )
      .to(
        "#hello span",
        {
          opacity: 0,
          duration: 0.25,
        },
        "end-counter",
      );
  }
});
</script>

<template>
  <section class="splash">
    <div id="top-splash" class="h-[50%] basis-6/12 w-[100%] bg-white"></div>
    <div id="bottom-splash" class="h-[50%] basis-6/12 w-[100%] bg-white"></div>
    <h1
      id="hello"
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold [&_span]:text-primary [&_span]:text-[3rem] lg:[&_span]:text-[5rem] xl:[&_span]:text-[7rem]"
    >
      Hello
    </h1>
    <div
      id="counter"
      class="absolute right-4 bottom-4 text-primary text-xl md:text-2xl lg:text-4xl font-semibold"
    ></div>
  </section>
</template>

<style lang="css" scoped>
.splash {
  @apply overflow-hidden fixed inset-0 z-[1000] flex flex-col pointer-events-none;
}
</style>
