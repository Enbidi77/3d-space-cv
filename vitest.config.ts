import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@space/portfolio-content': path.resolve(__dirname, 'packages/portfolio-content/src'),
      '@space/state': path.resolve(__dirname, 'packages/state/src'),
      '@space/ui': path.resolve(__dirname, 'packages/ui/src'),
      '@space/galaxy-engine': path.resolve(__dirname, 'packages/galaxy-engine/src'),
    },
  },
});

