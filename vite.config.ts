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
      includeAssets: ["logo.svg", "logo192.png"],
      manifest: {
        name: "MYHELLOIOT",
        short_name: "MYHELLOIOT",
        description: "MYHELLOIOT MQTT Dashboard",
        theme_color: "#001528",
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
