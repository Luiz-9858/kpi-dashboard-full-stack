// pages/api/comparison.js - API de Comparação Mensal

import { format, subMonths, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  getHourTrackerByMonth,
  calculateMonthlyKPIs,
  compareMonths,
  generateInsights,
  generateChartData,
  getMonthlyHistory,
} from "../../lib/comparison";

// Cache simples em memória (10 min)
let cache = {};
const CACHE_DURATION = 10 * 60 * 1000;

// Arredondar valores para 2 casas decimais
function roundKPIs(kpis) {
  const rounded = {};
  Object.keys(kpis).forEach((key) => {
    rounded[key] =
      typeof kpis[key] === "number"
        ? Math.round(kpis[key] * 100) / 100
        : kpis[key];
  });
  return rounded;
}

export default async function handler(req, res) {
  const { currentMonth, previousMonth, history } = req.query;

  try {
    // Se pedir histórico
    if (history) {
      const months = parseInt(history) || 6;
      const cacheKey = `history-${months}`;

      if (
        cache[cacheKey] &&
        Date.now() - cache[cacheKey].timestamp < CACHE_DURATION
      ) {
        console.log(`[Comparison API] ⚡ Cache hit: ${cacheKey}`);
        return res.status(200).json(cache[cacheKey].data);
      }

      const historyData = await getMonthlyHistory(months);

      cache[cacheKey] = {
        data: historyData,
        timestamp: Date.now(),
      };

      return res.status(200).json(historyData);
    }

    // Comparação padrão (mês atual vs anterior)
    const current = currentMonth || format(new Date(), "yyyy-MM");
    const previous =
      previousMonth || format(subMonths(new Date(), 1), "yyyy-MM");

    const cacheKey = `${current}-vs-${previous}`;

    if (
      cache[cacheKey] &&
      Date.now() - cache[cacheKey].timestamp < CACHE_DURATION
    ) {
      console.log(`[Comparison API] ⚡ Cache hit: ${cacheKey}`);
      return res.status(200).json(cache[cacheKey].data);
    }

    console.log(`[Comparison API] 📊 Comparando ${previous} vs ${current}...`);

    // Buscar dados
    const [currentRecords, previousRecords] = await Promise.all([
      getHourTrackerByMonth(current),
      getHourTrackerByMonth(previous),
    ]);

    // Calcular KPIs
    const currentKPIs = calculateMonthlyKPIs(currentRecords);
    const previousKPIs = calculateMonthlyKPIs(previousRecords);

    // Comparar
    const comparison = compareMonths(currentKPIs, previousKPIs);

    // Insights
    const insights = generateInsights(comparison);

    // Dados do gráfico
    const currentMonthName = format(parseISO(`${current}-01`), "MMM", {
      locale: ptBR,
    });
    const previousMonthName = format(parseISO(`${previous}-01`), "MMM", {
      locale: ptBR,
    });
    const chartData = generateChartData(
      comparison,
      currentMonthName,
      previousMonthName,
    );

    const result = {
      currentMonth: current,
      previousMonth: previous,
      currentKPIs: roundKPIs(currentKPIs), // Arredondar para 2 casas
      previousKPIs: roundKPIs(previousKPIs), // Arredondar para 2 casas
      comparison,
      insights,
      chartData,
      currentMonthName,
      previousMonthName,
    };

    cache[cacheKey] = {
      data: result,
      timestamp: Date.now(),
    };

    console.log(`[Comparison API] ✅ Comparação concluída`);
    return res.status(200).json(result);
  } catch (error) {
    console.error("[Comparison API] ❌ Erro:", error);
    return res.status(500).json({ error: error.message });
  }
}
