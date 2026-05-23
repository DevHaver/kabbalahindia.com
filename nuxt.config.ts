// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  future: { compatibilityVersion: 4 },

  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/eslint",
    "@vueuse/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  ui: {
    colorMode: false,
  },

  fonts: {
    families: [
      { name: "DM Serif Display", provider: "google", weights: [400] },
      {
        name: "Tiro Devanagari Hindi",
        provider: "google",
        weights: [400],
        styles: ["normal", "italic"],
      },
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
      {
        name: "Mukta",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Kabbalah Academy India · असली कबाला, अब भारत में।",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "A free introductory course in authentic Kabbalah, taught in English and Hindi by teachers in India. Next cohort begins 5 June 2026.",
        },
        { name: "theme-color", content: "#F5EBD7" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Kabbalah Academy India" },
        {
          property: "og:description",
          content:
            "Real Kabbalah. In India. Free, bilingual, taught live. असली कबाला, अब भारत में।",
        },
        { property: "og:url", content: "https://kabbalahindia.com" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Crect width=%2232%22 height=%2232%22 rx=%226%22 fill=%22%231A1A4D%22/%3E%3Ctext x=%2216%22 y=%2222%22 font-family=%22DM Serif Display,Georgia,serif%22 font-size=%2220%22 text-anchor=%22middle%22 fill=%22%23E27A2E%22%3EK%3C/text%3E%3C/svg%3E",
        },
      ],
    },
  },

  // Deployed to Cloudflare Pages. The homepage is prerendered for instant
  // TTFB and served from the global CDN, /api/* runs as a Worker.
  ssr: true,

  nitro: {
    preset: "cloudflare-pages",
    prerender: {
      crawlLinks: false,
      routes: ["/"],
      ignore: ["/api/**"],
    },
    routeRules: {
      "/**": {
        headers: {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Strict-Transport-Security":
            "max-age=63072000; includeSubDomains; preload",
          "Permissions-Policy":
            "geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()",
          "X-DNS-Prefetch-Control": "off",
        },
      },
      "/api/**": {
        cors: false,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    },
  },

  runtimeConfig: {
    // Generic webhook — receives every accepted signup as JSON.
    // Leave empty to skip (useful in dev / before the receiver is wired up).
    signupWebhookUrl: "",
    // Optional bearer token for the generic webhook receiver to verify the call.
    signupWebhookToken: "",
    // Telegram bot for instant in-pocket notifications. Both must be set.
    // Get the token from @BotFather, then message the bot once and read
    // chat_id from https://api.telegram.org/bot<TOKEN>/getUpdates
    telegramBotToken: "",
    telegramChatId: "",
    public: {
      whatsappUrl: "https://chat.whatsapp.com/placeholder",
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
});
