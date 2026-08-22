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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase/auth')) return 'firebase-auth';
            if (id.includes('firebase/firestore')) return 'firebase-firestore';
            if (id.includes('firebase/storage')) return 'firebase-storage';
            if (id.includes('firebase/analytics')) return 'firebase-analytics';
            if (id.includes('firebase/database')) return 'firebase-database';
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('react-router')) return 'react-router';
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('react-icons')) return 'react-icons';
            if (id.includes('@heroicons') || id.includes('react-hook-form') || id.includes('react-markdown')) return 'ui-lib';
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
