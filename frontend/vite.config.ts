import { defineConfig } from 'vite'
import litcss from 'vite-plugin-lit-css'
import { resolve } from 'path'

export default defineConfig({
  root: 'public',          // <-- ahora Vite busca index.html aquí
  plugins: [litcss()],
  build: {
    outDir: resolve(__dirname, 'dist'),   // dist => frontend/dist
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html')
      }
    }
  }
})
