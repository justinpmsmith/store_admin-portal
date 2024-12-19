// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/icon',
    '@pinia/nuxt'

    ],
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '@/assets/css/fontawesome.min.css',
    '@/assets/css/templatemo-style.css'
  ],
  plugins: [
    { src: '~/plugins/bootstrap.ts', mode: 'client' },
    // { src: '~/plugins/load-scripts.ts', mode: 'client' }
  ],
});