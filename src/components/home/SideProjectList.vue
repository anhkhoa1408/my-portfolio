<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted } from "vue";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "My Portfolio",
    imageUrl: "/images/project/my-port.png",
    url: "https://github.com/anhkhoa1408/my-portfolio",
    class: "object-left-top",
    description: "My portfolio project build using VueJS, GSAP and ThreeJS",
  },
  {
    name: "Designer Portfolio",
    imageUrl: "/images/project/pnhi-port.png",
    url: "https://phuong-nhi-portfolio.netlify.app/",
    class: "object-left-top",
    description: "My friend's portfolio project build using ReactJS and MatterJS",
  },
  {
    name: "E-store Flower",
    imageUrl: "/images/project/flower.png",
    url: "https://flower-estore.vercel.app/",
    class: "object-left-top",
    description: "A flower-estore shop build using NuxtJS",
  },
  {
    name: "Portfolio Mailer",
    imageUrl: "/images/project/mail.png",
    url: "https://github.com/anhkhoa1408/portfolio-mailer",
    class: "object-center",
    description: "A project to send mail to my portfolio using ExpressJS, Nodemailer and HBS for template email",
  },
  {
    name: "Clear Hackathon",
    imageUrl: "/images/project/hackathon.jpg",
    url: "https://github.com/anhkhoa1408/clear-hackathon",
    class: "object-left-top",
    description: "Clear Hackathon Front-end",
  },
];

const openProject = (url: string) => {
  window.open(url);
};

onMounted(() => {
  const matchMedia = gsap.matchMedia();

  matchMedia.add("(min-width: 1024px)", () => {
    const projects = gsap.utils.toArray("#side-projects .side-project");
    gsap.to(projects, {
      xPercent: -100 * (projects.length - 1),
      padding: 0,
      scrollTrigger: {
        trigger: "#side-projects",
        pin: true,
        pinnedContainer: "#side-projects",
        start: "top 150px",
        end: "bottom top",
        scrub: true,
      },
    });
  });
});
</script>

<template>
  <id id="side-projects" class="flex flex-nowrap gap-4 lg:gap-10 px-5 lg:px-10">
    <template v-for="(project, index) in projects" :key="index">
      <div
        @click="openProject(project.url)"
        class="flex-none cursor-pointer w-[80vw] h-[300px] md:h-[300px] md:w-[450px] lg:h-[400px] lg:w-[500px] bg-white rounded-xl side-project transform-gpu overflow-hidden relative"
      >
        <img
          :class="['w-full h-full object-cover absolute inset-0 rounded-xl overflow-hidden', project.class]"
          :src="project.imageUrl"
        />
        <div class="side-project-des">
          <h1 class="gradient-text text-lg md:text-xl font-bold mb-3">{{ project.name }}</h1>
          <p class="text-white italic text-xs md:text-sm">{{ project.description }}</p>
        </div>
      </div>
    </template>
  </id>
</template>

<style lang="css" scoped>
.cursor-detail {
  @apply bg-primary text-white p-2 fixed z-50;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

#side-projects {
  overflow-x: hidden;
  will-change: transform, opacity;
  & .side-project {
    transition: all 0.3s ease;
    position: relative;

    &,
    & > * {
      transition: all 0.3s ease;
    }

    .side-project-des {
      @apply p-4;
      z-index: 2;
      position: absolute;
      top: 100%;
      height: 40%;
      left: 0;
      right: 0;
      backdrop-filter: blur(25px) saturate(200%);
      -webkit-backdrop-filter: blur(25px) saturate(200%);
      background-color: #2f444473;
      z-index: 1;
      transition: all 0.3s ease;

      h1 {
        position: relative;
      }

      h1::before {
        content: "";
        position: absolute;
        bottom: -5px;
        width: 100px;
        height: 3px;
        border-radius: 16px;
        background-image: linear-gradient(132.6deg, #478bd6 23.3%, #25d8d3 84.7%);
      }
    }

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      top: -100%;
      height: 100%;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    @media screen and (min-width: 1024px) {
      &:hover .side-project-des {
        transform: translateY(-100%);
      }

      &:hover::before {
        transform: translateY(100%);
      }

      &:hover {
        img {
          transform: scale(1.05);
          filter: blur(2px) brightness(70%);
        }
      }
    }

    @media screen and (max-width: 1023px) {
      .side-project-des {
        transform: translateY(-100%);
      }

      img {
        filter: brightness(70%);
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  #side-projects {
    overflow-x: auto;
    scroll-snap-type: x mandatory;

    & .side-project {
      scroll-snap-align: center;
    }
  }
}
</style>
