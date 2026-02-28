// pages/api/dashboard.js
// API que retorna todos os dados do dashboard com KPIs calculados

import {
  getTodayTasks,
  getHoursThisWeek,
  getHourTracker,
  getTaskPanel,
  getActiveProjects,
  getRoadmap,
} from "../../lib/notion";

import {
  calculateAllKPIs,
  filterCurrentWeek,
  groupByCategory,
  calculateWeeklyProgress,
} from "../../lib/kpis";

export default async function handler(req, res) {
  // Só aceita GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Busca todos os dados do Notion em paralelo
    const [
      todayTasks,
      hoursWeek,
      hourTracker,
      taskPanel,
      activeProjects,
      roadmap,
    ] = await Promise.all([
      getTodayTasks(),
      getHoursThisWeek(),
      getHourTracker(),
      getTaskPanel(),
      getActiveProjects(),
      getRoadmap(),
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

    // Retorna tudo estruturado
    res.status(200).json({
      success: true,
      data: {
        // KPIs calculados
        kpis,

        // Dados brutos
        todayTasks,
        hoursWeek,
        hourTracker: currentWeekTracker,
        taskPanel,
        activeProjects,
        roadmap,

        // Dados processados
        categoryBreakdown,
        weeklyProgress,
        quickStats,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);

    res.status(500).json({
      success: false,
      error: "Erro ao buscar dados do Notion",
      message: error.message,
    });
  }
}
