<script setup lang="ts">
import { ArrowTurnDownRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/16/solid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, ref } from "vue";
import Project from "./Project.vue";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "BlockID Dashboard",
    iconUrl: "/images/logo/blockid.svg",
    imageUrl: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1723262441/preview-project/blockid_h6a8hc.png",
    displacementImage: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1723368726/BlockID/header_3_b93kln.png",
    url: "",
  },
  {
    name: "BlockID Mobile",
    iconUrl: "/images/logo/blockid.svg",
    imageUrl: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1723300662/preview-project/blockid-mobile_psvqzx.png",
    displacementImage:
      "https://res.cloudinary.com/dvnvhnoub/image/upload/v1723370832/BlockID/Group_1000002212_blyuga.png",
    url: "",
  },
  {
    name: "BlockID Portal",
    iconUrl: "/images/logo/blockid.svg",
    imageUrl: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1723305986/preview-project/blockid-portal_iqjcli.png",
    displacementImage: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1716130702/portal-1/2_hmyly6.png",
    url: "https://blockid.vbchain.vn/lookup?sr=093106H433",
  },
  {
    name: "Cà Mau Portal",
    iconUrl: "/images/logo/camau.svg",
    imageUrl: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1723305984/preview-project/camau_mndzyj.png",
    displacementImage: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1716132177/portal-3/2_t8rtuj.png",
    url: "https://txng.camau.gov.vn/home",
  },
  {
    name: "Carbon Token Exchange",
    iconUrl: "/images/logo/cte.svg",
    imageUrl: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1723306488/preview-project/cte-market_bnzpv4.png",
    displacementImage: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1716367621/marketplace-2/2_zocuk7.png",
    url: "https://cte.vbchain.vn",
  },
  {
    name: "Real Estate Funding Hub",
    iconUrl: "/images/logo/refh.svg",
    imageUrl: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1723306488/preview-project/refh_dagbh4.png",
    displacementImage: "https://res.cloudinary.com/dvnvhnoub/image/upload/v1716368304/marketplace-3/3_kdfcaa.png",
    url: "https://refh.vbchain.vn",
  },
];

const activeProject = ref(Math.floor((projects.length - 1) / 2));

onMounted(() => {
  const spiralCards = document.querySelectorAll(".spiral-card");

  spiralCards.forEach((card, index) => {
    gsap.to(card, {
      duration: 2,
      scrollTrigger: {
        trigger: "#projects-wrap",
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
      onStart: () => {
        (card as HTMLDivElement).style.transform = `rotateY(${
          index * 30 - activeProject.value * 30
        }deg) translateZ(600px)`;
      },
    });
  });

  // Function to rotate cards based on scroll position
  function rotateCardsOnScroll(event: any) {
    // Calculate the rotation angle based on scroll position
    const scrollDelta = event.deltaY / 2; // Scroll delta value
    const rotationSpeed = 0.5; // Adjust this for rotation speed

    // Iterate through each card and apply rotation
    spiralCards.forEach((card: any, index) => {
      const currentRotation = parseFloat(card?.dataset?.rotation) || 0; // Get current rotation from data attribute
      const newRotation = currentRotation - scrollDelta * rotationSpeed; // Calculate new rotation

      // Update card rotation and store it in a data attribute
      card.style.transform = `rotateY(${newRotation}deg) translateZ(600px)`;
      card.dataset.rotation = newRotation; // Store the new rotation
    });
  }
});

const handleNextProject = () => {
  const middleIndex = Math.floor((projects.length - 1) / 2);
  if (activeProject.value < middleIndex) {
    activeProject.value = projects.length - 1;
  } else {
    ++activeProject.value;
  }
  const spiralCards = document.querySelectorAll(".spiral-card");
  if (activeProject.value === projects.length - 1) {
    activeProject.value = middleIndex;
    spiralCards.forEach((card: any, index) => {
      let newRotation = (index - activeProject.value) * 30;
      card.style.transform = `rotateY(${newRotation}deg) translateZ(600px)`;
      card.dataset.rotation = newRotation;
    });
  } else {
    spiralCards.forEach((card: any, index) => {
      const currentRotation = parseFloat(card?.dataset?.rotation) || 0;
      let newRotation =
        index === activeProject.value - Math.floor(projects.length / 2)
          ? -360 - currentRotation + 30
          : currentRotation - 30;
      card.style.transform = `rotateY(${newRotation}deg) translateZ(600px)`;
      card.dataset.rotation = newRotation;
    });
  }
};

const handlePrevProject = () => {
  const middleIndex = Math.floor((projects.length - 1) / 2);
  if (activeProject.value > middleIndex) {
    activeProject.value = -1;
  } else {
    --activeProject.value;
  }
  const spiralCards = document.querySelectorAll(".spiral-card");
  if (activeProject.value === -1) {
    activeProject.value = middleIndex;
    spiralCards.forEach((card: any, index) => {
      let newRotation = (index - activeProject.value) * 30;
      card.style.transform = `rotateY(${newRotation}deg) translateZ(600px)`;
      card.dataset.rotation = newRotation;
    });
  } else {
    spiralCards.forEach((card: any, index) => {
      const currentRotation = parseFloat(card?.dataset?.rotation) || 0;
      let newRotation =
        index === activeProject.value + Math.floor(projects.length / 2) + 1
          ? 360 - currentRotation + 30
          : currentRotation + 30;
      card.style.transform = `rotateY(${newRotation}deg) translateZ(600px)`;
      card.dataset.rotation = newRotation;
    });
  }
};

const showProjectCursor = (e: MouseEvent) => {
  const cursorEle = document.getElementById("cursor-detail");
  const targetEle = e.target as HTMLDivElement;

  if (!cursorEle) return;

  if (targetEle.closest(".spiral-card")) {
    cursorEle.style.left = e.clientX + cursorEle.clientWidth / 2 + "px";
    cursorEle.style.top = e.clientY - cursorEle.clientHeight / 2 + "px";
    cursorEle.style.opacity = "1";
    cursorEle.style.transform = "scale(1)";
  } else {
    cursorEle.style.opacity = "0";
    cursorEle.style.transform = "scale(0)";
  }
};

onMounted(() => {
  const projectsEle = document.getElementById("projects");
  if (!projectsEle) return;

  projectsEle.addEventListener("mousemove", showProjectCursor);
});

onUnmounted(() => {
  const projectsEle = document.getElementById("projects");
  if (!projectsEle) return;

  projectsEle.removeEventListener("mousemove", showProjectCursor);
});
</script>

<template>
  <section id="projects" class="flex flex-col py-10 md:py-16 lg:py-32 bg-black">
    <div
      id="cursor-detail"
      class="cursor-detail flex items-center text-sm border-2 border-solid border-secondary-50 rounded-md"
    >
      <ArrowTurnDownRightIcon class="size-6 p-1 text-black" />
      View details
    </div>
    <h1 class="font-bold text-3xl xl:text-5xl self-center mb-10 lg:mb-[100px] gradient-text">Projects</h1>
    <div class="relative">
      <div id="projects-wrap" class="spiral-container">
        <div
          v-for="(project, index) of projects"
          :key="index"
          :class="[{ active: index === activeProject }, `spiral-card x-${index} text-black`]"
          :data-rotation="(index - Math.floor((projects.length - 1) / 2)) * 30"
        >
          <Project :data="project" :is-active="activeProject === index" :index="index" />
        </div>
      </div>

      <button @click="handlePrevProject" class="nav nav__prev">
        <ChevronLeftIcon class="w-[30px] h-[30px]" />
      </button>
      <button @click="handleNextProject" class="nav nav__next">
        <ChevronRightIcon class="w-[30px] h-[30px]" />
      </button>
    </div>
  </section>
</template>

<style lang="css" scoped>
.spiral-container {
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  perspective: 3000px;

  &:hover ~ .nav {
    @apply bg-primary-900;
  }
}

.spiral-card {
  position: absolute;
  width: 225px;
  top: 40px;
  left: calc(50% - 112px) !important;
  transition: all 0.8s ease;
  transform-style: preserve-3d !important;
  transform-origin: center !important;
}

.nav {
  @apply flex items-center justify-center p-2 absolute rounded-full duration-200;
  top: 35%;

  &:hover {
    @apply bg-primary-900;
  }

  &:active {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.1;
  }

  &.nav__prev {
    @apply left-2;
  }
  &.nav__next {
    @apply right-2;
  }
}

.cursor-detail {
  @apply bg-primary text-white p-2 fixed z-50;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
</style>
