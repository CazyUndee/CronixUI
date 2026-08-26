import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cronixui/react': path.resolve(__dirname, '../packages/react/src/index.ts'),
      '@cronixui/web': path.resolve(__dirname, '../packages/web/dist'),
    },
  },
})
