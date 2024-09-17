<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";

import CodeJSON from "@/assets/images/animation/code.json";
import { LottieAnimation } from "lottie-web-vue";

gsap.registerPlugin(ScrollTrigger);

const stacksIcon = [
  {
    x: "40%",
    y: "30%",
    size: 80,
    url: "/images/react.svg",
  },
  {
    x: "20%",
    y: "50%",
    size: 70,
    url: "/images/vue.svg",
  },
  {
    x: "70%",
    y: "30%",
    size: 80,
    url: "/images/next-js.svg",
  },
  {
    x: "72%",
    y: "88%",
    size: 70,
    url: "/images/express.svg",
  },
  {
    x: "80%",
    y: "55%",
    size: 80,
    url: "/images/nuxt.svg",
  },
  {
    x: "50%",
    y: "70%",
    size: 60,
    url: "/images/react-native.svg",
  },
  {
    x: "10%",
    y: "20%",
    size: 50,
    url: "/images/redux.svg",
  },
  {
    x: "100%",
    y: "30%",
    size: 50,
    url: "/images/redux-saga.svg",
  },
  {
    x: "55%",
    y: "5%",
    size: 50,
    url: "/images/sass.svg",
  },
  {
    x: "30%",
    y: "5%",
    size: 50,
    url: "/images/tailwind-css.svg",
  },
  {
    x: "10%",
    y: "85%",
    size: 60,
    url: "/images/typescript.svg",
  },
  {
    x: "85%",
    y: "10%",
    size: 60,
    url: "/images/bootstrap.svg",
  },
];

const langsAndTools = [
  "/images/javascript.svg",
  "/images/typescript.svg",
  "/images/vite.svg",
  "/images/webpack.svg",
  "/images/sass.svg",
];

const libsAndFrameworks = [
  "/images/react.svg",
  "/images/next-js.svg",
  "/images/redux.svg",
  "/images/redux-saga.svg",
  "/images/vue.svg",
  "/images/nuxt.svg",
  "/images/express.svg",
  "/images/react-native.svg",
  "/images/bootstrap.svg",
  "/images/tailwind-css.svg",
  "/images/tanstack-query.svg",
];

const database = ["/images/mongodb.svg"];

const lottiesAnimation = ref();
onMounted(() => {
  setTimeout(() => {
    lottiesAnimation.value.goToAndPlay(150, true);
  }, 500);

  const cardStacksEle = document.querySelectorAll(".card-stack");

  cardStacksEle.forEach((card, index, parent) => {
    gsap.to(card, {
      scale: 1 - (parent.length - index - 1) * 0.1,
      top: -(parent.length - index - 1) * 25,
      duration: 3,
      ease: "power1.out",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#stack",
      start: "top 50%",
      end: "bottom top",
      scrub: false,
    },
  });

  timeline
    .add("fade", 0)
    .fromTo(
      ".circle",
      {
        opacity: 0,
        ease: "circ.in",
      },
      {
        duration: 2,
        opacity: 1,
      },
      "fade",
    )
    .fromTo(
      ".stack-icon",
      {
        opacity: 0,
        ease: "bounce.inOut",
      },
      {
        duration: 2,
        delay: 1,
        opacity: 1,
      },
      "fade",
    );
});

const handleMouseEnterCard = (event: MouseEvent) => {
  gsap.to(event.target, {
    rotate: -5,
    translateY: -80,
    ease: "power3.in",
    delay: 0,
  });
};

const handleMouseLeaveCard = (event: MouseEvent) => {
  gsap.to(event.target, {
    rotate: 0,
    translateY: 0,
    ease: "power3.in",
    delay: 0,
  });
};

const handleClickCard = (event: MouseEvent) => {
  const detailStackEle = document.getElementById("detail-stack");
  const dataIndex = parseFloat((event.currentTarget as HTMLDivElement)?.dataset?.index || "1");

  if (!detailStackEle) return;

  window.scrollTo({
    top: detailStackEle?.offsetTop - 150 + (detailStackEle.offsetHeight * (dataIndex - 1)) / 3,
    behavior: "smooth",
  });
};
</script>

<template>
  <section id="stack" class="stack">
    <div class="container mx-auto py-10 md:py-16 lg:py-32 flex flex-col">
      <h1 class="font-bold text-3xl xl:text-5xl mb-[100px] self-center text-center gradient-text">My Skills</h1>
      <div class="circle-wrap overflow-hidden relative flex flex-col items-center">
        <div
          v-for="icon in stacksIcon"
          :key="icon.url"
          class="absolute bg-white rounded-full z-20 stack-icon"
          :style="{ top: `${icon.y}`, left: `${icon.x}`, width: `${icon.size}px`, height: `${icon.size}px` }"
          :src="icon.url"
        >
          <img :src="icon.url" class="w-full h-full object-contain p-2" />
        </div>

        <div id="circle-splash-top" class="circle-splash"></div>
        <div id="circle-splash-bottom" class="circle-splash"></div>
        <div class="circle circle-outer">
          <div class="circle circle-middle">
            <div class="circle circle-inner"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="detail-stack" class="container mx-auto py-10 md:py-16 lg:py-32 grid grid-cols-2 gap-4">
      <div class="col-span-2 md:col-span-1 flex flex-col justify-between h-[1500px]">
        <div class="sticky top-[250px]">
          <div
            data-index="1"
            class="card-stack"
            @click="handleClickCard($event)"
            @mouseenter="handleMouseEnterCard($event)"
            @mouseleave="handleMouseLeaveCard($event)"
          >
            <h2 class="card-stack-title">Language and Tools</h2>
            <div class="grid grid-cols-8 gap-2 lg:gap-6">
              <div v-for="lang in langsAndTools" class="grid-cols-1 flex items-center justify-center">
                <img :src="lang" class="size-6 lg:size-12" />
              </div>
            </div>
          </div>
        </div>

        <div class="sticky top-[250px]">
          <div
            data-index="2"
            class="card-stack"
            @click="handleClickCard($event)"
            @mouseenter="handleMouseEnterCard($event)"
            @mouseleave="handleMouseLeaveCard($event)"
          >
            <h2 class="card-stack-title">Library and Frameworks</h2>
            <div class="grid grid-cols-8 gap-2 lg:gap-6">
              <div v-for="(lib, index) in libsAndFrameworks" class="grid-cols-1">
                <img :src="lib" :class="['size-6 lg:size-12', { 'bg-white p-2': index === 6 }]" />
              </div>
            </div>
          </div>
        </div>

        <div class="sticky top-[250px]">
          <div
            data-index="3"
            class="card-stack"
            @click="handleClickCard($event)"
            @mouseenter="handleMouseEnterCard($event)"
            @mouseleave="handleMouseLeaveCard($event)"
          >
            <h2 class="card-stack-title">Database</h2>
            <div class="grid grid-cols-8 gap-2 lg:gap-6">
              <div v-for="db in database" class="grid-cols-1">
                <img :src="db" class="size-6 lg:size-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="[&>div]:h-[250px] md:[&>div]:h-[400px] lg:[&>div]:h-[450px] sticky top-[150px]">
          <LottieAnimation :animation-data="CodeJSON" :auto-play="true" :loop="true" :speed="0.5" ref="anim" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.circle {
  border-radius: 50%;
  border-style: dashed;
  @apply border-2 border-secondary-100;
  animation: Spin 80s linear infinite;

  &.circle-outer {
    width: 600px;
    height: 600px;
    padding: 80px;

    .circle-middle,
    .circle-inner {
      width: 100%;
      height: 100%;
      padding: 80px;
    }

    @media screen and (max-width: 576px) {
      width: 350px;
      height: 350px;
      padding: 30px;

      .circle-middle,
      .circle-inner {
        padding: 30px;
      }
    }
  }
}

.stack-icon {
  animation: TranslateUpDown 2s linear infinite;

  @media screen and (max-width: 576px) {
    width: 40px !important;
    height: 40px !important;
  }
}

.card-stack {
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  background-color: #2f444473;
  @apply h-[180px] md:h-[250px] rounded-md py-6 px-4 relative duration-200 ease-in-out cursor-pointer;

  .card-stack-title {
    @apply mb-5 lg:mb-8 text-white text-lg md:text-xl xl:text-2xl font-semibold;
  }
}

@keyframes Spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes TranslateUpDown {
  0% {
    transform: translateY(-5px);
  }
  25% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(5px);
  }
  75% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-5px);
  }
}
</style>
