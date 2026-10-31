import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/OSFIC-2026/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: false
  }
});
