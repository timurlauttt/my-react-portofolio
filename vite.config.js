import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ngrok } from 'vite-plugin-ngrok';

export default defineConfig({
  plugins: [
    react(),
    ngrok({
      authtoken: '2pxypgzNqSyJxcgN5jC3zQV9KJR_6nZrKp6pVFUMMBdth1fpv', // Replace with your ngrok authentication token
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase/auth')) return 'firebase-auth';
            if (id.includes('firebase/firestore')) return 'firebase-firestore';
            if (id.includes('firebase/storage')) return 'firebase-storage';
            if (id.includes('firebase/analytics')) return 'firebase-analytics';
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('react-router') || id.includes('@heroicons') || id.includes('react-icons')) return 'ui-vendor';
            return 'vendor';
          }
        }
      }
    }
  }
});
