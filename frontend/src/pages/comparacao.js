// pages/comparacao.js - Página de Comparação Mês a Mês

import { useState, useEffect } from "react";
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "../components/Header";
import ComparisonCard from "../components/ComparisonCard";
import TrendChart from "../components/TrendChart";
import Loading from "../components/Loading";
import { Calendar, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";

export default function ComparacaoPage() {
  // Estados
  const [currentMonth, setCurrentMonth] = useState(
    format(new Date(), "yyyy-MM"),
  );
  const [previousMonth, setPreviousMonth] = useState(
    format(subMonths(new Date(), 1), "yyyy-MM"),
  );
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lista de meses para os selects (últimos 6 meses)
  const availableMonths = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return {
      value: format(date, "yyyy-MM"),
      label: format(date, "MMMM yyyy", { locale: ptBR }),
    };
  });

  // Buscar dados da API
  const fetchComparison = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/comparison?currentMonth=${currentMonth}&previousMonth=${previousMonth}`,
      );

      if (!response.ok) throw new Error("Erro ao buscar dados");

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Erro ao buscar comparação:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar ao montar e quando meses mudarem
  useEffect(() => {
    fetchComparison();
  }, [currentMonth, previousMonth]);

  // Labels amigáveis dos KPIs
  const kpiLabels = {
    horasPratica: "Horas de Prática",
    horasTeoria: "Horas de Teoria",
    horasIngles: "Horas de Inglês",
    horasTotal: "Horas Totais",
    commits: "Commits",
    features: "Features Concluídas",
    bugs: "Bugs Resolvidos",
    modulos: "Módulos Estudados",
    exercicios: "Exercícios",
    conceitos: "Conceitos Dominados",
    licoesIngles: "Lições de Inglês",
    worksheets: "Worksheets",
    diasEstudados: "Dias Estudados",
  };

  // Calcular resumo geral
  const getGeneralSummary = () => {
    if (!data) return null;

    const { comparison } = data;
    const totalDiff = comparison.horasTotal?.diff || 0;
    const totalPercent = comparison.horasTotal?.percentChange || 0;
    const status = totalDiff > 0 ? "up" : totalDiff < 0 ? "down" : "same";

    return { totalDiff, totalPercent, status };
  };

  const summary = getGeneralSummary();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Loading message="Carregando comparação..." />
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">
              Erro ao carregar dados
            </h3>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <button
              onClick={fetchComparison}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Tentar Novamente
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Título da página */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📊 Comparação Mês a Mês
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Compare sua evolução entre diferentes meses
          </p>
        </div>

        {/* Seletor de Meses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-4 flex-wrap">
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />

            <div className="flex items-center gap-4 flex-1 flex-wrap">
              {/* Mês Anterior */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mês Anterior
                </label>
                <select
                  value={previousMonth}
                  onChange={(e) => setPreviousMonth(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {availableMonths.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <ArrowRight className="w-6 h-6 text-gray-400 hidden sm:block" />

              {/* Mês Atual */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mês Atual
                </label>
                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {availableMonths.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Geral */}
        {summary && (
          <div
            className={`rounded-xl p-6 shadow-lg ${
              summary.status === "up"
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : summary.status === "down"
                  ? "bg-gradient-to-r from-red-500 to-rose-600"
                  : "bg-gradient-to-r from-yellow-500 to-amber-600"
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-white text-lg font-semibold mb-1">
                  Evolução Geral
                </h3>
                <p className="text-white/90 text-sm">
                  Total de horas: {data.currentKPIs.horasTotal}h
                </p>
              </div>
              <div className="flex items-center gap-4">
                <TrendingUp className="w-8 h-8 text-white" />
                <div className="text-right">
                  <p className="text-white text-3xl font-bold">
                    {summary.totalDiff > 0 ? "+" : ""}
                    {summary.totalDiff}h
                  </p>
                  <p className="text-white/90 text-lg">
                    {summary.totalPercent > 0 ? "+" : ""}
                    {summary.totalPercent}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráfico de Comparação */}
        {data && (
          <TrendChart
            data={data.chartData}
            currentMonthName={data.currentMonthName}
            previousMonthName={data.previousMonthName}
          />
        )}

        {/* Grid de KPIs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📋 KPIs Detalhados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data &&
              Object.entries(data.comparison).map(([key, comparison]) => (
                <ComparisonCard
                  key={key}
                  label={kpiLabels[key] || key}
                  comparison={comparison}
                />
              ))}
          </div>
        </div>

        {/* Insights */}
        {data && data.insights && data.insights.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Insights Automáticos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.insights.map((insight, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-6 shadow-lg ${
                    insight.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{insight.icon}</span>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold mb-1 ${
                          insight.type === "success"
                            ? "text-green-900 dark:text-green-200"
                            : "text-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {insight.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          insight.type === "success"
                            ? "text-green-700 dark:text-green-300"
                            : "text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {insight.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
