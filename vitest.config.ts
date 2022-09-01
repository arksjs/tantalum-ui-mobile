import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@arksjs/test-utils',
        replacement: resolve('./packages/test-utils')
      },
      { find: '@', replacement: resolve('./packages/ui/src') }
    ]
  },
  plugins: [vue()],
  test: {
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    transformMode: {
      web: [/\.[jt]sx$/]
    },
    include: ['packages/ui/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      'lib/*',
      'es/*',
      '**/e2e.spec.ts'
    ]
  }
})
