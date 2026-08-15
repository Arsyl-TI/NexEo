import tailwindcss from '@nuxtjs/tailwindcss'
import pinia from '@pinia/nuxt'

export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  app: {
    head: {
      title: 'NexEo — Personal LAN Media Center',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'Personal LAN video streaming, novel reader, and manga reader' },
        { name: 'theme-color', content: '#7c3aed' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'NexEo' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
        { rel: 'manifest', href: '/manifest.json' }
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
