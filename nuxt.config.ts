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