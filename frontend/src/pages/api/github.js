// pages/api/github.js
// API endpoint para buscar dados do GitHub
// Retorna commits, PRs, repos e estatísticas

import {
  getGitHubStats,
  getCommitStreak,
  getCommitsChartData,
  getRepositories,
} from "../../lib/github";

import cache from "../../lib/cache";

const CACHE_KEY = "github-data";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Verifica cache
    const cachedData = cache.get(CACHE_KEY);

    if (cachedData) {
      console.log("[GitHub API] ⚡ Retornando do cache");
      return res.status(200).json({
        success: true,
        data: cachedData,
        fromCache: true,
        timestamp: new Date().toISOString(),
      });
    }

    // Busca dados do GitHub
    console.log("[GitHub API] 🔍 Buscando dados do GitHub...");
    const startTime = Date.now();

    const [stats, streak, chartData, repos] = await Promise.all([
      getGitHubStats(7), // Últimos 7 dias
      getCommitStreak(),
      getCommitsChartData(7),
      getRepositories(),
    ]);

    const responseData = {
      stats,
      streak,
      chartData,
      repositories: repos.slice(0, 10), // Top 10 repos mais recentes
    };

    // Salva no cache
    cache.set(CACHE_KEY, responseData, CACHE_TTL);

    const elapsedTime = Date.now() - startTime;
    console.log(
      `[GitHub API] ✅ Dados buscados em ${elapsedTime}ms e salvos no cache`,
    );

    res.status(200).json({
      success: true,
      data: responseData,
      fromCache: false,
      fetchTime: elapsedTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[GitHub API] ❌ Erro:", error);

    res.status(500).json({
      success: false,
      error: "Erro ao buscar dados do GitHub",
      message: error.message,
    });
  }
}
