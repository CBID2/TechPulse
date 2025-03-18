import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compress';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
    },
    plugins: [react(),compression({ algorithm: 'gzip' })],
  };
});