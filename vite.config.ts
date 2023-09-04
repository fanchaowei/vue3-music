import { defineConfig } from 'vitest/config'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: path.resolve(__dirname, './vitest.setup.ts'),
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/scss/variable.scss";
          @import "@/styles/scss/mixin.scss";
        `,
      },
    },
  },
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
      },
    },
  },
})
