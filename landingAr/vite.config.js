import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/ar/',
  build: {
    outDir: '../dist/ar',
    emptyOutDir: true
  },
  plugins: [react(), tailwindcss()],
})
