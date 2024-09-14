<script setup lang="ts">
import ParticleLogo from "./ParticleLogo.vue";
</script>

<template>
  <div id="banner" class="banner h-[500px] lg:h-[90vh] flex items-center">
    <div class="container py-20 md:py-16 lg:py-32 grid grid-cols-5 gap-5 relative">
      <div class="col-span-5 lg:col-span-3 flex flex-col items-start gradial-box">
        <p class="font-semibold text-sm xl:text-base mb-3">Hi, I am</p>
        <h1 class="font-bold text-xl md:text-3xl xl:text-5xl mb-6 mask-name">Nguyen Anh Khoa</h1>
        <p class="leading-relaxed text-sm xl:text-base mb-6">
          I'm a Front-end Developer with 3 years experiences of Web Development. I enjoy solving problem and creating
          best user experiences for users. I also enjoy exploring and learning about new technologies, and reading blog
          posts from those who are ahead in the field to gain more experience and knowledge for myself.
        </p>
        <div>
          <button class="btn btn-primary mr-4">Contact me</button>
        </div>
      </div>
      <div class="col-span-2 -my-20 md:-my-16 lg:-my-32">
        <ParticleLogo />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.banner {
  @apply bg-black;
}
</style>
