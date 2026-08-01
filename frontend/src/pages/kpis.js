// pages/kpis.js
// Página completa de KPIs com 15 indicadores
// OTIMIZADO PARA MOBILE MAIS ANIMAÇÕES

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import KPICard from "@/components/KPICard";
import { formatHours } from "@/lib/utils";
import { SkeletonCard, ErrorState } from "@/components/Loading";
import {
  BarChart3,
  Code,
  Book,
  Globe,
  Calendar,
  Target,
  GitBranch,
  Bug,
  GitPullRequest,
  FolderCheck,
  GraduationCap,
  Calculator,
  Lightbulb,
  MessageCircle,
  FileText,
} from "lucide-react";

export default function KPIsPage() {
  const [kpisData, setKpisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchKPIs();
  }, []);

  async function fetchKPIs() {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");

      if (!response.ok) throw new Error("Erro ao buscar KPIs");

      const result = await response.json();
      setKpisData(result.data?.kpis || null);
      setError(null);
    } catch (err) {
      console.error("Erro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>KPIs | Dashboard</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Erro | KPIs</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <ErrorState error={error} onRetry={fetchKPIs} />
          </div>
        </main>
      </>
    );
  }

  // Organiza KPIs por categoria
  const kpisByCategory = {
    productivity: [
      {
        title: "Horas Prática",
        ...kpisData.productivity.praticaHours,
        unit: "h",
        icon: Code,
      },
      {
        title: "Horas Teoria",
        ...kpisData.productivity.teoriaHours,
        unit: "h",
        icon: Book,
      },
      {
        title: "Horas Inglês",
        ...kpisData.productivity.inglesHours,
        unit: "h",
        icon: Globe,
      },
      {
        title: "Total de Horas",
        ...kpisData.productivity.totalHours,
        unit: "h",
        icon: BarChart3,
      },
      {
        title: "Dias Estudados",
        ...kpisData.productivity.daysStudied,
        unit: "",
        icon: Calendar,
      },
      {
        title: "Streak Dias",
        ...kpisData.productivity.streak,
        unit: "",
        icon: Target,
      },
    ],
    practice: [
      {
        title: "Commits GitHub",
        ...kpisData.practice.commits,
        unit: "",
        icon: GitBranch,
      },
      {
        title: "Features Concluídas",
        ...kpisData.practice.features,
        unit: "",
        icon: Target,
      },
      {
        title: "Bugs Resolvidos",
        ...kpisData.practice.bugs,
        unit: "",
        icon: Bug,
      },
      {
        title: "PRs Criados",
        ...kpisData.practice.prs,
        unit: "",
        icon: GitPullRequest,
      },
      {
        title: "Projetos Finalizados",
        ...kpisData.practice.projects,
        unit: "",
        icon: FolderCheck,
      },
    ],
    learning: [
      {
        title: "Módulos Concluídos",
        ...kpisData.learning.modules,
        unit: "",
        icon: GraduationCap,
      },
      {
        title: "Exercícios Algoritmos",
        ...kpisData.learning.exercises,
        unit: "",
        icon: Calculator,
      },
      {
        title: "Conceitos Dominados",
        ...kpisData.learning.concepts,
        unit: "",
        icon: Lightbulb,
      },
    ],
    language: [
      {
        title: "Lições Method Callan",
        ...kpisData.language.lessons,
        unit: "",
        icon: MessageCircle,
      },
      {
        title: "Worksheets Completas",
        ...kpisData.language.worksheets,
        unit: "",
        icon: FileText,
      },
    ],
  };

  // Filtra KPIs baseado na categoria selecionada
  const getFilteredKPIs = () => {
    if (selectedCategory === "all") {
      return [
        ...kpisByCategory.productivity,
        ...kpisByCategory.practice,
        ...kpisByCategory.learning,
        ...kpisByCategory.language,
      ];
    }
    return kpisByCategory[selectedCategory] || [];
  };

  const filteredKPIs = getFilteredKPIs();

  return (
    <>
      <Head>
        <title>KPIs Completos | Dashboard</title>
        <meta name="description" content="Todos os 15 KPIs de acompanhamento" />
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  KPIs Completos
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Acompanhe todos os 15 indicadores de performance
                </p>
              </div>
            </div>

            {/* Filtros - ANIMAÇÃO */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 animate-fade-in-up delay-200">
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                Categoria:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap hover-scale ${
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Todos (15)
                </button>
                <button
                  onClick={() => setSelectedCategory("productivity")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap hover-scale ${
                    selectedCategory === "productivity"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  📊 Produtividade (6)
                </button>
                <button
                  onClick={() => setSelectedCategory("practice")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap hover-scale ${
                    selectedCategory === "practice"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  💻 Prática (5)
                </button>
                <button
                  onClick={() => setSelectedCategory("learning")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap hover-scale ${
                    selectedCategory === "learning"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  📚 Aprendizado (3)
                </button>
                <button
                  onClick={() => setSelectedCategory("language")}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap hover-scale ${
                    selectedCategory === "language"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  🌍 Idioma (2)
                </button>
              </div>
            </div>
          </div>

          {/* Grid de KPIs - STAGGER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 grid-stagger">
            {filteredKPIs.map((kpi, index) => (
              <div key={index} className="card-entrance">
                <KPICard kpi={kpi} />
              </div>
            ))}
          </div>

          {/* Resumo - ANIMAÇÃO */}
          {selectedCategory === "all" && kpisData && (
            <div className="card mt-6 sm:mt-8 p-4 sm:p-6 animate-fade-in-up delay-500">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4">
                📈 Resumo Geral
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {kpisData.summary?.success || 0}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    🟢 Ótimo
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {kpisData.summary?.warning || 0}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    🟡 Atenção
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {kpisData.summary?.danger || 0}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    🔴 Baixo
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {kpisData.summary?.total || 15}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Total
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
