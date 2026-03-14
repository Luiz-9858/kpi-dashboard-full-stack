// pages/kpis.js
// Página de KPIs Detalhados
// OTIMIZADO PARA MOBILE - Responsividade completa

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { SkeletonCard, ErrorState } from "@/components/Loading";
import {
  TrendingUp,
  Code,
  BookOpen,
  Globe,
  Target,
  Calendar,
} from "lucide-react";

export default function KPIsPage() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchKPIs();
  }, []);

  async function fetchKPIs() {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");

      if (!response.ok) throw new Error("Erro ao buscar KPIs");

      const data = await response.json();
      setKpis(data.data.kpis);
      setError(null);
    } catch (err) {
      console.error("Erro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Calcula estatísticas gerais
  const getStats = () => {
    if (!kpis) return { total: 0, success: 0, warning: 0, danger: 0 };

    const allKpis = [
      ...Object.values(kpis.productivity || {}),
      ...Object.values(kpis.practice || {}),
      ...Object.values(kpis.learning || {}),
      ...Object.values(kpis.language || {}),
    ];

    return {
      total: allKpis.length,
      success: allKpis.filter((k) => k.status === "success").length,
      warning: allKpis.filter((k) => k.status === "warning").length,
      danger: allKpis.filter((k) => k.status === "danger").length,
    };
  };

  const stats = getStats();

  return (
    <>
      <Head>
        <title>KPIs | KPI Dashboard</title>
        <meta
          name="description"
          content="Todos os indicadores de performance"
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  KPIs Detalhados
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
                  Acompanhe todos os seus indicadores de performance
                </p>
              </div>
            </div>

            {/* Cards de estatísticas - RESPONSIVE */}
            {!loading && !error && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="card p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Total
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.total}
                  </p>
                </div>
                <div className="card p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Ótimo 🟢
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.success}
                  </p>
                </div>
                <div className="card p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Atenção 🟡
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.warning}
                  </p>
                </div>
                <div className="card p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Crítico 🔴
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                    {stats.danger}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="h-5 sm:h-6 w-36 sm:w-48 bg-slate-200 dark:bg-slate-700 rounded mb-4 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <ErrorState error={error} onRetry={fetchKPIs} />
          )}

          {/* KPIs */}
          {!loading && !error && kpis && (
            <div className="space-y-6 sm:space-y-8">
              {/* Produtividade */}
              {kpis.productivity && (
                <KPISection
                  title="Produtividade"
                  icon={Calendar}
                  color="blue"
                  kpis={kpis.productivity}
                />
              )}

              {/* Prática */}
              {kpis.practice && (
                <KPISection
                  title="Prática"
                  icon={Code}
                  color="green"
                  kpis={kpis.practice}
                />
              )}

              {/* Aprendizado */}
              {kpis.learning && (
                <KPISection
                  title="Aprendizado"
                  icon={BookOpen}
                  color="yellow"
                  kpis={kpis.learning}
                />
              )}

              {/* Idioma */}
              {kpis.language && (
                <KPISection
                  title="Idioma"
                  icon={Globe}
                  color="purple"
                  kpis={kpis.language}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

// Componente de Seção de KPIs - RESPONSIVE
function KPISection({ title, icon: Icon, color, kpis }) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    yellow: "from-yellow-500 to-orange-500",
    purple: "from-purple-500 to-pink-500",
  };

  const kpiList = Object.entries(kpis).map(([key, data]) => ({
    key,
    ...data,
  }));

  return (
    <div>
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          ({kpiList.length} KPIs)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {kpiList.map((kpi) => (
          <KPICard key={kpi.key} kpi={kpi} />
        ))}
      </div>
    </div>
  );
}

// Componente de Card de KPI - RESPONSIVE
function KPICard({ kpi }) {
  const statusConfig = {
    success: {
      badge: "🟢 Ótimo",
      badgeClass:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      barClass: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    warning: {
      badge: "🟡 Atenção",
      badgeClass:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      barClass: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    danger: {
      badge: "🔴 Crítico",
      badgeClass:
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      barClass: "bg-gradient-to-r from-red-500 to-rose-500",
    },
  };

  const config = statusConfig[kpi.status] || statusConfig.warning;

  // Calcula porcentagem de progresso
  const progress = kpi.target?.max
    ? Math.min(100, (kpi.value / kpi.target.max) * 100)
    : 0;

  // Formata valor
  const formatValue = (value, unit) => {
    if (unit === "h") return `${value}h`;
    if (unit === "dias") return `${value} dias`;
    return value;
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-200 group p-3 sm:p-4">
      {/* Header - RESPONSIVE */}
      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 truncate">
            {kpi.title}
          </h3>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {formatValue(kpi.value, kpi.unit)}
            </span>
            {kpi.unit && (
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {kpi.unit}
              </span>
            )}
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded text-[10px] sm:text-xs font-medium flex-shrink-0 ${config.badgeClass}`}
        >
          {config.badge}
        </span>
      </div>

      {/* Meta - RESPONSIVE */}
      {kpi.target && (
        <div className="mb-2 sm:mb-3">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 truncate">
              Meta: {kpi.target.min}-{kpi.target.max} {kpi.unit}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white flex-shrink-0 ml-2">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 sm:h-2">
            <div
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${config.barClass}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Ícone */}
      <div className="pt-2 sm:pt-3 border-t border-slate-200 dark:border-slate-700">
        <Target className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-500" />
      </div>
    </div>
  );
}
