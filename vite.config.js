import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Հրաչ Վաղարշակյան',
        short_name: 'Հ․Վ․',
        description: 'Իմ առաջին PWA-ը Vite-ով',
        theme_color: '#ffffff',
        icons: [
          // 1. Այս պատկերակը կհամապատասխանի 'any' նպատակի պահանջին
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          // 2. Սա կհամապատասխանի 'maskable' նպատակի պահանջին
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          // 3. Մեկ այլ մեծ չափի պատկերակ 'any' նպատակով
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          // 4. Մեծ չափի 'maskable' պատկերակ
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
});