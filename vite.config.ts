import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves the built site from /programmering-kurs-gammarspace-webapp/
  // (the repository name). The dev server keeps running at the root: http://localhost:5173/
  base: command === 'build' ? '/programmering-kurs-gammarspace-webapp/' : '/',
  plugins: [react(), tailwindcss()],
}))
