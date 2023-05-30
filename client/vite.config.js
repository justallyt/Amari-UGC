import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
        proxy: {
          '/api/consumer': {
                 target: 'http://localhost:8080/api/consumer',
                 changeOrigin: true,
                 secure: false
          }
        }
  }
})
