import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Mirror nginx in production: forward /api calls to the Spring Boot server
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
