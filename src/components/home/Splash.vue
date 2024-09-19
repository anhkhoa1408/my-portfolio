<script setup lang="ts">
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitType from "split-type";
import { onMounted } from "vue";

gsap.registerPlugin(CustomEase);

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
      .add("(max-width: 639px)", () => {
        timeline.add("loading-and-welcome", 0).fromTo(
          "#hello span",
          {
            letterSpacing: "1.2rem",
          },
          {
            letterSpacing: "0.2rem",
            ease: CustomEase.create("", ".25,.87,.92,-0.05"),
            duration: 2,
          },
          "loading-and-welcome",
        );
      })
      .add("(min-width: 640px)", () => {
        timeline.add("loading-and-welcome", 0).fromTo(
          "#hello span",
          {
            letterSpacing: "2rem",
          },
          {
            letterSpacing: "0.5rem",
            ease: CustomEase.create("", ".25,.87,.92,-0.05"),
            duration: 2,
          },
          "loading-and-welcome",
        );
      })
      .add("(min-width: 768px)", () => {
        timeline.add("loading-and-welcome", 0).fromTo(
          "#hello span",
          {
            letterSpacing: "3rem",
          },
          {
            letterSpacing: "0.5rem",
            ease: CustomEase.create("", ".25,.87,.92,-0.05"),
            duration: 2,
          },
          "loading-and-welcome",
        );
      })
      .add("(min-width: 1024px)", () => {
        timeline.add("loading-and-welcome", 0).fromTo(
          "#hello span",
          {
            letterSpacing: "3.5rem",
          },
          {
            letterSpacing: "0.5rem",
            ease: CustomEase.create("", ".25,.87,.92,-0.05"),
            duration: 2,
          },
          "loading-and-welcome",
        );
      })
      .add("(min-width: 1280px)", () => {
        timeline.add("loading-and-welcome", 0).fromTo(
          "#hello span",
          {
            letterSpacing: "4.5rem",
          },
          {
            letterSpacing: "0.5rem",
            ease: CustomEase.create("", ".25,.87,.92,-0.05"),
            duration: 2,
          },
          "loading-and-welcome",
        );
      })
      .add("(min-width: 1400px)", () => {
        timeline.add("loading-and-welcome", 0).fromTo(
          "#hello span",
          {
            letterSpacing: "4.5rem",
          },
          {
            letterSpacing: "0.5rem",
            ease: CustomEase.create("", ".25,.87,.92,-0.05"),
            duration: 2,
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
            counterEle.innerText = `${counter.value.toString()}%`;
          },
        },
        "loading-and-welcome",
      )
      .add("end-counter", 2.5)
      .to(
        "#top-splash",
        {
          transform: "translateY(-162%)",
          duration: 0.75,
        },
        "end-counter",
      )
      .to(
        "#bottom-splash",
        {
          transform: "translateY(162%)",
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
    <div id="top-splash" class="h-[52%] basis-6/12 w-[100%] bg-white will-change-transform"></div>
    <div id="bottom-splash" class="h-[52%] basis-6/12 w-[100%] bg-white will-change-transform"></div>
    <h1
      id="hello"
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold [&_span]:text-primary [&_span]:text-[2.2rem] md:[&_span]:text-[3.2rem] lg:[&_span]:text-[5rem] xl:[&_span]:text-[7rem]"
    >
      Hello
    </h1>
    <div
      id="counter"
      class="absolute right-4 bottom-4 text-primary text-xl md:text-2xl lg:text-4xl font-semibold will-change-contents"
    ></div>
  </section>
</template>

<style lang="css" scoped>
.splash {
  @apply overflow-hidden fixed inset-0 z-[1000] flex flex-col pointer-events-none;
}
</style>
