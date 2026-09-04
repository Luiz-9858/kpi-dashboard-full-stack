// pages/api/dashboard.js
// API que retorna todos os dados do dashboard com KPIs calculados
// OTIMIZADO: Usa cache global para reduzir chamadas ao Notion
// ATUALIZADO: Inclui OKRs automáticos do Notion
// CORRIGIDO: Contadores baseados em Progress, não em Status
// NOVO: Integração automática com GitHub API para KPIs

import {
  getTodayTasks,
  getHoursThisWeek,
  getHourTracker,
  getTaskPanel,
  getActiveProjects,
  getRoadmap,
  getOKRsWithKeyResults,
} from "../../lib/notion";

import {
  calculateAllKPIs,
  filterCurrentWeek,
  groupByCategory,
  calculateWeeklyProgress,
} from "../../lib/kpis";

import { countCommits, getPullRequests } from "../../lib/github";

import cache from "../../lib/cache";

// Chave do cache
const CACHE_KEY = "dashboard-data";

// TTL (Time To Live) - 5 minutos em milissegundos
const CACHE_TTL = 5 * 60 * 1000;

// Quarter atual (mude aqui quando mudar de quarter!)
const CURRENT_QUARTER = "Q1";

export default async function handler(req, res) {
  // Só aceita GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // ========================================
    // ETAPA 1: VERIFICAR CACHE
    // ========================================
    const cachedData = cache.get(CACHE_KEY);

    if (cachedData) {
      console.log("[API] ⚡ Retornando do cache (super rápido!)");

      return res.status(200).json({
        success: true,
        data: cachedData,
        fromCache: true,
        timestamp: new Date().toISOString(),
      });
    }

    // ========================================
    // ETAPA 2: CACHE VAZIO - BUSCAR DADOS
    // ========================================
    console.log("[API] 🔍 Cache vazio, buscando dados do Notion e GitHub...");
    const startTime = Date.now();

    // Busca todos os dados em paralelo
    // NOVO: Inclui dados do GitHub!
    const [
      todayTasks,
      hoursWeek,
      hourTracker,
      taskPanel,
      activeProjects,
      roadmap,
      okrsData,
      githubCommits,
      githubPRs,
    ] = await Promise.all([
      getTodayTasks(),
      getHoursThisWeek(),
      getHourTracker(),
      getTaskPanel(),
      getActiveProjects(),
      getRoadmap(),
      getOKRsWithKeyResults(CURRENT_QUARTER),
      countCommits(7), // Commits dos últimos 7 dias
      getPullRequests(30), // PRs dos últimos 30 dias
    ]);

    // Filtra dados da semana atual
    const currentWeekTracker = filterCurrentWeek(hourTracker);

    // Calcula todos os KPIs
    const kpis = calculateAllKPIs(hoursWeek, currentWeekTracker, taskPanel);

    // ========================================
    // NOVO: ATUALIZA KPIs COM DADOS DO GITHUB
    // ========================================

    // KPI: Commits GitHub (sobrescreve valor do Notion)
    kpis.practice.commits = {
      value: githubCommits.total,
      target: { min: 20, max: 30 },
      status: getGitHubKPIStatus(githubCommits.total, 20, 30),
    };

    // KPI: PRs Criados (sobrescreve valor do Notion)
    kpis.practice.prs = {
      value: githubPRs.total,
      target: { min: 2, max: 4 },
      status: getGitHubKPIStatus(githubPRs.total, 2, 4),
    };

    // Recalcula summary com os novos valores
    kpis.summary = {
      total: 16,
      success: countByStatus(
        {
          ...kpis.productivity,
          ...kpis.practice,
          ...kpis.learning,
          ...kpis.language,
        },
        "success",
      ),
      warning: countByStatus(
        {
          ...kpis.productivity,
          ...kpis.practice,
          ...kpis.learning,
          ...kpis.language,
        },
        "warning",
      ),
      danger: countByStatus(
        {
          ...kpis.productivity,
          ...kpis.practice,
          ...kpis.learning,
          ...kpis.language,
        },
        "danger",
      ),
    };

    // ========================================
    // CONTINUA COM O RESTO DOS DADOS
    // ========================================

    // Agrupa horas por categoria para gráficos
    const categoryBreakdown = groupByCategory(hoursWeek);

    // Calcula progresso semanal
    const weeklyProgress = calculateWeeklyProgress(hoursWeek);

    // Arredonda totalHoursWeek para evitar decimais longos
    const totalHoursWeek = parseFloat(
      hoursWeek.reduce((sum, h) => sum + h.hoursReal, 0).toFixed(2),
    );

    // Estatísticas rápidas para cards
    const quickStats = {
      totalHoursWeek,
      tasksCompleted: todayTasks.filter((t) => t.status === "Concluído").length,
      tasksTotal: todayTasks.length,
      activeProjectsCount: activeProjects.length,
      streak: kpis.productivity.streak.value,
    };

    // Calcula estatísticas gerais dos OKRs
    const totalOKRs = okrsData.length;
    const totalKRs = okrsData.reduce((sum, okr) => sum + okr.totalKRs, 0);
    const avgProgress =
      okrsData.length > 0
        ? Math.round(
            okrsData.reduce((sum, okr) => sum + okr.progress, 0) /
              okrsData.length,
          )
        : 0;

    // Conta KRs por PROGRESS (não por status!)
    const allKRs = okrsData.flatMap((okr) => okr.keyResults);

    const completedKRs = allKRs.filter((kr) => kr.progress >= 100).length;
    const inProgressKRs = allKRs.filter(
      (kr) => kr.progress > 0 && kr.progress < 100,
    ).length;
    const notStartedKRs = allKRs.filter((kr) => kr.progress === 0).length;

    const okrsSummary = {
      totalOKRs,
      totalKRs,
      avgProgress,
      completedKRs,
      inProgressKRs,
      notStartedKRs,
      quarter: CURRENT_QUARTER,
    };

    // Monta o objeto de resposta
    const responseData = {
      // KPIs calculados (AGORA COM GITHUB)
      kpis,

      // Dados brutos
      todayTasks,
      hoursWeek,
      hourTracker: currentWeekTracker,
      taskPanel,
      activeProjects,
      roadmap,

      // OKRs
      okrs: okrsData,
      okrsSummary,

      // NOVO: Dados do GitHub
      github: {
        commits: githubCommits,
        prs: githubPRs,
      },

      // Dados processados
      categoryBreakdown,
      weeklyProgress,
      quickStats,
    };

    // ========================================
    // ETAPA 3: SALVAR NO CACHE
    // ========================================
    cache.set(CACHE_KEY, responseData, CACHE_TTL);

    const elapsedTime = Date.now() - startTime;
    console.log(
      `[API] ✅ Dados buscados em ${elapsedTime}ms e salvos no cache`,
    );

    // Retorna os dados
    res.status(200).json({
      success: true,
      data: responseData,
      fromCache: false,
      fetchTime: elapsedTime,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[API] ❌ Erro ao buscar dados do dashboard:", error);

    res.status(500).json({
      success: false,
      error: "Erro ao buscar dados",
      message: error.message,
    });
  }
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Determina status do KPI GitHub baseado no valor e metas
 */
function getGitHubKPIStatus(value, min, max) {
  if (value >= min && value <= max) return "success"; // 🟢
  if (value >= min * 0.8) return "warning"; // 🟡
  return "danger"; // 🔴
}

/**
 * Conta quantos KPIs estão em determinado status
 */
function countByStatus(kpis, status) {
  return Object.values(kpis).filter((kpi) => kpi.status === status).length;
}
