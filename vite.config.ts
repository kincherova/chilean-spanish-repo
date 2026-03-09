import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/survival-chilean-spanish-2/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
