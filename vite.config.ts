import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // allow all network interfaces
    port: 5173,
    strictPort: true,   // optional: fail if port is in use
    cors: true,          // optional: allow cross-origin
    allowedHosts: [
      'cursia.lat',
      'www.cursia.lat',
      'cursia.duckdns.org'
    ]
  }
})
