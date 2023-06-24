import path from "path";

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    VITE_API_KEY: process.env.VITE_API_KEY,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    }
  },
  plugins: [react()],
})
