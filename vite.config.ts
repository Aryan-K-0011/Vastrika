import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define process.env to prevent "process is not defined" error in browser
    // We explicitly map only the API key to avoid object reference issues
    'process.env': {
      API_KEY: process.env.API_KEY || ''
    }
  }
});