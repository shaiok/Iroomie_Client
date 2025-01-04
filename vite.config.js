import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      'semantic-ui-css': path.resolve(__dirname, 'node_modules/fomantic-ui-css'),
      'mobx-react': path.resolve(__dirname, 'node_modules/mobx-react-lite'),
      'lodash': path.resolve(__dirname, 'node_modules/lodash-es'),
      'markdown-it': path.resolve(__dirname, 'node_modules/@esm-bundle/markdown-it')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.ts')
    }
  }
});