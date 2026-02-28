// pages/projetos.js
// Página de Projetos Ativos

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { SkeletonCard, ErrorState, EmptyState } from "@/components/Loading";
import { Folder, Calendar, Target, TrendingUp, Filter } from "lucide-react";

export default function ProjetosPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, completed

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");

      if (!response.ok) throw new Error("Erro ao buscar projetos");

      const result = await response.json();

      // CORRIGIDO: data.data.activeProjects, não data.activeProjects
      setProjects(result.data?.activeProjects || []);
      setError(null);
    } catch (err) {
      console.error("Erro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Filtra projetos baseado no filtro selecionado
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "active") return project.status !== "Concluído";
    if (filter === "completed") return project.status === "Concluído";
    return true;
  });

  // Estatísticas
  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status !== "Concluído").length,
    completed: projects.filter((p) => p.status === "Concluído").length,
  };

  return (
    <>
      <Head>
        <title>Projetos | KPI Dashboard</title>
        <meta name="description" content="Projetos ativos e concluídos" />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Cabeçalho da página */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Folder className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Projetos Ativos
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Acompanhe o progresso dos seus projetos
                </p>
              </div>
            </div>

            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Total de Projetos
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.total}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Em Andamento
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.active}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Concluídos
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stats.completed}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Filtrar:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Todos ({stats.total})
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "active"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Ativos ({stats.active})
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "completed"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Concluídos ({stats.completed})
                </button>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <ErrorState error={error} onRetry={fetchProjects} />
          )}

          {/* Empty */}
          {!loading && !error && filteredProjects.length === 0 && (
            <EmptyState
              icon="📁"
              title="Nenhum projeto encontrado"
              message="Adicione projetos no Notion para visualizá-los aqui."
            />
          )}

          {/* Grid de projetos */}
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

// Componente de Card de Projeto
function ProjectCard({ project }) {
  const statusColors = {
    Concluído:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "Em andamento":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "Em desenvolvimento":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "Em teste":
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
    Pausado:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Planejando:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  };

  const priorityColors = {
    "🔴 Urgente": "text-red-600 dark:text-red-400",
    "🟠 Alta": "text-orange-600 dark:text-orange-400",
    "🟡 Média": "text-yellow-600 dark:text-yellow-400",
    "🟢 Baixa": "text-green-600 dark:text-green-400",
  };

  // Extrai porcentagem do progress (ex: "🟡 25-50% - Desenvolvimento" → 37.5)
  const extractProgress = (progressStr) => {
    if (!progressStr) return 0;
    const match = progressStr.match(/(\d+)-(\d+)%/);
    if (match) {
      const min = parseInt(match[1]);
      const max = parseInt(match[2]);
      return (min + max) / 2; // Média
    }
    const singleMatch = progressStr.match(/(\d+)%/);
    if (singleMatch) return parseInt(singleMatch[1]);
    return 0;
  };

  const progressValue = extractProgress(project.progress);

  return (
    <div className="card hover:shadow-xl transition-all duration-200 group">
      {/* Header do card */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              statusColors[project.status] || statusColors["Planejando"]
            }`}
          >
            {project.status || "Sem status"}
          </span>

          {project.priority && (
            <span
              className={`text-xs font-medium ${
                priorityColors[project.priority] || "text-slate-600"
              }`}
            >
              • {project.priority}
            </span>
          )}
        </div>

        {project.category && (
          <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
            <Folder className="w-4 h-4" />
            <span>{project.category}</span>
          </div>
        )}
      </div>

      {/* Barra de progresso */}
      {progressValue > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Progresso
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {Math.round(progressValue)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
          Ver detalhes →
        </button>
      </div>
    </div>
  );
}
