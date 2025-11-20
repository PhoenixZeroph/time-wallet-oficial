import { defineConfig } from 'vite'
import litcss from 'vite-plugin-lit-css'
export default defineConfig({ plugins:[litcss()] })
import { defineConfig } from 'vite'
import litcss from 'vite-plugin-lit-css'

export default defineConfig({
  /** <-- 🔑  añade esta línea */
  root: 'public',
  build: {
    outDir: '../dist',     // dist sigue quedando al nivel de frontend/
    emptyOutDir: true
  },
  plugins: [litcss()]
})
