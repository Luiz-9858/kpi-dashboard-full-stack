// lib/kpis.js
// Funções para calcular os 15 KPIs principais

import {
  startOfWeek,
  endOfWeek,
  parseISO,
  differenceInDays,
  isWithinInterval,
} from "date-fns";
import { fixDecimal } from "./utils";

/**
 * Calcula KPIs de Produtividade (1-5)
 */
export function calculateProductivityKPIs(hoursWeek, hourTracker) {
  // KPI 1: Horas código prático/semana
  const praticaHours = fixDecimal(
    hoursWeek
      .filter((h) => h.category === "🔵 Estudos" || h.category === "Projetos")
      .reduce((sum, h) => sum + h.hoursReal, 0),
  );

  // KPI 2: Horas estudo teórico/semana
  const teoriaHours = fixDecimal(
    hoursWeek
      .filter((h) => h.category === "🔵 Estudos" || h.category === "Estudos")
      .reduce((sum, h) => sum + h.hoursReal, 0),
  );

  // KPI 3: Horas inglês/semana
  const inglesHours = fixDecimal(
    hoursWeek
      .filter((h) => h.category === "🟣 Idiomas" || h.category === "Idiomas")
      .reduce((sum, h) => sum + h.hoursReal, 0),
  );

  // Total de horas
  const totalHours = fixDecimal(praticaHours + teoriaHours + inglesHours);

  // KPI 4: Dias estudados/semana
  const uniqueDates = new Set(
    hourTracker.filter((h) => h.date).map((h) => h.date.split("T")[0]),
  );
  const daysStudied = uniqueDates.size;

  // KPI 5: Streak dias consecutivos
  const streak = calculateStreak(hourTracker);

  return {
    praticaHours: {
      value: praticaHours,
      target: { min: 12, max: 15 },
      status: getStatus(praticaHours, 12, 15),
    },
    teoriaHours: {
      value: teoriaHours,
      target: { min: 5, max: 8 },
      status: getStatus(teoriaHours, 5, 8),
    },
    inglesHours: {
      value: inglesHours,
      target: { min: 3, max: 5 },
      status: getStatus(inglesHours, 3, 5),
    },
    totalHours: {
      value: totalHours,
      target: { min: 20, max: 23 },
      status: getStatus(totalHours, 20, 23),
    },
    daysStudied: {
      value: daysStudied,
      target: { min: 6, max: 7 },
      status: getStatus(daysStudied, 6, 7),
    },
    streak: {
      value: streak,
      target: { min: 7, max: 7 },
      status: streak >= 7 ? "success" : "warning",
    },
  };
}

/**
 * Calcula KPIs de Prática (6-10)
 */
export function calculatePracticeKPIs(taskPanel, hourTracker) {
  // KPI 6: Commits GitHub/semana (será integrado depois)
  const commits = 0; // TODO: GitHub API integration

  // KPI 7: Features concluídas/semana
  const features = taskPanel.filter(
    (t) => t.status === "Complete" && t.category === "Projeto",
  ).length;

  // KPI 8: Bugs resolvidos/semana
  const bugs = taskPanel.filter(
    (t) => t.status === "Complete" && t.task.toLowerCase().includes("bug"),
  ).length;

  // KPI 9: PRs criados/mês (será integrado depois)
  const prs = 0; // TODO: GitHub API integration

  // KPI 10: Projetos finalizados/trimestre
  const projects = taskPanel.filter(
    (t) => t.status === "Complete" && t.progress === "100%",
  ).length;

  return {
    commits: {
      value: commits,
      target: { min: 20, max: 30 },
      status: "pending", // Aguardando integração GitHub
    },
    features: {
      value: features,
      target: { min: 3, max: 5 },
      status: getStatus(features, 3, 5),
    },
    bugs: {
      value: bugs,
      target: { min: 5, max: 8 },
      status: getStatus(bugs, 5, 8),
    },
    prs: {
      value: prs,
      target: { min: 2, max: 4 },
      status: "pending", // Aguardando integração GitHub
    },
    projects: {
      value: projects,
      target: { min: 0, max: 2 },
      status: getStatus(projects, 0, 2),
    },
  };
}

/**
 * Calcula KPIs de Aprendizado (11-13)
 */
export function calculateLearningKPIs(hoursWeek, hourTracker) {
  // KPI 11: Módulos curso concluídos/semana
  const modules = hourTracker.filter(
    (h) => h.description && h.description.toLowerCase().includes("módulo"),
  ).length;

  // KPI 12: Exercícios algoritmos/semana
  const exercises = hourTracker.filter(
    (h) => h.activity && h.activity.toLowerCase().includes("exercício"),
  ).length;

  // KPI 13: Conceitos novos dominados/semana
  const concepts = hourTracker.filter(
    (h) => h.description && h.description.toLowerCase().includes("conceito"),
  ).length;

  return {
    modules: {
      value: modules,
      target: { min: 3, max: 5 },
      status: getStatus(modules, 3, 5),
    },
    exercises: {
      value: exercises,
      target: { min: 10, max: 15 },
      status: getStatus(exercises, 10, 15),
    },
    concepts: {
      value: concepts,
      target: { min: 2, max: 3 },
      status: getStatus(concepts, 2, 3),
    },
  };
}

/**
 * Calcula KPIs de Idioma (14-15)
 */
export function calculateLanguageKPIs(hourTracker) {
  // KPI 14: Lições Method Callan/semana
  const lessons = hourTracker.filter(
    (h) =>
      h.project === "Method Callan Presencial" ||
      h.activity.toLowerCase().includes("method callan"),
  ).length;

  // KPI 15: Worksheets completas/semana
  const worksheets = hourTracker.filter(
    (h) => h.activity && h.activity.toLowerCase().includes("worksheet"),
  ).length;

  return {
    lessons: {
      value: lessons,
      target: { min: 3, max: 3 },
      status: getStatus(lessons, 3, 3),
    },
    worksheets: {
      value: worksheets,
      target: { min: 2, max: 2 },
      status: getStatus(worksheets, 2, 2),
    },
  };
}

/**
 * Calcula todos os KPIs de uma vez
 */
export function calculateAllKPIs(hoursWeek, hourTracker, taskPanel) {
  const productivity = calculateProductivityKPIs(hoursWeek, hourTracker);
  const practice = calculatePracticeKPIs(taskPanel, hourTracker);
  const learning = calculateLearningKPIs(hoursWeek, hourTracker);
  const language = calculateLanguageKPIs(hourTracker);

  return {
    productivity,
    practice,
    learning,
    language,
    summary: {
      total: 15,
      success: countByStatus(
        { ...productivity, ...practice, ...learning, ...language },
        "success",
      ),
      warning: countByStatus(
        { ...productivity, ...practice, ...learning, ...language },
        "warning",
      ),
      danger: countByStatus(
        { ...productivity, ...practice, ...learning, ...language },
        "danger",
      ),
    },
  };
}

/**
 * Calcula streak de dias consecutivos estudando
 */
function calculateStreak(hourTracker) {
  if (!hourTracker || hourTracker.length === 0) return 0;

  // Ordena por data (mais recente primeiro)
  const sortedDates = hourTracker
    .filter((h) => h.date)
    .map((h) => parseISO(h.date.split("T")[0]))
    .sort((a, b) => b - a);

  if (sortedDates.length === 0) return 0;

  let streak = 1;
  let currentDate = sortedDates[0];

  for (let i = 1; i < sortedDates.length; i++) {
    const diff = differenceInDays(currentDate, sortedDates[i]);

    if (diff === 1) {
      streak++;
      currentDate = sortedDates[i];
    } else if (diff > 1) {
      break;
    }
  }

  return streak;
}

/**
 * Determina status do KPI baseado no valor e metas
 */
function getStatus(value, min, max) {
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

/**
 * Filtra dados da semana atual
 */
export function filterCurrentWeek(data) {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 0 }); // Domingo
  const weekEnd = endOfWeek(now, { weekStartsOn: 0 });

  return data.filter((item) => {
    if (!item.date) return false;
    const itemDate = parseISO(item.date.split("T")[0]);
    return isWithinInterval(itemDate, { start: weekStart, end: weekEnd });
  });
}

/**
 * Agrupa horas por categoria
 */
export function groupByCategory(hoursWeek) {
  const grouped = hoursWeek.reduce((acc, item) => {
    const category = item.category || "Outros";
    if (!acc[category]) {
      acc[category] = { planned: 0, real: 0 };
    }
    acc[category].planned += item.hoursPlanned;
    acc[category].real += item.hoursReal;
    return acc;
  }, {});

  return Object.entries(grouped).map(([name, data]) => ({
    name,
    planned: data.planned,
    real: data.real,
  }));
}

/**
 * Calcula progresso semanal
 */
export function calculateWeeklyProgress(hoursWeek) {
  const totalPlanned = hoursWeek.reduce((sum, h) => sum + h.hoursPlanned, 0);
  const totalReal = hoursWeek.reduce((sum, h) => sum + h.hoursReal, 0);
  const percentage = totalPlanned > 0 ? (totalReal / totalPlanned) * 100 : 0;

  return {
    planned: totalPlanned,
    real: totalReal,
    percentage: Math.round(percentage),
    status:
      percentage >= 90 ? "success" : percentage >= 70 ? "warning" : "danger",
  };
}
