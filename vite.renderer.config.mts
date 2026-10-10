import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: resolve(projectRoot, 'src/renderer'),
  build: {
    outDir: resolve(projectRoot, '.vite/renderer/main_window')
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@renderer': resolve(projectRoot, 'src/renderer/src')
    }
  }
})
