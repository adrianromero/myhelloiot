import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/myhelloiot/",
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,wav,mp3,gltf,bin,eot,ttf,woff,woff2}",
        ],
        maximumFileSizeToCacheInBytes: 25097152,
      },
    }),
  ],
});
