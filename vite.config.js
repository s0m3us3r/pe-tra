import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pe-tra/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
