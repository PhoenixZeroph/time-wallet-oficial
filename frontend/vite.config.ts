import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import litcss from "vite-plugin-lit-css";
import { resolve } from "node:path";

// ─────────────────────────────────────────────
// Vite + React + Tailwind  ✦  con lit-css
// • el plugin lit-css solo procesa *.css / *.lit.css
// • alias "@" → src/  (import '@/components/…')
// • build en carpeta dist/ (limpia antes)
// ─────────────────────────────────────────────
export default defineConfig({
  plugins: [
    react(),
    litcss({
      include: ["**/*.css", "**/*.lit.css"] // evita intentar parsear .tsx
    })
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },

  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
