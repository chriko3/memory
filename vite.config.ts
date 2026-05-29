import { defineConfig } from 'vite';

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main:     'index.html',
        game:     'game.html',
        settings: 'settings.html',
      }
    }
  }
});