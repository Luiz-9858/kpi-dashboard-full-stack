// pages/okrs.js
// Página de OKRs (Objectives and Key Results) Q1 2026

import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import {
  Target,
  TrendingUp,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { OKRS_Q1_2026 } from "@/lib/constants";

export default function OKRsPage() {
  const [expandedOKR, setExpandedOKR] = useState(0); // Primeiro OKR expandido por padrão

  // Calcula progresso geral de todos os OKRs
  const calculateOverallProgress = () => {
    const totalKRs = OKRS_Q1_2026.reduce(
      (sum, okr) => sum + okr.keyResults.length,
      0,
    );
    const totalProgress = OKRS_Q1_2026.reduce(
      (sum, okr) =>
        sum + okr.keyResults.reduce((s, kr) => s + (kr.progress || 0), 0),
      0,
    );
    return totalKRs > 0 ? Math.round(totalProgress / totalKRs) : 0;
  };

  const overallProgress = calculateOverallProgress();

  // Calcula estatísticas
  const totalOKRs = OKRS_Q1_2026.length;
  const totalKRs = OKRS_Q1_2026.reduce(
    (sum, okr) => sum + okr.keyResults.length,
    0,
  );
  const completedKRs = OKRS_Q1_2026.reduce(
    (sum, okr) =>
      sum + okr.keyResults.filter((kr) => kr.progress >= 100).length,
    0,
  );
  const inProgressKRs = OKRS_Q1_2026.reduce(
    (sum, okr) =>
      sum +
      okr.keyResults.filter((kr) => kr.progress > 0 && kr.progress < 100)
        .length,
    0,
  );

  return (
    <>
      <Head>
        <title>OKRs Q1 2026 | KPI Dashboard</title>
        <meta
          name="description"
          content="Objetivos e Key Results do primeiro trimestre de 2026"
        />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cabeçalho */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  OKRs Q1 2026
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Objetivos e Key Results do primeiro trimestre
                </p>
              </div>
            </div>

            {/* Progresso Geral */}
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Progresso Geral
                </h2>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {overallProgress}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {totalOKRs}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    OKRs
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {totalKRs}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Key Results
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {completedKRs}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Concluídos
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {inProgressKRs}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Em Progresso
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de OKRs */}
          <div className="space-y-4">
            {OKRS_Q1_2026.map((okr, index) => (
              <OKRCard
                key={index}
                okr={okr}
                index={index}
                isExpanded={expandedOKR === index}
                onToggle={() =>
                  setExpandedOKR(expandedOKR === index ? -1 : index)
                }
              />
            ))}
          </div>

          {/* Timeline */}
          <div className="card mt-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              📅 Timeline Q1 2026
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-600 dark:text-slate-400">
                  Início:
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  Janeiro 2026
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600 dark:text-slate-400">
                  Término:
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  Março 2026
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600 dark:text-slate-400">
                  Revisão:
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  Semanal (Domingos)
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Componente de Card de OKR
function OKRCard({ okr, index, isExpanded, onToggle }) {
  // Calcula progresso do OKR
  const okrProgress = Math.round(
    okr.keyResults.reduce((sum, kr) => sum + kr.progress, 0) /
      okr.keyResults.length,
  );

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
    <div className="card hover:shadow-xl transition-all duration-200">
      {/* Header clicável */}
      <button onClick={onToggle} className="w-full text-left">
        <div className="flex items-start gap-4">
          {/* Ícone */}
          <div
            className={`w-12 h-12 bg-gradient-to-br ${bgGradient} rounded-lg flex items-center justify-center flex-shrink-0`}
          >
            <span className="text-2xl">{okr.icon}</span>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  OKR {index + 1}: {okr.objective}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {okr.category} • {okr.keyResults.length} Key Results
                </p>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </div>

            {/* Barra de progresso do OKR */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${bgGradient} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${okrProgress}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {okrProgress}%
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* Key Results (expansível) */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
          {okr.keyResults.map((kr, krIndex) => (
            <KeyResultItem key={krIndex} kr={kr} />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente de Key Result
function KeyResultItem({ kr }) {
  const isCompleted = kr.progress >= 100;
  const isInProgress = kr.progress > 0 && kr.progress < 100;

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
      {/* Ícone de status */}
      <div className="flex-shrink-0 mt-1">
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : isInProgress ? (
          <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
        ) : (
          <Circle className="w-5 h-5 text-slate-400" />
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium mb-2 ${
            isCompleted
              ? "text-green-600 dark:text-green-400 line-through"
              : "text-slate-900 dark:text-white"
          }`}
        >
          {kr.description}
        </p>

        {/* Barra de progresso */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                isCompleted
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
              }`}
              style={{ width: `${kr.progress}%` }}
            />
          </div>
          <span
            className={`text-xs font-semibold ${
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
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Meta: {kr.target}
          </p>
        )}
      </div>
    </div>
  );
}
