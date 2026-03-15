// pages/okrs.js
// Página de OKRs (Objectives and Key Results) Q1 2026
// ATUALIZADO: Busca OKRs automaticamente do Notion
// OTIMIZADO PARA MOBILE - Responsividade completa

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { SkeletonCard, ErrorState } from "@/components/Loading";
import {
  Target,
  TrendingUp,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function OKRsPage() {
  const [okrsData, setOkrsData] = useState([]);
  const [okrsSummary, setOkrsSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOKR, setExpandedOKR] = useState(0); // Primeiro OKR expandido por padrão

  // Busca OKRs da API
  useEffect(() => {
    fetchOKRs();
  }, []);

  async function fetchOKRs() {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");

      if (!response.ok) throw new Error("Erro ao buscar OKRs");

      const result = await response.json();

      // Extrai OKRs e summary da resposta
      setOkrsData(result.data?.okrs || []);
      setOkrsSummary(result.data?.okrsSummary || null);
      setError(null);
    } catch (err) {
      console.error("Erro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Usa os dados do summary se disponível, senão calcula localmente
  const totalOKRs = okrsSummary?.totalOKRs || okrsData.length;
  const totalKRs =
    okrsSummary?.totalKRs ||
    okrsData.reduce((sum, okr) => sum + okr.totalKRs, 0);
  const overallProgress = okrsSummary?.avgProgress || 0;
  const completedKRs = okrsSummary?.completedKRs || 0;
  const inProgressKRs = okrsSummary?.inProgressKRs || 0;

  return (
    <>
      <Head>
        <title>OKRs Q1 2026 | KPI Dashboard</title>
        <meta
          name="description"
          content="Objetivos e Key Results do primeiro trimestre de 2026"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Cabeçalho - RESPONSIVE */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  OKRs Q1 2026
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Objetivos e Key Results do primeiro trimestre
                </p>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="space-y-3 sm:space-y-4">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <ErrorState error={error} onRetry={fetchOKRs} />
            )}

            {/* Progresso Geral - RESPONSIVE */}
            {!loading && !error && (
              <div className="card mb-4 sm:mb-6 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                    Progresso Geral
                  </h2>
                  <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {overallProgress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {totalOKRs}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      OKRs
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {totalKRs}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Key Results
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                      {completedKRs}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Concluídos
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {inProgressKRs}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Em Progresso
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lista de OKRs - RESPONSIVE */}
          {!loading && !error && okrsData.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              {okrsData.map((okr, index) => (
                <OKRCard
                  key={okr.id || index}
                  okr={okr}
                  index={index}
                  isExpanded={expandedOKR === index}
                  onToggle={() =>
                    setExpandedOKR(expandedOKR === index ? -1 : index)
                  }
                />
              ))}
            </div>
          )}

          {/* Mensagem se não houver OKRs */}
          {!loading && !error && okrsData.length === 0 && (
            <div className="card text-center py-8 sm:py-12 px-4">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Nenhum OKR encontrado
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Configure seus OKRs no Notion para vê-los aqui!
              </p>
            </div>
          )}

          {/* Timeline - RESPONSIVE */}
          {!loading && !error && okrsData.length > 0 && (
            <div className="card mt-6 sm:mt-8 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">
                📅 Timeline {okrsSummary?.quarter || "Q1 2026"}
              </h2>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 dark:text-slate-400 min-w-[70px]">
                    Início:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Janeiro 2026
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 dark:text-slate-400 min-w-[70px]">
                    Término:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Março 2026
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 dark:text-slate-400 min-w-[70px]">
                    Revisão:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    Semanal (Domingos)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 dark:text-slate-400 min-w-[70px]">
                    Atualização:
                  </span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Automática do Notion ✨
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

// Componente de Card de OKR - RESPONSIVE
function OKRCard({ okr, index, isExpanded, onToggle }) {
  // Usa o progresso já calculado pela API
  const okrProgress = okr.progress || 0;

  // Cores por categoria
  const categoryColors = {
    Projeto: "from-purple-500 to-pink-500",
    Aprendizado: "from-blue-500 to-cyan-500",
    Carreira: "from-green-500 to-emerald-500",
    Idioma: "from-orange-500 to-red-500",
  };

  const bgGradient =
    categoryColors[okr.category] || "from-slate-500 to-slate-600";

  return (
    <div className="card hover:shadow-xl transition-all duration-200 p-4 sm:p-5">
      {/* Header clicável - RESPONSIVE */}
      <button onClick={onToggle} className="w-full text-left">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Ícone */}
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${bgGradient} rounded-lg flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-xl sm:text-2xl">{okr.icon || "📊"}</span>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
                  OKR {index + 1}: {okr.objective}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {okr.category} • {okr.keyResults?.length || 0} Key Results
                </p>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
              )}
            </div>

            {/* Barra de progresso do OKR */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2">
                <div
                  className={`bg-gradient-to-r ${bgGradient} h-1.5 sm:h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${okrProgress}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex-shrink-0">
                {okrProgress}%
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* Key Results (expansível) - RESPONSIVE */}
      {isExpanded && okr.keyResults && okr.keyResults.length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700 space-y-2 sm:space-y-3">
          {okr.keyResults.map((kr, krIndex) => (
            <KeyResultItem key={kr.id || krIndex} kr={kr} />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente de Key Result - RESPONSIVE
function KeyResultItem({ kr }) {
  const isCompleted = kr.progress >= 100;
  const isInProgress = kr.progress > 0 && kr.progress < 100;

  return (
    <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
      {/* Ícone de status */}
      <div className="flex-shrink-0 mt-0.5 sm:mt-1">
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
        ) : isInProgress ? (
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500" />
          </div>
        ) : (
          <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
            isCompleted
              ? "text-green-600 dark:text-green-400 line-through"
              : "text-slate-900 dark:text-white"
          }`}
        >
          {kr.keyResult}
        </p>

        {/* Barra de progresso */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-1 sm:h-1.5">
            <div
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                isCompleted
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
              }`}
              style={{ width: `${kr.progress}%` }}
            />
          </div>
          <span
            className={`text-[10px] sm:text-xs font-semibold flex-shrink-0 ${
              isCompleted
                ? "text-green-600 dark:text-green-400"
                : "text-slate-900 dark:text-white"
            }`}
          >
            {kr.progress}%
          </span>
        </div>

        {/* Meta */}
        {kr.target && (
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
            Meta: {kr.target}
          </p>
        )}
      </div>
    </div>
  );
}
