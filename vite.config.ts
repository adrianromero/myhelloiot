import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/myhelloiot/",
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
        react(),
        svgr(),
        VitePWA({
            workbox: {
                globPatterns: [
                    "**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,wav,mp3,gltf,bin,eot,ttf,woff,woff2,txt,json}",
                ],
                maximumFileSizeToCacheInBytes: 25097152,
            },
            includeAssets: ["**/*"],
            manifest: {
                name: "MYHELLOIOT",
                short_name: "MYHELLOIOT",
                description: "MYHELLOIOT MQTT Dashboard",
                theme_color: "#001528",
                icons: [
                    {
                        src: "pwa-64x64.png",
                        sizes: "64x64",
                        type: "image/png",
                    },
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
});
