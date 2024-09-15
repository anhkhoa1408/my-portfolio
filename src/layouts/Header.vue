<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="nav flex items-center justify-center w-full py-5 sticky top-0 bg-black z-[999]">
    <RouterLink to="#about" class="nav__link">About me</RouterLink>
    <RouterLink to="#projects" class="nav__link">Projects</RouterLink>
    <RouterLink to="#contact" class="nav__link">Contact</RouterLink>
  </header>
</template>

<style lang="css" scoped>
.nav {
  .nav__link {
    @apply text-white block mx-4 relative overflow-hidden duration-200;

    &::before,
    &::after {
      content: "";
      @apply absolute block bg-secondary bottom-0 h-[2px] w-[50%] duration-200;
    }

    &::before {
      @apply left-0 translate-x-[-100%];
    }
    &::after {
      @apply right-0 translate-x-[100%];
    }

    &:hover::before,
    &:hover::after {
      @apply translate-x-0;
    }
  }
}
</style>
