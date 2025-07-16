import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ⬅️ Import 'path' for resolving directories

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // ⬅️ This enables @/ to refer to ./src/
    }
  }
})
