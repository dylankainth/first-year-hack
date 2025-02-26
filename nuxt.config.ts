import tailwindcss from "@tailwindcss/vite";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Poppins: true,
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/main.css'],
  pwa: {
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"], // Ensure it caches HTML
      runtimeCaching: [
        {
          urlPattern: "/",
          handler: "NetworkFirst", // Fallback to network if not precached
          options: {
            cacheName: "html-pages",
            expiration: { maxEntries: 10, maxAgeSeconds: 24 * 60 * 60 }, // 1-day cache
          },
        },
      ],
    },
    manifest: {
      name: 'KingsQuest',
      short_name: 'KingsQuest',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      description: 'KingsQuest, explore societies.',
      lang: 'en',
      icons: [
        {
          src: '/icon.png',
          sizes: '500x500',
          type: 'image/png',
        },

      ]
    }
  }

})