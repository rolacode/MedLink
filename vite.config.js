import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],

  server: {
    host: '0.0.0.0',   // 👈 This line is the key fix
    port: 5173         // Optional: set a specific port if needed
  },
});
