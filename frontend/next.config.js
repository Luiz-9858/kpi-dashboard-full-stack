/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Desabilita em dev
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.notion\.com\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "notion-api",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 horas
        },
      },
    },
    {
      urlPattern: /^https:\/\/api\.github\.com\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "github-api",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 horas
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    GITHUB_WEBHOOK_SECRET: process.env.GITHUB_WEBHOOK_SECRET,
    NOTION_DB_KEY_RESULTS: process.env.NOTION_DB_KEY_RESULTS,
    NOTION_DB_OKRS: process.env.NOTION_DB_OKRS,
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DB_TODAY_TASKS: process.env.NOTION_DB_TODAY_TASKS,
    NOTION_DB_HOURS_WEEK: process.env.NOTION_DB_HOURS_WEEK,
    NOTION_DB_HOUR_TRACKER: process.env.NOTION_DB_HOUR_TRACKER,
    NOTION_DB_TASK_PANEL: process.env.NOTION_DB_TASK_PANEL,
    NOTION_DB_ACTIVE_PROJECTS: process.env.NOTION_DB_ACTIVE_PROJECTS,
    NOTION_DB_ROADMAP: process.env.NOTION_DB_ROADMAP,
  },
};

module.exports = withPWA(nextConfig);
