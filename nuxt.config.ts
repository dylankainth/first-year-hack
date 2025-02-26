// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'WalkieTalkie',
      short_name: 'WalkieTalkie',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      description: 'Your AI Tour Guide',
      lang: 'en',
      icons: [
        {
          src: '/logo.svg',
          sizes: '192x192',
          type: 'image/svg',
        },

      ]
    }
  }

})