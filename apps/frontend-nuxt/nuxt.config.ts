import tailwindcss from '@nuxtjs/tailwindcss'
import pinia from '@pinia/nuxt'

export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  app: {
    head: {
      title: 'NexEo — Personal LAN Streaming & Premium Novel Reader',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal LAN video streaming and novel reader with AI translation' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  experimental: {
    appManifest: false
  },

  modules: [
    pinia,
    tailwindcss
  ],

  css: [
    '@/assets/css/main.css'
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  },

  devtools: { enabled: false },

  compatibilityDate: '2024-01-01'
})
