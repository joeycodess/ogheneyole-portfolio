import { env } from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_INQUIRY_FORM_ENABLED': JSON.stringify(
      env.VERCEL_ENV === 'preview' || command === 'serve',
    ),
  },
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        vexel: fileURLToPath(new URL('./vexel/index.html', import.meta.url)),
        veetch: fileURLToPath(new URL('./vexel/veetch/index.html', import.meta.url)),
        jeweller: fileURLToPath(new URL('./work/mark-da-jeweller/index.html', import.meta.url)),
        daymark: fileURLToPath(new URL('./work/daymark/index.html', import.meta.url)),
        goodDiaries: fileURLToPath(new URL('./work/the-good-diaries/index.html', import.meta.url)),
      },
    },
  },
}))
