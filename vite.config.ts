import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";

import { templateCompilerOptions } from "@tresjs/core";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: ["console", "debugger"],
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue({ ...templateCompilerOptions })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
