import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ssr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // https://vitejs.dev/config/shared-options.html#css-preprocessoroptions
  // https://stackoverflow.com/a/74789562/4906586
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_include.scss" as *;`
      }
    }
  }
})
