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
});
