<script setup lang="ts">
import * as THREE from "three";
import { Camera, Points, PointsMaterial, Renderer, Scene } from "troisjs";

import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { onMounted, ref } from "vue";

const geometry = ref(new THREE.BufferGeometry());
const particlesRef = ref(null);

onMounted(() => {
  const loader = new SVGLoader();
  const svgData = loader.parse(`
        <svg width="50" height="50" viewBox="0 0 841.9 595.3" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#61dafb" stroke-width="20">
            <ellipse cx="420.9" cy="296.5" rx="115.9" ry="231.8" />
            <ellipse cx="420.9" cy="296.5" rx="231.8" ry="115.9" transform="rotate(60 420.9 296.5)" />
            <ellipse cx="420.9" cy="296.5" rx="231.8" ry="115.9" transform="rotate(-60 420.9 296.5)" />
          </g>
        </svg>
      `);

  const paths = svgData.paths;
  const points: any[] = [];

  paths.forEach((path) => {
    path.subPaths.forEach((subPath) => {
      const tempPoints = subPath.getPoints(100); // Increase for more resolution
      tempPoints.forEach((point) => {
        points.push(point.x / 100 - 4.2, -point.y / 100 + 3, 0); // Normalize and center
      });
    });
  });

  // Shuffle points to spread particles more evenly
  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }

  // Set geometry points
  geometry.value.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));

  // Animate the particles
  animate();
});

const animate = () => {
  requestAnimationFrame(animate);
};
</script>

<template>
  <Renderer>
    <Camera :position="{ x: 0, y: 0, z: 10 }" :fov="75" />
    <Scene>
      <!-- Orbit Controls for interaction -->
      <!-- Particles -->
      <Points ref="particles" :geometry="geometry">
        <PointsMaterial :size="0.05" color="#61dafb" transparent :depthWrite="false" />
      </Points>
    </Scene>
  </Renderer>
</template>
