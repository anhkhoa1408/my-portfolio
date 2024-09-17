<script setup lang="ts">
import Banner from "@/components/home/Banner.vue";
import Contact from "@/components/home/Contact.vue";
import ExperiencesAndEducation from "@/components/home/ExperiencesAndEducation.vue";
import ProjectList from "@/components/home/ProjectList.vue";
import TechStack from "@/components/home/TechStack.vue";
import Collaboration from "@/components/home/Collaboration.vue";
</script>

<template>
  <main>
    <Banner />
    <TechStack />
    <ExperiencesAndEducation />
    <ProjectList />
    <Collaboration />
    <Contact />
  </main>
</template>
