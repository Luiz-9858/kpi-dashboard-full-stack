// lib/github.js
// Integração com GitHub API para buscar commits, PRs, repos
// Username: Luiz-9858

const GITHUB_USERNAME = "Luiz-9858";
const GITHUB_API = "https://api.github.com";

/**
 * Busca eventos recentes do usuário (commits, PRs, issues)
 */
export async function getGitHubEvents(days = 7) {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/events?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events = await response.json();

    // Filtra eventos dos últimos N dias
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const recentEvents = events.filter((event) => {
      const eventDate = new Date(event.created_at);
      return eventDate >= cutoffDate;
    });

    return recentEvents;
  } catch (error) {
    console.error("[GitHub] Erro ao buscar eventos:", error);
    return [];
  }
}

/**
 * Conta commits por período
 */
export async function countCommits(days = 7) {
  const events = await getGitHubEvents(days);

  const pushEvents = events.filter((e) => e.type === "PushEvent");

  const totalCommits = pushEvents.reduce((sum, event) => {
    return sum + (event.payload.commits?.length || 0);
  }, 0);

  return {
    total: totalCommits,
    pushEvents: pushEvents.length,
    avgPerDay: (totalCommits / days).toFixed(1),
  };
}

/**
 * Lista Pull Requests criados
 */
export async function getPullRequests(days = 30) {
  const events = await getGitHubEvents(days);

  const prEvents = events.filter((e) => e.type === "PullRequestEvent");

  const prs = prEvents.map((event) => ({
    repo: event.repo.name,
    title: event.payload.pull_request.title,
    state: event.payload.pull_request.state,
    createdAt: event.created_at,
    url: event.payload.pull_request.html_url,
  }));

  return {
    total: prs.length,
    open: prs.filter((pr) => pr.state === "open").length,
    closed: prs.filter((pr) => pr.state === "closed").length,
    merged: prEvents.filter(
      (e) => e.payload.action === "closed" && e.payload.pull_request.merged,
    ).length,
    prs,
  };
}

/**
 * Busca repositórios do usuário
 */
export async function getRepositories() {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Filtra apenas repos não-fork e não-arquivados
    const activeRepos = repos.filter((repo) => !repo.fork && !repo.archived);

    return activeRepos.map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      url: repo.html_url,
      homepage: repo.homepage,
    }));
  } catch (error) {
    console.error("[GitHub] Erro ao buscar repositórios:", error);
    return [];
  }
}

/**
 * Estatísticas gerais do GitHub
 */
export async function getGitHubStats(days = 7) {
  try {
    const [commits, prs, repos] = await Promise.all([
      countCommits(days),
      getPullRequests(30), // PRs dos últimos 30 dias
      getRepositories(),
    ]);

    // Calcula repos ativos (atualizados nos últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeRepos = repos.filter((repo) => {
      const updatedAt = new Date(repo.updatedAt);
      return updatedAt >= thirtyDaysAgo;
    });

    return {
      commits: {
        total: commits.total,
        avgPerDay: parseFloat(commits.avgPerDay),
        period: `${days} dias`,
      },
      pullRequests: {
        total: prs.total,
        open: prs.open,
        merged: prs.merged,
        period: "30 dias",
      },
      repositories: {
        total: repos.length,
        active: activeRepos.length,
        languages: getTopLanguages(repos),
      },
    };
  } catch (error) {
    console.error("[GitHub] Erro ao buscar estatísticas:", error);
    return null;
  }
}

/**
 * Calcula linguagens mais usadas
 */
function getTopLanguages(repos) {
  const languageCounts = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  return Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([language, count]) => ({
      language,
      count,
      percentage: ((count / repos.length) * 100).toFixed(1),
    }));
}

/**
 * Busca streak de commits (dias consecutivos)
 */
export async function getCommitStreak() {
  const events = await getGitHubEvents(90); // Últimos 90 dias

  const pushEvents = events.filter((e) => e.type === "PushEvent");

  // Agrupa por data
  const commitDates = new Set();
  pushEvents.forEach((event) => {
    const date = new Date(event.created_at).toISOString().split("T")[0];
    commitDates.add(date);
  });

  // Ordena datas (mais recente primeiro)
  const sortedDates = Array.from(commitDates).sort((a, b) =>
    b.localeCompare(a),
  );

  if (sortedDates.length === 0) return 0;

  // Calcula streak
  let streak = 1;
  let currentDate = new Date(sortedDates[0]);

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i]);
    const diffDays = Math.floor(
      (currentDate - prevDate) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else if (diffDays > 1) {
      break;
    }
  }

  return streak;
}

/**
 * Gera dados para gráfico de commits (últimos 7 dias)
 */
export async function getCommitsChartData(days = 7) {
  const events = await getGitHubEvents(days);
  const pushEvents = events.filter((e) => e.type === "PushEvent");

  // Cria array de últimos N dias
  const chartData = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const commitsOnDate = pushEvents
      .filter((event) => {
        const eventDate = event.created_at.split("T")[0];
        return eventDate === dateStr;
      })
      .reduce((sum, event) => sum + (event.payload.commits?.length || 0), 0);

    chartData.push({
      date: dateStr,
      commits: commitsOnDate,
      label: date.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "numeric",
      }),
    });
  }

  return chartData;
}
