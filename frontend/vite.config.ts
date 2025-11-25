import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import litcss from "vite-plugin-lit-css";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    litcss({
      include: ["**/*.css", "**/*.lit.css"],
      exclude: ["**/*.tsx", "**/*.ts"]   // 👈 evita que inspeccione TypeScript
    })
  ],

  resolve: {
    alias: { "@": resolve(__dirname, "src") }
  },

  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
