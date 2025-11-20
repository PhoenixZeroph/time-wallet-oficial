import { defineConfig } from 'vite'
import litcss from 'vite-plugin-lit-css'
import { resolve } from 'path'

export default defineConfig({
  plugins: [litcss()],
  // aquí van SOLO los assets que no pasan por el bundler (nuestras imágenes NFT)
  publicDir: 'public/nft',

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  }
})
