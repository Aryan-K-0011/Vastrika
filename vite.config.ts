import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Safely replace process.env.API_KEY with the string value or empty string
    // We also define process.env as an empty object to prevent "process is not defined" crashes in some libs
    'process.env': JSON.stringify({}), 
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});