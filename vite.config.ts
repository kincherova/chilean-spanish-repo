import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'fs';

function bumpServiceWorkerVersion() {
  return {
    name: 'bump-sw-version',
    buildStart() {
      const swPath = 'public/sw.js';
      const content = readFileSync(swPath, 'utf-8');
      const updated = content.replace(
        /const CACHE_NAME = 'chilean-spanish-v\d+';/,
        `const CACHE_NAME = 'chilean-spanish-v${Date.now()}';`
      );
      writeFileSync(swPath, updated);
    },
  };
}

export default defineConfig({
  plugins: [react(), bumpServiceWorkerVersion()],
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
