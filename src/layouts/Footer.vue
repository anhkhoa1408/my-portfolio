<script setup lang="ts">
import { appConfigs } from "@/configs/app";
</script>

<template>
  <footer class="flex flex-col items-center justify-center">
    <h1 class="text-base lg:text-3xl font-bold mb-6 text-center">Feel free to connect on social media</h1>
    <p class="text-sm lg:text-xl font-semibold mb-6">Developed by Nguyen Anh Khoa</p>
    <div class="grid grid-cols-3 gap-4">
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
  </footer>
</template>

<style lang="css" scoped>
footer {
  background: url("/images/background/wave.svg") no-repeat center;
  background-size: cover;
  height: 500px;
  color: white;
}
</style>
