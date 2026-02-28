// pages/kpis.js
// Página de KPIs Detalhados

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
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cabeçalho */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  KPIs Detalhados
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Acompanhe todos os seus indicadores de performance
                </p>
              </div>
            </div>

            {/* Cards de estatísticas */}
            {!loading && !error && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="card">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.total}
                  </p>
                </div>
                <div className="card">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Ótimo 🟢
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.success}
                  </p>
                </div>
                <div className="card">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Atenção 🟡
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.warning}
                  </p>
                </div>
                <div className="card">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    Crítico 🔴
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {stats.danger}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-8">
              <div>
                <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-4 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="space-y-8">
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

// Componente de Seção de KPIs
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
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          ({kpiList.length} KPIs)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiList.map((kpi) => (
          <KPICard key={kpi.key} kpi={kpi} />
        ))}
      </div>
    </div>
  );
}

// Componente de Card de KPI
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
    <div className="card hover:shadow-xl transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {kpi.title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatValue(kpi.value, kpi.unit)}
            </span>
            {kpi.unit && (
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {kpi.unit}
              </span>
            )}
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${config.badgeClass}`}
        >
          {config.badge}
        </span>
      </div>

      {/* Meta */}
      {kpi.target && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Meta: {kpi.target.min}-{kpi.target.max} {kpi.unit}
            </span>
            <span className="text-xs font-medium text-slate-900 dark:text-white">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${config.barClass}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Ícone */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
        <Target className="w-4 h-4 text-slate-400 dark:text-slate-500" />
      </div>
    </div>
  );
}
