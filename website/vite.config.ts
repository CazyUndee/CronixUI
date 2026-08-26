import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const websiteNodeModules = path.resolve(__dirname, 'node_modules')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@cronixui/react': path.resolve(__dirname, '../packages/react/src/index.ts'),
      '@cronixui/web': path.resolve(__dirname, '../packages/web/dist'),
      // Pin React to the website's own install so imports from the
      // aliased packages/react source resolve correctly on CI.
      react: path.resolve(websiteNodeModules, 'react'),
      'react-dom': path.resolve(websiteNodeModules, 'react-dom'),
      'react/jsx-runtime': path.resolve(websiteNodeModules, 'react/jsx-runtime.js'),
      'react/jsx-dev-runtime': path.resolve(websiteNodeModules, 'react/jsx-dev-runtime.js'),
    },
  },
})
