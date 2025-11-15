import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
      // : Exclure les tests E2E
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/e2e/**',              // Exclut le dossier e2e/
      '**/*.spec.ts',           // Exclut les fichiers .spec.ts (Playwright)
      '**/*.e2e.ts',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
    ],
    
    // Inclure UNIQUEMENT les tests unitaires
    include: [
      '**/*.test.{ts,tsx}',     // Fichiers .test.ts ou .test.tsx
      '**/__tests__/**/*.{ts,tsx}'
    ],
    
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
