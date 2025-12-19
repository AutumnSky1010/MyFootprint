// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],
  css: [
    '~/assets/css/main.css'
  ],
  googleFonts: {
    families: {
      // 日本語フォント: Noto Sans JP
      'Noto+Sans+JP': [400, 500, 700],
    },
    display: 'swap',
    preload: true,
    download: true,
  },
  app: {
    cdnURL: '/MyFootprint/',
  }
})
