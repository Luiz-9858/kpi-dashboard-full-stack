// lib/comparison.js - Biblioteca de Comparação Mês a Mês

import { Client } from "@notionhq/client";
import {
  startOfMonth,
  endOfMonth,
  format,
  subMonths,
  parseISO,
} from "date-fns";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

/**
 * Busca dados do Hour Tracker filtrados por mês
 * @param {string} month - Mês no formato "YYYY-MM" (ex: "2026-04")
 * @returns {Promise<Array>} Array de registros do mês
 */
export async function getHourTrackerByMonth(month) {
  try {
    const startDate = format(
      startOfMonth(parseISO(`${month}-01`)),
      "yyyy-MM-dd",
    );
    const endDate = format(endOfMonth(parseISO(`${month}-01`)), "yyyy-MM-dd");

    console.log(
      `[Comparison] 📅 Buscando Hour Tracker de ${month} (${startDate} a ${endDate})...`,
    );

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DB_HOUR_TRACKER,
      filter: {
        and: [
          {
            property: "📅 Date",
            date: {
              on_or_after: startDate,
            },
          },
          {
            property: "📅 Date",
            date: {
              before: endDate,
            },
          },
        ],
      },
    });

    console.log(
      `[Comparison] ✅ Encontrados ${response.results.length} registros de ${month}`,
    );
    return response.results;
  } catch (error) {
    console.error(
      `[Comparison] ❌ Erro ao buscar Hour Tracker de ${month}:`,
      error.message,
    );
    return [];
  }
}

/**
 * Calcula KPIs de um mês específico baseado nos dados do Hour Tracker
 * @param {Array} records - Registros do Hour Tracker
 * @returns {Object} KPIs calculados
 */
export function calculateMonthlyKPIs(records) {
  const kpis = {
    horasPratica: 0,
    horasTeoria: 0,
    horasIngles: 0,
    horasTotal: 0,
    commits: 0,
    features: 0,
    bugs: 0,
    modulos: 0,
    exercicios: 0,
    conceitos: 0,
    licoesIngles: 0,
    worksheets: 0,
    diasEstudados: new Set(),
  };

  records.forEach((record) => {
    const hours = record.properties["⏱️ Hours"]?.number || 0;
    const category = record.properties["📂 Category"]?.select?.name || "";
    const activity =
      record.properties[
        "📋 Activity"
      ]?.rich_text?.[0]?.plain_text?.toLowerCase() || "";
    const description =
      record.properties[
        "📝 Description"
      ]?.rich_text?.[0]?.plain_text?.toLowerCase() || "";
    const date = record.properties["📅 Date"]?.date?.start;

    // Total de horas
    kpis.horasTotal += hours;

    // Horas por categoria
    if (category === "🟣 Projetos") kpis.horasPratica += hours;
    if (category === "🔵 Estudos") kpis.horasTeoria += hours;
    if (category === "🟠 Idiomas") kpis.horasIngles += hours;

    // Dias estudados (únicos)
    if (date) kpis.diasEstudados.add(date);

    // Commits (estimativa: 1 commit a cada 30min de prática)
    if (category === "🟣 Projetos") {
      kpis.commits += Math.round(hours * 2);
    }

    // Features e Bugs
    if (activity.includes("feature")) kpis.features++;
    if (activity.includes("bug") || activity.includes("fix")) kpis.bugs++;

    // Módulos
    if (description.includes("módulo") || activity.includes("módulo"))
      kpis.modulos++;

    // Exercícios
    if (activity.includes("exercício") || activity.includes("algoritmo"))
      kpis.exercicios++;

    // Conceitos
    if (description.includes("conceito") || activity.includes("conceito"))
      kpis.conceitos++;

    // Lições e Worksheets de Inglês
    if (activity.includes("method callan") || activity.includes("lição"))
      kpis.licoesIngles++;
    if (activity.includes("worksheet")) kpis.worksheets++;
  });

  // Converter Set para número
  kpis.diasEstudados = kpis.diasEstudados.size;

  return kpis;
}

/**
 * Compara KPIs de dois meses
 * @param {Object} currentMonth - KPIs do mês atual
 * @param {Object} previousMonth - KPIs do mês anterior
 * @returns {Object} Comparação com variações
 */
export function compareMonths(currentMonth, previousMonth) {
  const comparison = {};

  Object.keys(currentMonth).forEach((key) => {
    const current = currentMonth[key];
    const previous = previousMonth[key];
    const diff = current - previous;
    const percentChange =
      previous > 0
        ? ((diff / previous) * 100).toFixed(1)
        : current > 0
          ? "100.0"
          : "0.0";

    comparison[key] = {
      current,
      previous,
      diff,
      percentChange: parseFloat(percentChange),
      status: diff > 0 ? "up" : diff < 0 ? "down" : "same",
      emoji: diff > 0 ? "🟢" : diff < 0 ? "🔴" : "🟡",
    };
  });

  return comparison;
}

/**
 * Gera insights automáticos baseados na comparação
 * @param {Object} comparison - Comparação de KPIs
 * @returns {Array} Array de insights
 */
export function generateInsights(comparison) {
  const insights = [];

  // Insight de maior melhoria
  let maxImprovement = { key: null, value: -Infinity };
  let maxDecline = { key: null, value: Infinity };

  Object.entries(comparison).forEach(([key, data]) => {
    if (data.percentChange > maxImprovement.value) {
      maxImprovement = { key, value: data.percentChange };
    }
    if (data.percentChange < maxDecline.value) {
      maxDecline = { key, value: data.percentChange };
    }
  });

  // Labels amigáveis
  const labels = {
    horasPratica: "Horas de Prática",
    horasTeoria: "Horas de Teoria",
    horasIngles: "Horas de Inglês",
    horasTotal: "Horas Totais",
    commits: "Commits",
    features: "Features",
    bugs: "Bugs Resolvidos",
    modulos: "Módulos",
    exercicios: "Exercícios",
    conceitos: "Conceitos",
    licoesIngles: "Lições de Inglês",
    worksheets: "Worksheets",
    diasEstudados: "Dias Estudados",
  };

  // Maior melhoria
  if (maxImprovement.value > 5) {
    insights.push({
      type: "success",
      icon: "🎉",
      title: "Maior Evolução",
      message: `${labels[maxImprovement.key]} aumentou ${maxImprovement.value}%! Excelente progresso!`,
    });
  }

  // Maior queda
  if (maxDecline.value < -5) {
    insights.push({
      type: "warning",
      icon: "⚠️",
      title: "Ponto de Atenção",
      message: `${labels[maxDecline.key]} caiu ${Math.abs(maxDecline.value)}%. Considere aumentar o foco nessa área.`,
    });
  }

  // Consistência
  if (comparison.diasEstudados?.current >= 25) {
    insights.push({
      type: "success",
      icon: "🔥",
      title: "Consistência Excelente",
      message: `Você estudou ${comparison.diasEstudados.current} dias no mês! Sua disciplina está em alta!`,
    });
  }

  // Horas totais
  if (comparison.horasTotal?.current >= 80) {
    insights.push({
      type: "success",
      icon: "⏱️",
      title: "Meta de Horas Atingida",
      message: `${comparison.horasTotal.current}h de dedicação total! Meta semanal batida com folga!`,
    });
  }

  // Crescimento geral
  const positiveChanges = Object.values(comparison).filter(
    (d) => d.percentChange > 0,
  ).length;
  const totalMetrics = Object.keys(comparison).length;
  const positiveRatio = (positiveChanges / totalMetrics) * 100;

  if (positiveRatio >= 70) {
    insights.push({
      type: "success",
      icon: "📈",
      title: "Crescimento Geral",
      message: `${positiveChanges} de ${totalMetrics} métricas melhoraram! Você está no caminho certo!`,
    });
  }

  return insights;
}

/**
 * Gera dados para gráfico de comparação
 * @param {Object} comparison - Comparação de KPIs
 * @param {string} currentMonthName - Nome do mês atual
 * @param {string} previousMonthName - Nome do mês anterior
 * @returns {Array} Dados formatados para Recharts
 */
export function generateChartData(
  comparison,
  currentMonthName,
  previousMonthName,
) {
  const chartData = [];

  const mainKPIs = [
    "horasPratica",
    "horasTeoria",
    "horasIngles",
    "commits",
    "features",
    "modulos",
  ];

  const labels = {
    horasPratica: "Prática",
    horasTeoria: "Teoria",
    horasIngles: "Inglês",
    commits: "Commits",
    features: "Features",
    modulos: "Módulos",
  };

  mainKPIs.forEach((key) => {
    if (comparison[key]) {
      chartData.push({
        name: labels[key],
        [previousMonthName]: comparison[key].previous,
        [currentMonthName]: comparison[key].current,
        variacao: comparison[key].diff,
      });
    }
  });

  return chartData;
}

/**
 * Busca histórico de vários meses
 * @param {number} months - Número de meses para buscar
 * @returns {Promise<Array>} Array com dados de cada mês
 */
export async function getMonthlyHistory(months = 6) {
  const history = [];
  const today = new Date();

  for (let i = 0; i < months; i++) {
    const month = format(subMonths(today, i), "yyyy-MM");
    const monthName = format(subMonths(today, i), "MMM/yy");

    const records = await getHourTrackerByMonth(month);
    const kpis = calculateMonthlyKPIs(records);

    history.push({
      month,
      monthName,
      kpis,
    });
  }

  return history.reverse(); // Ordem cronológica
}
