<script setup lang="ts">
import Banner from "@/components/home/Banner.vue";
import Contact from "@/components/home/Contact.vue";
import WorkingAndEducation from "@/components/home/WorkingAndEducation.vue";
import ProjectList from "@/components/home/ProjectList.vue";
import TechStack from "@/components/home/TechStack.vue";
</script>

<template>
  <main>
    <Banner />
    <TechStack />
    <WorkingAndEducation />
    <ProjectList />
    <Contact />
  </main>
</template>
