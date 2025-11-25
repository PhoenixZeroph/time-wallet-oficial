import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import litcss from "vite-plugin-lit-css";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),   // soporte React / TSX
    litcss()   // mantienes tus styled-lit components
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src") // ↪ permite importar con "@/..."
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
