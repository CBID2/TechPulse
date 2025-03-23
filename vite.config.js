import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    optimizeDeps: {
      include: ['react-router-dom'], 
    },
    plugins: [
      react(),
      compression({
        algorithm: 'gzip',
      }),
    ],
  };
});
