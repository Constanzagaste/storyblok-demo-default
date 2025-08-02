export default defineNuxtConfig({
  ssr: true, // ✅ For static site generation
  target: 'static', // ✅ Required for Netlify static hosting

  modules: [
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.NUXT_ENV_STORYBLOK_TOKEN, // ✅ Use Netlify-compatible env key
        usePlugin: true,
      },
    ],
    '@nuxtjs/tailwindcss',
  ],

  css: ['@/assets/css/fonts.css'],

  components: [
    '~/components',
    '~/storyblok',
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      storyblokToken: process.env.NUXT_ENV_STORYBLOK_TOKEN, // ✅ Only keep what you need
    },
  },

  devtools: { enabled: process.env.NUXT_DEVTOOLS_ENABLED === 'true' },
});
