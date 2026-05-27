import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const adminBffTarget = process.env.VITE_ADMIN_BFF_PROXY_TARGET ?? 'http://localhost:12000'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 11000,
    proxy: {
      '/api': {
        target: adminBffTarget,
        changeOrigin: true,
      },
    },
  },
})
