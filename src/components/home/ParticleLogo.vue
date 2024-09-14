<script setup lang="ts">
import * as THREE from "three";
import { onMounted, onUnmounted, ref } from "vue";

const container = ref<HTMLDivElement | null>(null);

const imageData = ref<ImageData | null>(null);

const imageSrc = ref("/images/logo/react.png");

const originalGeoPoints = ref({});

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

  getImageData(imageSrc.value);
};

const getImageData = (imgSrc: string) => {
  const image = new Image();
  image.src = imgSrc;
  image.onload = () => {
    console.log("load");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    if (!ctx) return;

    ctx.drawImage(image, 0, 0);
    imageData.value = ctx?.getImageData(0, 0, image.width, image.height);

    drawImage();
  };
};

const drawImage = () => {
  if (!imageData?.value) return;

  geometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial({
    size: 2,
    color: 0x5fc1d7,
  });

  const vertices = [];
  const speeds = [];

  for (let y = 0, y2 = imageData.value.height; y < y2; y += 4) {
    for (let x = 0, x2 = imageData.value.width; x < x2; x += 4) {
      if (imageData.value.data[x * 4 + y * 4 * imageData.value.width] < 128) {
        const vertexX = x - imageData.value.width / 2;
        const vertexY = -y + imageData.value.height / 2;
        const vertexZ = Math.random() * 200;
        const speed = Math.random() / 10 + 0.015;
        vertices.push(vertexX, vertexY, vertexZ);
        speeds.push(speed);
      }
    }
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));

  geometry.center();

  particleSystem = new THREE.Points(geometry, material);

  scene.add(particleSystem);

  animate();
};

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  if (particleSystem) {
    particleSystem.rotation.z += 0.001;
  }
  renderer.render(scene, camera);
};

const clearOldParticles = () => {
  if (particleSystem) {
    scene.remove(particleSystem); // Remove from scene
    geometry.dispose(); // Dispose of geometry
    particleSystem.clear(); // Dispose of material
  }
};

// Handle window resizing
const onWindowResize = () => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

// Vue lifecycle hooks
onMounted(() => {
  initThreeJS();
  window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onWindowResize);
});
</script>

<style scoped>
.particle-container {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
</style>

<template>
  <div ref="container" class="particle-container"></div>

  <button @click="clearOldParticles">Change</button>
</template>
