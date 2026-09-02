import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ngrok } from 'vite-plugin-ngrok';

export default defineConfig({
  plugins: [
    react(),
    ngrok({
      authtoken: '2pxypgzNqSyJxcgN5jC3zQV9KJR_6nZrKp6pVFUMMBdth1fpv',
    }),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    cssMinify: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase/auth')) return 'firebase-auth';
            if (id.includes('firebase/firestore')) return 'firebase-firestore';
            if (id.includes('firebase/storage')) return 'firebase-storage';
            if (id.includes('firebase/analytics')) return 'firebase-analytics';
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('react-router')) return 'react-router';
            if (id.includes('react-icons')) return 'react-icons';
            // Admin-only heavy deps: keep out of public initial bundle
            if (id.includes('@heroicons') || id.includes('react-hook-form') || id.includes('react-markdown') || id.includes('@headlessui') || id.includes('rehype')) return 'admin-vendor';
            if (id.includes('react')) return 'react-vendor';
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
