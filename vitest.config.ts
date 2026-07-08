import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    alias: {
      '@': resolve(__dirname, './src'),
    },
    environment: 'node',
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
