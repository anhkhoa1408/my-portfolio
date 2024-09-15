<script setup lang="ts">
import { onMounted } from "vue";
import ParticleLogo from "./ParticleLogo.vue";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import SplitType from "split-type";

gsap.registerPlugin(TextPlugin);

const wordsIntro = ["A Frontend Developer", "I build things for web and mobile application"];

onMounted(() => {
  new SplitType("#intro-text", {
    split: "words",
    tagName: "span",
  });

  gsap.from("#intro-text .word", {
    opacity: 0.2,
    scrollTrigger: {
      trigger: "#intro-text",
      start: "top 60%",
      end: "top 10%",
      scrub: true,
    },
    stagger: 0.2,
    duration: 0.2,
  });

  gsap.to("#cursor", {
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 0.5,
    ease: "power2.out",
  });

  const timeline = gsap.timeline({ repeat: -1 });

  wordsIntro.forEach((word) => {
    const letters = word.split("");
    let timelineText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 3 });

    // Animate each letter appearing one by one
    letters.forEach((letter, index) => {
      timelineText.to(
        "#animated-text",
        {
          duration: 0.1,
          text: { value: word.substring(0, index + 1) },
          ease: "none",
        },
        index * 0.1,
      );
    });

    // Add the sub-timeline to the main timeline
    timeline.add(timelineText);
  });
});
</script>

<template>
  <section id="banner" class="banner flex flex-col py-24 md:py-16 lg:py-32">
    <div class="container grid grid-cols-5 gap-10 lg:gap-5 relative">
      <div class="col-span-5 lg:col-span-3 flex flex-col items-start gradial-box">
        <p class="font-semibold text-sm xl:text-base mb-3">Hello, my name is</p>
        <h1 class="font-bold text-3xl md:text-3xl xl:text-5xl mb-6 gradient-text">Nguyen Anh Khoa</h1>
        <p class="leading-relaxed text-2xl xl:text-3xl mb-6">
          <span id="animated-text"></span>
          <span id="cursor"> _</span>
        </p>
        <div>
          <button class="btn btn-primary mr-4">Contact me</button>
        </div>
      </div>
      <div class="col-span-5 lg:col-span-2">
        <ParticleLogo />
      </div>
    </div>
    <div class="container flex items-center justify-center mt-[100px] sm:mt-0 lg:h-[800px]">
      <p
        id="intro-text"
        class="leading-relaxed md:leading-relaxed xl:leading-relaxed text-sm md:text-2xl xl:text-3xl font-semibold text-center"
      >
        I'm a Front-end Developer with 3 years experiences of Web Development. I enjoy solving problem and creating best
        user experiences for users. I also enjoy exploring and learning about new technologies, and reading blog posts
        from those who are ahead in the field to gain more experience and knowledge for myself.
      </p>
    </div>
  </section>
</template>

<style lang="css" scoped>
.banner {
  @apply bg-black;
}
</style>
