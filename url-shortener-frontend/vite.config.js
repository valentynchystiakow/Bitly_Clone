import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// connects plugins
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()

  ],
})
