<script setup lang="ts">
import { appConfigs } from "@/configs/app";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import SplitType from "split-type";
import { onMounted, onUnmounted } from "vue";
import ParticleLogo from "./ParticleLogo.vue";

gsap.registerPlugin(TextPlugin);

const wordsIntro = ["A Frontend Developer", "I build things for web and mobile application"];

onMounted(() => {
  new SplitType("#intro-text", {
    split: "words",
    tagName: "span",
  });

  gsap.from("#intro-text .word", {
    willChange: "opacity",
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

const showBlendCursor = (e: MouseEvent) => {
  const cursorEle = document.getElementById("blend-cursor");
  const target = e.target as HTMLDivElement;

  if (!cursorEle || !target) return;

  if (target.closest(".zoom")) {
    cursorEle.style.width = "200px";
    cursorEle.style.height = "200px";
  } else {
    cursorEle.style.width = "100px";
    cursorEle.style.height = "100px";
  }

  cursorEle?.style.setProperty("--x", e.clientX + "px");
  cursorEle?.style.setProperty("--y", e.clientY + "px");
};

const checkCursorBound = () => {
  const cursorEle = document.getElementById("blend-cursor");
  const bannerEle = document.getElementById("banner");

  if (!cursorEle || !bannerEle) return;

  const isInBound = window.scrollY <= bannerEle.offsetTop + bannerEle.offsetHeight;

  if (!isInBound) {
    cursorEle.style.opacity = "0";
    cursorEle.style.transform = "scale(0) translate(-50%,-50%)";
  } else {
    cursorEle.style.opacity = "1";
    cursorEle.style.transform = "scale(1) translate(-50%,-50%)";
  }
};

onMounted(() => {
  window.addEventListener("mousemove", showBlendCursor);
  window.addEventListener("scroll", checkCursorBound);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", showBlendCursor);
  window.removeEventListener("scroll", checkCursorBound);
});
</script>

<template>
  <section id="banner" class="banner flex flex-col py-12 md:py-16 lg:py-32">
    <div id="blend-cursor" :style="{ '--y': '-1000px', '--x': '-1000px' }" class="hidden lg:block"></div>
    <div class="container grid grid-cols-5 gap-10 lg:gap-5 relative">
      <div class="col-span-5 lg:col-span-3 flex flex-col items-start gradial-box zoom">
        <p class="font-semibold text-sm md:text-base xl:text-xl mb-3">Hello, my name is</p>
        <h1 class="font-bold text-3xl md:text-4xl xl:text-6xl mb-4 lg:mb-6 gradient-text">Nguyen Anh Khoa</h1>
        <p class="leading-relaxed text-xl md:text-3xl xl:text-3xl mb-6 md:mb-10">
          <span id="animated-text"></span>
          <span id="cursor"> _</span>
        </p>
        <div class="grid grid-cols-3 gap-4 mb-6">
          <a :href="appConfigs.facebookUrl" target="_blank" rel="noopener noreferer" class="col-span-1">
            <img src="/images/social/facebook.svg" />
          </a>
          <a :href="appConfigs.linkedinUrl" target="_blank" rel="noopener noreferer" class="col-span-1">
            <img src="/images/social/linkedin.svg" />
          </a>
          <a :href="appConfigs.githubUrl" target="_blank" rel="noopener noreferer" class="col-span-1">
            <img src="/images/social/github.svg" />
          </a>
        </div>
        <a class="btn btn-primary mr-4" target="_blank" rel="noopener noreferer" :href="appConfigs.facebookUrl">
          Contact me
        </a>
      </div>
      <div class="col-span-5 lg:col-span-2">
        <ParticleLogo />
      </div>
    </div>
    <div class="container flex items-center justify-center mt-[100px] lg:mt-0 lg:h-[800px]">
      <p
        id="intro-text"
        class="leading-relaxed md:leading-relaxed xl:leading-relaxed text-sm md:text-2xl xl:text-3xl font-semibold text-center zoom"
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

#blend-cursor {
  position: fixed;
  width: 100px;
  height: 100px;
  top: var(--y);
  left: var(--x);
  mix-blend-mode: difference;
  background-color: white;
  border-radius: 50%;
  z-index: 50;
  transition: transform 0.75s ease, scale 0.75s ease, width 0.3s linear, height 0.3s linear;
  pointer-events: none;
  transform: scale(0), translate(-50%, -50%);
  opacity: 0;
}
</style>
