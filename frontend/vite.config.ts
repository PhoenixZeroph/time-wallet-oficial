import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import litcss from "vite-plugin-lit-css";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    // ⬇️ evita que lit-css toque .tsx / .ts
    litcss({ include: /\.lit\.css$/ })
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") }
  },
  build: { outDir: "dist", emptyOutDir: true }
});
