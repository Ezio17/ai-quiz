// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  runtimeConfig: {
    groqApiKey: process.env.NUXT_GROQ_API_KEY,
    geminiApiKey: process.env.NUXT_GEMINI_API_KEY,
  },

  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './'),
        '@app': resolve(__dirname, './app'),
        '@shared': resolve(__dirname, './shared'),
        '@common': resolve(__dirname, './app/common'),
        '@pages': resolve(__dirname, './app/pages'),
      },
    },
  },

  nitro: {
    alias: {
      '@shared': './shared',
      '@server': './server',
    },
  },
});
