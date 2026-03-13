// pages/api/dashboard.js
// API que retorna todos os dados do dashboard com KPIs calculados
// OTIMIZADO: Usa cache global para reduzir chamadas ao Notion
// ATUALIZADO: Inclui OKRs automáticos do Notion
// CORRIGIDO: Contadores baseados em Progress, não em Status

import {
  getTodayTasks,
  getHoursThisWeek,
  getHourTracker,
  getTaskPanel,
  getActiveProjects,
  getRoadmap,
  getOKRsWithKeyResults, // NOVO!
} from "../../lib/notion";

import {
  calculateAllKPIs,
  filterCurrentWeek,
  groupByCategory,
  calculateWeeklyProgress,
} from "../../lib/kpis";

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
    // ETAPA 2: CACHE VAZIO - BUSCAR DO NOTION
    // ========================================
    console.log("[API] 🔍 Cache vazio, buscando do Notion...");
    const startTime = Date.now();

    // Busca todos os dados do Notion em paralelo
    // AGORA INCLUI OKRs! 🎉
    const [
      todayTasks,
      hoursWeek,
      hourTracker,
      taskPanel,
      activeProjects,
      roadmap,
      okrsData, // NOVO!
    ] = await Promise.all([
      getTodayTasks(),
      getHoursThisWeek(),
      getHourTracker(),
      getTaskPanel(),
      getActiveProjects(),
      getRoadmap(),
      getOKRsWithKeyResults(CURRENT_QUARTER), // NOVO!
    ]);

    // Filtra dados da semana atual
    const currentWeekTracker = filterCurrentWeek(hourTracker);

    // Calcula todos os KPIs
    const kpis = calculateAllKPIs(hoursWeek, currentWeekTracker, taskPanel);

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

    // ========================================
    // NOVO: PROCESSAR OKRs
    // CORRIGIDO: Contadores baseados em Progress!
    // ========================================

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

    // CORRIGIDO: Baseado em Progress
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
      notStartedKRs, // NOVO: Não iniciados
      quarter: CURRENT_QUARTER,
    };

    // Monta o objeto de resposta
    const responseData = {
      // KPIs calculados
      kpis,

      // Dados brutos
      todayTasks,
      hoursWeek,
      hourTracker: currentWeekTracker,
      taskPanel,
      activeProjects,
      roadmap,

      // NOVO: OKRs
      okrs: okrsData,
      okrsSummary,

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
      `[API] ✅ Dados buscados do Notion em ${elapsedTime}ms e salvos no cache`,
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
      error: "Erro ao buscar dados do Notion",
      message: error.message,
    });
  }
}
