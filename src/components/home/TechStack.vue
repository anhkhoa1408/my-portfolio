<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";

gsap.registerPlugin(ScrollTrigger);

const stacksIcon = ref([
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
]);

onMounted(() => {
  // gsap.to("#stack", {
  //   bottom: 0,
  //   top: 0,
  //   borderRadius: 0,
  //   height: "100%",
  //   duration: 1,
  //   ease: "back",
  //   scrollTrigger: {
  //     trigger: "#stack",
  //     start: "top+=200 bottom",
  //     endTrigger: "#stack",
  //     end: "bottom top",
  //     scrub: false,
  //     toggleActions: "play reverse play reverse",
  //     markers: false,
  //   },
  // });

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
</script>

<template>
  <section id="stack" class="stack">
    <div class="container mx-auto py-10 md:py-16 lg:py-32 flex flex-col">
      <h1 class="font-bold text-xl md:text-2xl xl:text-5xl mb-[100px] self-center text-center">My Skills</h1>
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
