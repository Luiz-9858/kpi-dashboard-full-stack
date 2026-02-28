/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DB_TODAY_TASKS: process.env.NOTION_DB_TODAY_TASKS,
    NOTION_DB_HOURS_WEEK: process.env.NOTION_DB_HOURS_WEEK,
    NOTION_DB_HOUR_TRACKER: process.env.NOTION_DB_HOUR_TRACKER,
    NOTION_DB_TASK_PANEL: process.env.NOTION_DB_TASK_PANEL,
    NOTION_DB_ACTIVE_PROJECTS: process.env.NOTION_DB_ACTIVE_PROJECTS,
    NOTION_DB_ROADMAP: process.env.NOTION_DB_ROADMAP,
  },
}

module.exports = nextConfig
