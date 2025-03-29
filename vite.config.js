import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/pages",
    },
  },
  base: "/", 
});
