import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export const API_KEY = "88d2c735e36149b50c9d46f09826ec06";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'docs',
    sourcemap: false
  },
  server: {
    port: 8080
  }
})
