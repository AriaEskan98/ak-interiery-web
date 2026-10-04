import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build:preview` makes one self-contained HTML file (images inlined) for sharing a preview.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'preview-single' ? [viteSingleFile()] : [])],
  build: mode === 'preview-single'
    ? { outDir: 'dist-preview', assetsInlineLimit: 100_000_000 }
    : { outDir: 'dist' },
  server: { proxy: { '/api': 'http://localhost:3001' } },
}))
