// pages/github.js
// Página de Integração GitHub
// Mostra commits, PRs, repos e estatísticas
// 100% RESPONSIVO + ANIMAÇÕES

import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { SkeletonCard, ErrorState } from "@/components/Loading";
import { LineChartComponent, BarChartComponent } from "@/components/Charts";
import {
  Github,
  GitBranch,
  GitPullRequest,
  Star,
  GitCommit,
  TrendingUp,
  Code,
  ExternalLink,
} from "lucide-react";

const GITHUB_USERNAME = "Luiz-9858";

export default function GitHubPage() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  async function fetchGitHubData() {
    try {
      setLoading(true);
      const response = await fetch("/api/github");

      if (!response.ok) throw new Error("Erro ao buscar dados do GitHub");

      const result = await response.json();
      setGithubData(result.data);
      setError(null);
    } catch (err) {
      console.error("Erro:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>GitHub | KPI Dashboard</title>
        <meta
          name="description"
          content="Integração com GitHub - Commits, PRs e Repositórios"
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
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Integração GitHub
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  @{GITHUB_USERNAME} - Commits, PRs e Repositórios
                </p>
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <span>Ver no GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
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
            <ErrorState error={error} onRetry={fetchGitHubData} />
          )}

          {/* Conteúdo Principal */}
          {!loading && !error && githubData && (
            <div className="space-y-6 sm:space-y-8">
              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 grid-stagger">
                <StatCard
                  icon={GitCommit}
                  label="Commits (7 dias)"
                  value={githubData.stats.commits.total}
                  subtext={`${githubData.stats.commits.avgPerDay}/dia`}
                  color="blue"
                />
                <StatCard
                  icon={GitPullRequest}
                  label="Pull Requests"
                  value={githubData.stats.pullRequests.total}
                  subtext={`${githubData.stats.pullRequests.merged} merged`}
                  color="purple"
                />
                <StatCard
                  icon={GitBranch}
                  label="Repositórios"
                  value={githubData.stats.repositories.total}
                  subtext={`${githubData.stats.repositories.active} ativos`}
                  color="green"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Streak"
                  value={`${githubData.streak} 🔥`}
                  subtext="dias consecutivos"
                  color="orange"
                />
              </div>

              {/* Gráfico de Commits (Últimos 7 dias) */}
              <section className="animate-fade-in-up delay-200">
                <BarChartComponent
                  title="Commits nos Últimos 7 Dias"
                  data={githubData.chartData}
                  xAxisKey="label"
                  dataKeys={[{ dataKey: "commits", name: "Commits" }]}
                  colors={["#3b82f6"]}
                  height={280}
                />
              </section>

              {/* Linguagens Mais Usadas */}
              {githubData.stats.repositories.languages.length > 0 && (
                <section className="animate-fade-in-up delay-300">
                  <LanguagesCard
                    languages={githubData.stats.repositories.languages}
                  />
                </section>
              )}

              {/* Repositórios Recentes */}
              <section className="animate-fade-in-up delay-400">
                <RepositoriesCard repositories={githubData.repositories} />
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

// Card de Estatística
function StatCard({ icon: Icon, label, value, subtext, color }) {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-red-500",
  };

  return (
    <div className="card p-4 hover:shadow-lg transition-all duration-200 card-entrance">
      <div
        className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center mb-3`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">
        {value}
      </div>
      <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
        {label}
      </div>
      {subtext && (
        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          {subtext}
        </div>
      )}
    </div>
  );
}

// Card de Linguagens
function LanguagesCard({ languages }) {
  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    "C++": "#f34b7d",
    Go: "#00ADD8",
    Rust: "#dea584",
    PHP: "#4F5D95",
  };

  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Code className="w-5 h-5" />
        Linguagens Mais Usadas
      </h3>

      <div className="space-y-3">
        {languages.map((lang, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: languageColors[lang.language] || "#6b7280",
                  }}
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {lang.language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {lang.count} repos
                </span>
                <span className="text-xs font-medium text-slate-900 dark:text-white">
                  {lang.percentage}%
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: languageColors[lang.language] || "#6b7280",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Card de Repositórios
function RepositoriesCard({ repositories }) {
  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <GitBranch className="w-5 h-5" />
        Repositórios Recentes
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {repositories.map((repo, index) => (
          <a
            key={index}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {repo.name}
              </h4>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
            </div>

            {repo.description && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>{repo.language}</span>
                </div>
              )}
              {repo.stars > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>{repo.stars}</span>
                </div>
              )}
              <div>
                Atualizado:{" "}
                {new Date(repo.updatedAt).toLocaleDateString("pt-BR")}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
