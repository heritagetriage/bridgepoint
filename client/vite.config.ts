import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // optional
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three")) return "three";
            if (id.includes("three-stdlib")) return "threeStdlib";
            if (id.includes("react")) return "react";
            return "vendor";
          }
        },
      },
      // This tells Vite to NOT include Lottie in the build
      treeshake: {
        moduleSideEffects: (id) => {
          // Mark only the modules with side effects — like lottie — as having them
          if (id.includes("three-stdlib/libs/lottie.js")) return true;
          return false;
        },
      },
    },
  },
}));
