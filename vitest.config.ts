import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: [
        {
          find: '@arksjs/test-utils',
          replacement: fileURLToPath(new URL('./packages/test-utils', import.meta.url))
        }
      ]
    },
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
        ...configDefaults.exclude,
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        'lib/*',
        'es/*',
        '**/e2e.spec.ts',
        'e2e/*'
      ],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
