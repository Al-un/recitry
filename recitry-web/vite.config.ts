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
        additionalData: `@use "@/core/styles/_include.scss" as *;`
      }
    }
  },
  // https://v2.vitejs.dev/config/#environment-variables
  define: {
    // https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false
  }
})
