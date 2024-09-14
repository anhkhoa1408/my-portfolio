<script setup lang="ts">
import gsap from "gsap";
import * as THREE from "three";
import { onMounted, onUnmounted, ref } from "vue";

type ImageProps = {
  src: string;
  color: number;
};

const container = ref<HTMLDivElement | null>(null);

const activeImageData = ref<ImageData | null>(null);

const imagesData: ImageProps[] = [
  {
    src: "/images/logo/react.png",
    color: 0x5fc1d7,
  },
  {
    src: "/images/logo/vue.png",
    color: 0x42d392,
  },
  {
    src: "/images/logo/tailwind.png",
    color: 0x42d392,
  },
];

const activeImageIdx = ref<number>(0);

const originalPositions = ref<number[]>([]);

let scene: THREE.Scene,
  camera: THREE.OrthographicCamera,
  renderer: THREE.Renderer,
  particleSystem: THREE.Points,
  geometry: THREE.BufferGeometry;

const centerVector = new THREE.Vector3(0, 0, 0);

const initThreeJS = () => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  // init renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  // init scene
  scene = new THREE.Scene();

  // init camera
  camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
  camera.position.set(0, 0, 4);
  camera.lookAt(centerVector);
  scene.add(camera);
  camera.updateProjectionMatrix();

  getImageData(imagesData[activeImageIdx.value]);
};

const getImageData = (activeImage: ImageProps) => {
  const image = new Image();
  image.src = activeImage.src;
  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    if (!ctx) return;

    ctx.drawImage(image, 0, 0);
    activeImageData.value = ctx?.getImageData(0, 0, image.width, image.height);

    drawImage(activeImage.color);
  };
};

const drawImage = (color: number) => {
  if (!activeImageData?.value) return;

  geometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial({
    size: 2,
    color,
  });

  const vertices = [];
  const speeds = [];

  for (let y = 0, y2 = activeImageData.value.height; y < y2; y += 3) {
    for (let x = 0, x2 = activeImageData.value.width; x < x2; x += 3) {
      if (activeImageData.value.data[x * 4 + y * 4 * activeImageData.value.width] < 128) {
        const vertexX = x - activeImageData.value.width / 2;
        const vertexY = -y + activeImageData.value.height / 2;
        const vertexZ = Math.random() * 200;
        const speed = Math.random() / 10 + 0.015;
        vertices.push(vertexX, vertexY, vertexZ);
        speeds.push(speed);
        originalPositions.value.push(vertexX, vertexY, vertexZ);
      }
    }
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));

  geometry.center();

  particleSystem = new THREE.Points(geometry, material);

  scene.add(particleSystem);

  animate();
  animateParticles();
};

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

const clearOldParticles = () => {
  if (particleSystem) {
    geometry.dispose(); // Dispose of geometry
    particleSystem.clear(); // Dispose of material
    scene.remove(particleSystem); // Remove from scene
    originalPositions.value = [];
  }
};

const animateParticles = () => {
  const positions = geometry.attributes.position.array;

  // Randomize Y positions
  for (let i = 1; i < positions.length; i += 3) {
    positions[i] = originalPositions?.value[i] + Math.random() * 500 - 100; // Randomize Y within range
    positions[i - 1] = originalPositions?.value[i - 1] + Math.random() * 300 - 100; // Randomize Y within range
  }

  // Notify Three.js that geometry has changed
  geometry.attributes.position.needsUpdate = true;

  gsap.to(positions, {
    duration: 4,
    onUpdate: () => {
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] = gsap.utils.interpolate(positions[i], originalPositions?.value[i], 0.02);
        positions[i - 1] = gsap.utils.interpolate(positions[i - 1], originalPositions?.value[i - 1], 0.02);
      }
      geometry.attributes.position.needsUpdate = true;
    },
  });
};

// Handle window resizing
const onWindowResize = () => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

let intervalId: NodeJS.Timeout;

const changeStateIntervalFunc = () => {
  activeImageIdx.value = activeImageIdx.value < imagesData?.length - 1 ? ++activeImageIdx.value : 0;
  clearOldParticles();
  getImageData(imagesData[activeImageIdx.value]);
};

onMounted(() => {
  setTimeout(() => {
    initThreeJS();
    intervalId = setInterval(changeStateIntervalFunc, 3000);
    window.addEventListener("resize", onWindowResize);
  }, 3000);
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
  clearInterval(intervalId);
  clearOldParticles();
});
</script>

<style scoped>
.particle-container {
  width: 100%;
  height: 500px;
  overflow: hidden;

  @media screen and (max-width: 576px) {
    height: 280px;
  }
}
</style>

<template>
  <div ref="container" class="particle-container"></div>
</template>
