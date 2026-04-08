import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@spec': fileURLToPath(new URL('../packages/spec', import.meta.url))
      }
    }
  }
});
