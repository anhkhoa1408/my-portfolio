<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, ref } from "vue";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: "", title: "", imgUrl: "" },
  { name: "", title: "", imgUrl: "" },
  { name: "", title: "", imgUrl: "" },
  { name: "", title: "", imgUrl: "" },
  { name: "", title: "", imgUrl: "" },
  { name: "", title: "", imgUrl: "" },
];

const activeProject = ref(Math.floor(projects.length / 2) - 1);

onMounted(() => {
  const spiralCards = document.querySelectorAll(".spiral-card");

  spiralCards.forEach((card, index) => {
    gsap.to(card, {
      duration: 2,
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "bottom top",
      },
      onStart: () => {
        card.style.transform = `rotateY(${index * 30 - activeProject.value * 30}deg) translateZ(600px)`;
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

  // Add event listener for mouse wheel scroll
  // window.addEventListener("wheel", rotateCardsOnScroll);
});
</script>

<template>
  <section class="flex flex-col py-14 h-[1000px]">
    <h1 class="font-bold text-5xl self-center mb-[100px]">Projects</h1>
    <div id="projects" class="spiral-container">
      <div v-for="(project, index) of projects" :class="`bg-white spiral-card x-${index}`"></div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.spiral-container {
  width: 100%;
  height: 500px;
  position: relative;
  perspective: 1500px;
}

.spiral-card {
  position: absolute;
  width: 250px;
  height: 200px;
  top: 100px;
  left: calc(50% - 125px) !important;
  transition: all 1s ease;
  transform-style: preserve-3d !important;
  transform-origin: center !important;
}
</style>
