import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js', // This is optional, for setup files
    coverage: {
      provider: 'c8', // or 'istanbul'
      reporter: ['text', 'json', 'html'], // Generates HTML report
      reportsDirectory: 'coverage', // Directory to store the coverage reports
    },
  },
});
