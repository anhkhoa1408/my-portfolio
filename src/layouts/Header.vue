<script setup lang="ts">
import { Bars2Icon, XMarkIcon } from "@heroicons/vue/20/solid";
import { onMounted, onUnmounted, ref } from "vue";

const openSidebar = ref(false);

const scrollToSection = (id: string) => {
  const ele = document.getElementById(id);

  if (!ele) return;

  window.scrollTo({
    top: ele.offsetTop,
    behavior: "smooth",
  });
  openSidebar.value = false;
};

const scrollHandler = () => {
  const headerMobileEle = document.getElementById("header-mobile");

  if (!headerMobileEle) return;

  if (window.scrollY > 0) {
    headerMobileEle.classList.add("bg-glass");
  } else {
    headerMobileEle.classList.remove("bg-glass");
  }
};

onMounted(() => {
  window.addEventListener("scroll", scrollHandler);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHandler);
});
</script>

<template>
  <header class="nav container hidden lg:flex items-center justify-center w-full py-5 sticky top-0 bg-black z-[900]">
    <a to="#about" class="nav__link" @click="scrollToSection('banner')">About me</a>
    <a to="#projects" class="nav__link" @click="scrollToSection('projects')">Projects</a>
    <a to="#contact" class="nav__link" @click="scrollToSection('contact')">Contact</a>
  </header>
  <div id="header-mobile" class="container py-5 flex lg:hidden items-center justify-start sticky top-0 z-[901]">
    <div @click="openSidebar = !openSidebar" class="z-10">
      <Bars2Icon v-if="!openSidebar" class="size-6 text-white" />
      <XMarkIcon v-else class="size-6 text-white" />
    </div>
    <div
      :class="[
        'flex lg:hidden flex-col items-center justify-center gap-5 fixed h-screen ease-linear duration-200 inset-0 will-change-transform',
        {
          'translate-y-0 bg-[rgba(0,0,0,0.8)]': openSidebar,
          'translate-y-[-100%]': !openSidebar,
        },
      ]"
    >
      <a to="#about" class="nav__link z-10 text-base text-white" @click="scrollToSection('banner')">About me</a>
      <a to="#projects" class="nav__link z-10 text-base text-white" @click="scrollToSection('projects')">Projects</a>
      <a to="#contact" class="nav__link z-10 text-base text-white" @click="scrollToSection('contact')">Contact</a>
    </div>
  </div>
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
