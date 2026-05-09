// lib/github.js
// Integração com GitHub API - VERSÃO SIMPLIFICADA
// Correção de fuso horário GMT-3 (Brasil) - SIMPLIFICADO
// Username: Luiz-9858

const GITHUB_USERNAME = "Luiz-9858";
const GITHUB_API = "https://api.github.com";

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
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
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
      defaultBranch: repo.default_branch,
    }));
  } catch (error) {
    console.error("[GitHub] Erro ao buscar repositórios:", error);
    return [];
  }
}

/**
 * Busca commits de um repositório específico (últimos N dias)
 */
async function getRepoCommits(repoFullName, days = 7) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceISO = since.toISOString();

    const response = await fetch(
      `${GITHUB_API}/repos/${repoFullName}/commits?author=${GITHUB_USERNAME}&since=${sinceISO}&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    );

    if (!response.ok) {
      // Se repo está vazio ou sem acesso, retorna array vazio
      if (response.status === 409 || response.status === 404) {
        return [];
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commits = await response.json();
    return commits;
  } catch (error) {
    console.error(
      `[GitHub] Erro ao buscar commits de ${repoFullName}:`,
      error.message,
    );
    return [];
  }
}

/**
 * Conta commits totais dos últimos N dias (de todos os repos)
 */
export async function countCommits(days = 7) {
  try {
    const repos = await getRepositories();

    if (repos.length === 0) {
      console.log("[GitHub] Nenhum repositório encontrado");
      return { total: 0, avgPerDay: "0.0", reposChecked: 0 };
    }

    // BUSCA DE TODOS OS REPOS ATIVOS (não limita a 10!)
    console.log(`[GitHub] Buscando commits de ${repos.length} repositórios...`);

    const commitsPromises = repos.map((repo) =>
      getRepoCommits(repo.fullName, days),
    );

    const commitsArrays = await Promise.all(commitsPromises);

    // Conta total de commits
    const totalCommits = commitsArrays.reduce(
      (sum, commits) => sum + commits.length,
      0,
    );

    console.log(
      `[GitHub] Total de commits encontrados: ${totalCommits} (de ${repos.length} repos)`,
    );

    return {
      total: totalCommits,
      avgPerDay: (totalCommits / days).toFixed(1),
      reposChecked: repos.length,
    };
  } catch (error) {
    console.error("[GitHub] Erro ao contar commits:", error);
    return {
      total: 0,
      avgPerDay: "0.0",
      reposChecked: 0,
    };
  }
}

/**
 * Gera dados para gráfico de commits (últimos N dias)
 * CORRIGIDO: Aplica offset de -3h (GMT-3) ao agrupar commits por dia
 */
export async function getCommitsChartData(days = 7) {
  try {
    const repos = await getRepositories();

    if (repos.length === 0) {
      console.log("[GitHub] Nenhum repositório para gráfico");
      return createEmptyChartData(days);
    }

    // BUSCA DE TODOS OS REPOS ATIVOS (não limita a 10!)
    console.log(`[GitHub] Buscando commits de ${repos.length} repositórios...`);

    // Busca commits de TODOS os repos
    const commitsPromises = repos.map((repo) =>
      getRepoCommits(repo.fullName, days),
    );

    const commitsArrays = await Promise.all(commitsPromises);
    const allCommits = commitsArrays.flat();

    console.log(
      `[GitHub] Total de commits para gráfico: ${allCommits.length} (de ${repos.length} repos)`,
    );

    // Cria array de últimos N dias
    const chartData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Zera horário para comparação apenas de data
      date.setHours(0, 0, 0, 0);
      const dateStr = date.toISOString().split("T")[0];

      // Conta commits neste dia (aplicando offset GMT-3)
      const commitsOnDate = allCommits.filter((commit) => {
        // Pega data UTC do commit
        const commitDateUTC = new Date(commit.commit.author.date);

        // Aplica offset de -3 horas (GMT-3)
        const commitDateBR = new Date(
          commitDateUTC.getTime() - 3 * 60 * 60 * 1000,
        );

        // Zera horário
        commitDateBR.setHours(0, 0, 0, 0);

        // Compara datas
        return commitDateBR.getTime() === date.getTime();
      }).length;

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
  } catch (error) {
    console.error("[GitHub] Erro ao gerar dados do gráfico:", error);
    return createEmptyChartData(days);
  }
}

/**
 * Cria array vazio para gráfico (fallback)
 */
function createEmptyChartData(days = 7) {
  const emptyData = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    emptyData.push({
      date: date.toISOString().split("T")[0],
      commits: 0,
      label: date.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "numeric",
      }),
    });
  }
  return emptyData;
}

/**
 * Busca Pull Requests (usando API de search)
 */
export async function getPullRequests(days = 30) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceStr = since.toISOString().split("T")[0];

    // Busca PRs criados pelo usuário
    const response = await fetch(
      `${GITHUB_API}/search/issues?q=author:${GITHUB_USERNAME}+type:pr+created:>=${sinceStr}&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const result = await response.json();
    const prs = result.items || [];

    return {
      total: prs.length,
      open: prs.filter((pr) => pr.state === "open").length,
      closed: prs.filter((pr) => pr.state === "closed").length,
      merged: prs.filter((pr) => pr.pull_request?.merged_at).length,
      prs: prs.map((pr) => ({
        title: pr.title,
        state: pr.state,
        createdAt: pr.created_at,
        url: pr.html_url,
      })),
    };
  } catch (error) {
    console.error("[GitHub] Erro ao buscar PRs:", error);
    return {
      total: 0,
      open: 0,
      closed: 0,
      merged: 0,
      prs: [],
    };
  }
}

/**
 * Calcula streak de commits (dias consecutivos)
 * CORRIGIDO: Aplica offset GMT-3 antes de calcular
 */
export async function getCommitStreak() {
  try {
    const repos = await getRepositories();

    if (repos.length === 0) return 0;

    // BUSCA DE TODOS OS REPOS (não limita!)
    console.log(
      `[GitHub] Calculando streak de ${repos.length} repositórios...`,
    );

    // Busca commits dos últimos 90 dias
    const commitsPromises = repos.map((repo) =>
      getRepoCommits(repo.fullName, 90),
    );

    const commitsArrays = await Promise.all(commitsPromises);
    const allCommits = commitsArrays.flat();

    if (allCommits.length === 0) return 0;

    // Agrupa commits por data (aplicando offset GMT-3)
    const commitDates = new Set();
    allCommits.forEach((commit) => {
      // Pega data UTC
      const dateUTC = new Date(commit.commit.author.date);

      // Aplica offset de -3h
      const dateBR = new Date(dateUTC.getTime() - 3 * 60 * 60 * 1000);

      // Extrai apenas a data
      const dateStr = dateBR.toISOString().split("T")[0];
      commitDates.add(dateStr);
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
  } catch (error) {
    console.error("[GitHub] Erro ao calcular streak:", error);
    return 0;
  }
}

/**
 * Estatísticas gerais do GitHub
 */
export async function getGitHubStats(days = 7) {
  try {
    const [commits, prs, repos] = await Promise.all([
      countCommits(days),
      getPullRequests(30),
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
