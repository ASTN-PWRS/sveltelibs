import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
//import path from "path";
//import postcss from "./postcss.config.js";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    emptyOutDir: true,
    lib: {
      entry: "./src/main.js",
      name: "svelte",
      fileName: (format) => `sveltelibs.${format}.js`,
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  resolve: {
    alias: {
      $css: `${__dirname}/css`,
    },
  },
});
