import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/microlink': {
        target: 'https://api.microlink.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/microlink/, '')
      }
    }
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
