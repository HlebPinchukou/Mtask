import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { html } from './html.js'; // Импортируйте html.js

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1', // Укажите здесь желаемый локальный IP-адрес
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.endsWith('.html')) {
            return 'html';
          }
        },
        // Задайте html.js как шаблон HTML-страницы
        entryFileNames: 'html.html',
      },
    },
  },
});

