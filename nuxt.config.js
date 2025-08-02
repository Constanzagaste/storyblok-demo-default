export default defineNuxtConfig({
  ssr: true, // ✅ For static site generation
  target: 'static', // ✅ Required for Netlify static hosting

  modules: [
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
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
      customParent: process.env.STORYBLOK_CUSTOM_PARENT,
      storyblok: {
        accessToken: process.env.STORYBLOK_TOKEN,
      },
      templateToken: process.env.STORYBLOK_TOKEN,
    },
  },

  devtools: { enabled: process.env.NUXT_DEVTOOLS_ENABLED === 'true' },
});
