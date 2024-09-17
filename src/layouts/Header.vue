<script setup lang="ts">
import { RouterLink } from "vue-router";

const scrollToSection = (id: string) => {
  const ele = document.getElementById(id);

  if (!ele) return;

  window.scrollTo({
    top: ele.offsetTop,
    behavior: "smooth",
  });
};
</script>

<template>
  <header class="nav flex items-center justify-center w-full py-5 sticky top-0 bg-black z-[999]">
    <a to="#about" class="nav__link" @click="scrollToSection('banner')">About me</a>
    <a to="#projects" class="nav__link" @click="scrollToSection('projects')">Projects</a>
    <a to="#contact" class="nav__link" @click="scrollToSection('contact')">Contact</a>
  </header>
</template>

<style lang="css" scoped>
.nav {
  .nav__link {
    @apply text-white block mx-4 relative overflow-hidden duration-200 cursor-pointer;

    &::before,
    &::after {
      content: "";
      @apply absolute block bg-secondary bottom-0 h-[2px] w-[50%] duration-200;
    }

    &::before {
      @apply left-0 translate-x-[-102%];
    }
    &::after {
      @apply right-0 translate-x-[102%];
    }

    &:hover::before,
    &:hover::after {
      @apply translate-x-0;
    }
  }
}
</style>
