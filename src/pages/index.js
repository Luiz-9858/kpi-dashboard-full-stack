// pages/index.js
// Página principal do dashboard

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import StatsCard, { StatsGrid } from "../components/StatsCard";
import KPICard from "../components/KPICard";
import { LineChartComponent, BarChartComponent } from "../components/Charts";
import {
  Clock,
  CheckCircle,
  Flame,
  FolderOpen,
  Code,
  Book,
  Globe,
  Target,
  TrendingUp,
  Calendar,
  BarChart3,
  Zap,
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca dados da API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");

      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || "Erro desconhecido");
      }
    } catch (err) {
      console.error("Erro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Dashboard - KPI Tracker</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="spinner mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  Carregando seus dados...
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Head>
          <title>Erro - KPI Tracker</title>
        </Head>
        <Header />
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="card max-w-2xl mx-auto text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Erro ao carregar dados
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
              <button onClick={fetchDashboardData} className="btn-primary">
                Tentar novamente
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                Verifique se o Notion está configurado corretamente.
                <br />
                Consulte o arquivo NOTION_SETUP.md
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Prepara dados para stats cards
  const statsData = [
    {
      title: "Horas esta semana",
      value: `${data.quickStats.totalHoursWeek}h`,
      subtitle: "Meta: 20-23h",
      icon: Clock,
      color: "blue",
      trend: "up",
      trendValue: 3,
      trendLabel: "+3h vs semana passada",
    },
    {
      title: "Tasks Completadas",
      value: `${data.quickStats.tasksCompleted}/${data.quickStats.tasksTotal}`,
      subtitle: `${Math.round((data.quickStats.tasksCompleted / data.quickStats.tasksTotal) * 100) || 0}% concluído`,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Streak",
      value: `🔥 ${data.quickStats.streak} dias`,
      subtitle: "Continue assim!",
      icon: Flame,
      color: "orange",
    },
    {
      title: "Projetos Ativos",
      value: data.quickStats.activeProjectsCount,
      subtitle: "Em andamento",
      icon: FolderOpen,
      color: "purple",
    },
  ];

  // Prepara dados para KPI cards
  const kpiCards = [
    {
      title: "Horas Prática",
      value: data.kpis.productivity.praticaHours.value,
      unit: "h",
      target: data.kpis.productivity.praticaHours.target,
      status: data.kpis.productivity.praticaHours.status,
      icon: Code,
    },
    {
      title: "Horas Teoria",
      value: data.kpis.productivity.teoriaHours.value,
      unit: "h",
      target: data.kpis.productivity.teoriaHours.target,
      status: data.kpis.productivity.teoriaHours.status,
      icon: Book,
    },
    {
      title: "Horas Inglês",
      value: data.kpis.productivity.inglesHours.value,
      unit: "h",
      target: data.kpis.productivity.inglesHours.target,
      status: data.kpis.productivity.inglesHours.status,
      icon: Globe,
    },
    {
      title: "Features Concluídas",
      value: data.kpis.practice.features.value,
      unit: "",
      target: data.kpis.practice.features.target,
      status: data.kpis.practice.features.status,
      icon: Target,
    },
    {
      title: "Dias Estudados",
      value: data.kpis.productivity.daysStudied.value,
      unit: "",
      target: data.kpis.productivity.daysStudied.target,
      status: data.kpis.productivity.daysStudied.status,
      icon: Calendar,
    },
    {
      title: "Módulos Concluídos",
      value: data.kpis.learning.modules.value,
      unit: "",
      target: data.kpis.learning.modules.target,
      status: data.kpis.learning.modules.status,
      icon: BarChart3,
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard - KPI Tracker Full Stack</title>
        <meta
          name="description"
          content="Acompanhe seu progresso como desenvolvedor Full Stack"
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Bem-vindo de volta! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Aqui está seu progresso esta semana
              </p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="btn-ghost flex items-center gap-2"
              title="Atualizar dados"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Atualizar</span>
            </button>
          </div>

          {/* Stats Cards */}
          <section>
            <StatsGrid stats={statsData} />
          </section>

          {/* KPIs Principais */}
          <section>
            <div className="section-header">
              <h2 className="section-title">KPIs Principais</h2>
              <a
                href="/kpis"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ver todos →
              </a>
            </div>
            <div className="dashboard-grid">
              {kpiCards.map((kpi, index) => (
                <KPICard key={index} kpi={kpi} />
              ))}
            </div>
          </section>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribuição de Horas */}
            <BarChartComponent
              title="Distribuição de Tempo"
              data={data.categoryBreakdown}
              xAxisKey="name"
              dataKeys={[
                { dataKey: "real", name: "Horas Reais" },
                { dataKey: "planned", name: "Horas Planejadas" },
              ]}
              colors={["#3b82f6", "#94a3b8"]}
              valueFormatter={(v) => `${v}h`}
              height={300}
            />

            {/* Tasks de Hoje */}
            <div className="card">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Tasks de Hoje
              </h3>
              <div className="space-y-3">
                {data.todayTasks.slice(0, 5).map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div
                      className={`
                      w-2 h-2 rounded-full flex-shrink-0
                      ${
                        task.priority === "Alta Prioridade"
                          ? "bg-red-500"
                          : task.priority === "Média Prioridade"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }
                    `}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {task.name}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {task.estimatedTime}h • {task.status}
                      </div>
                    </div>
                    <span
                      className={`
                      status-badge flex-shrink-0
                      ${
                        task.status === "Concluído"
                          ? "status-success"
                          : task.status === "Fazendo"
                            ? "status-warning"
                            : "status-info"
                      }
                    `}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
              {data.todayTasks.length === 0 && (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  📋 Nenhuma task para hoje
                </div>
              )}
              {data.todayTasks.length > 5 && (
                <div className="text-center mt-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Mostrando 5 de {data.todayTasks.length} tasks
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Progresso Semanal */}
          <section className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Progresso Semanal
              </h3>
              <span
                className={`
                status-badge
                ${
                  data.weeklyProgress.status === "success"
                    ? "status-success"
                    : data.weeklyProgress.status === "warning"
                      ? "status-warning"
                      : "status-danger"
                }
              `}
              >
                {data.weeklyProgress.percentage}%
              </span>
            </div>
            <div className="progress-bar mb-2">
              <div
                className={`
                  progress-bar-fill
                  ${
                    data.weeklyProgress.status === "success"
                      ? "progress-success"
                      : data.weeklyProgress.status === "warning"
                        ? "progress-warning"
                        : "progress-danger"
                  }
                `}
                style={{ width: `${data.weeklyProgress.percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>
                {data.weeklyProgress.real}h de {data.weeklyProgress.planned}h
                planejadas
              </span>
              <span>Meta: 20-23h</span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
