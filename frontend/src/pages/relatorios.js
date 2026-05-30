// pages/relatorios.js
// Página de Relatórios Semanais com Insights e Análises
// 100% RESPONSIVO + ANIMAÇÕES

import { useState, useEffect } from "react";
import { generateReportPDF, formatDataForPDF } from "../lib/pdfExport";
import { Download } from "lucide-react";
import Head from "next/head";
import Header from "@/components/Header";
import { SkeletonCard, ErrorState } from "@/components/Loading";
import InsightCard, {
  InsightsGrid,
  WeekScoreCard,
} from "@/components/InsightCard";
import { LineChartComponent } from "@/components/Charts";
import {
  generateInsights,
  calculateWeekScore,
  generateRecommendations,
} from "@/lib/insights";
import {
  FileText,
  TrendingUp,
  AlertCircle,
  Award,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function RelatoriosPage() {
  const [currentWeekData, setCurrentWeekData] = useState(null);
  const [previousWeekData, setPreviousWeekData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  async function fetchReportData() {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");

      if (!response.ok) throw new Error("Erro ao buscar dados");

      const result = await response.json();
      setCurrentWeekData(result.data);

      // TODO: Implementar busca de dados da semana anterior
      // Por enquanto, usamos null para previousWeekData
      setPreviousWeekData(null);

      setError(null);
    } catch (err) {
      console.error("Erro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Função para baixar PDF
  const handleDownloadPDF = () => {
    if (!currentWeekData) {
      alert("Aguarde os dados carregarem!");
      return;
    }

    try {
      console.log("=== ESTRUTURA COMPLETA ===");
      console.log("currentWeekData:", currentWeekData);
      console.log("=========================");

      const pdfData = formatDataForPDF(currentWeekData);
      console.log("=== DADOS FORMATADOS ===");
      console.log("pdfData:", pdfData);
      console.log("========================");

      generateReportPDF(pdfData);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Tente novamente.");
    }
  };

  // Gera insights e análises
  const insights =
    currentWeekData && generateInsights(currentWeekData, previousWeekData);
  const weekScore = currentWeekData && calculateWeekScore(currentWeekData);
  const recommendations =
    currentWeekData && generateRecommendations(currentWeekData.kpis);

  return (
    <>
      <Head>
        <title>Relatórios | KPI Dashboard</title>
        <meta
          name="description"
          content="Análises semanais e insights personalizados"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Cabeçalho - ANIMAÇÃO */}
          <div className="mb-6 sm:mb-8 animate-fade-in-down">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              {/* Cabeçalho com botão */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    📊 Relatórios Semanais
                  </h1>
                </div>
                <button
                  onClick={handleDownloadPDF}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                >
                  <Download className="w-5 h-5" />
                  <span>Baixar PDF</span>
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Análises, insights e recomendações personalizadas
              </p>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <ErrorState error={error} onRetry={fetchReportData} />
          )}

          {/* Conteúdo Principal */}
          {!loading && !error && currentWeekData && insights && (
            <div className="space-y-6 sm:space-y-8">
              {/* Resumo da Semana + Score */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Resumo Semanal */}
                <div className="lg:col-span-2">
                  <WeeklySummaryCard data={currentWeekData} />
                </div>

                {/* Score da Semana */}
                <div>
                  <WeekScoreCard score={weekScore} />
                </div>
              </div>

              {/* Conquistas */}
              {insights.achievements.length > 0 && (
                <section className="animate-fade-in-up delay-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Conquistas da Semana
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({insights.achievements.length})
                    </span>
                  </div>
                  <InsightsGrid insights={insights.achievements} />
                </section>
              )}

              {/* Avisos e Pontos de Atenção */}
              {insights.warnings.length > 0 && (
                <section className="animate-fade-in-up delay-300">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Pontos de Atenção
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({insights.warnings.length})
                    </span>
                  </div>
                  <InsightsGrid insights={insights.warnings} />
                </section>
              )}

              {/* Insights Gerais */}
              {insights.insights.length > 0 && (
                <section className="animate-fade-in-up delay-400">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Insights e Análises
                    </h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({insights.insights.length})
                    </span>
                  </div>
                  <InsightsGrid insights={insights.insights} />
                </section>
              )}

              {/* Distribuição de Horas por Categoria */}
              <section className="animate-fade-in-up delay-500">
                <CategoryBreakdownCard data={currentWeekData} />
              </section>

              {/* Recomendações */}
              {recommendations.length > 0 && (
                <section className="animate-fade-in-up delay-600">
                  <RecommendationsCard recommendations={recommendations} />
                </section>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

// Card de Resumo Semanal
function WeeklySummaryCard({ data }) {
  const { totalHoursWeek, tasksCompleted, tasksTotal, streak } =
    data.quickStats;
  const { percentage, status } = data.weeklyProgress;

  const statusConfig = {
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      badge: "🟢 Excelente!",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      text: "text-yellow-600 dark:text-yellow-400",
      badge: "🟡 Pode Melhorar",
    },
    danger: {
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-600 dark:text-red-400",
      badge: "🔴 Precisa Atenção",
    },
  };

  const config = statusConfig[status] || statusConfig.warning;

  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4">
        📊 Resumo da Semana
      </h3>

      {/* Horas Totais */}
      <div className={`p-4 rounded-lg ${config.bg} mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {totalHoursWeek.toFixed(1)}h
          </span>
          <span className={`text-sm font-medium ${config.text}`}>
            {config.badge}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          de 20-23h planejadas ({percentage}% da meta)
        </p>
      </div>

      {/* Grid de Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {tasksCompleted}/{tasksTotal}
          </div>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tasks
          </div>
        </div>

        <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {streak} 🔥
          </div>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Dias
          </div>
        </div>

        <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 col-span-2 sm:col-span-1">
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {data.activeProjects.length}
          </div>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Projetos
          </div>
        </div>
      </div>
    </div>
  );
}

// Card de Distribuição por Categoria
function CategoryBreakdownCard({ data }) {
  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4">
        📈 Distribuição de Horas
      </h3>

      <div className="space-y-4">
        {data.categoryBreakdown.map((cat, index) => {
          const percentage =
            cat.planned > 0 ? (cat.real / cat.planned) * 100 : 0;
          const isOnTarget = percentage >= 80 && percentage <= 120;

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {cat.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {cat.real.toFixed(1)}h / {cat.planned.toFixed(1)}h
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      isOnTarget
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isOnTarget
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : "bg-gradient-to-r from-yellow-500 to-orange-500"
                  }`}
                  style={{ width: `${Math.min(100, percentage)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Card de Recomendações
function RecommendationsCard({ recommendations }) {
  if (recommendations.length === 0) return null;

  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4">
        💡 Recomendações
      </h3>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">💡</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {rec.message}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Meta: {rec.target.min}-{rec.target.max} • Atual: {rec.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
