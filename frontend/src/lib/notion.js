// lib/notion.js
// Serviço de conexão e consulta ao Notion
// ATUALIZADO: Incluindo funções para OKRs e Key Results

import { Client } from "@notionhq/client";

// Inicializa cliente Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// IDs das databases
const DATABASE_IDS = {
  todayTasks: process.env.NOTION_DB_TODAY_TASKS,
  hoursWeek: process.env.NOTION_DB_HOURS_WEEK,
  hourTracker: process.env.NOTION_DB_HOUR_TRACKER,
  taskPanel: process.env.NOTION_DB_TASK_PANEL,
  activeProjects: process.env.NOTION_DB_ACTIVE_PROJECTS,
  roadmap: process.env.NOTION_DB_ROADMAP,
  // NOVOS: OKRs
  okrs: process.env.NOTION_DB_OKRS,
  keyResults: process.env.NOTION_DB_KEY_RESULTS,
};

/**
 * Busca todas as entries de uma database
 */
export async function queryDatabase(databaseId, filter = {}, sorts = []) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: Object.keys(filter).length > 0 ? filter : undefined,
      sorts: sorts.length > 0 ? sorts : undefined,
    });
    return response.results;
  } catch (error) {
    console.error("Erro ao consultar database:", error);
    throw error;
  }
}

// ========================================
// DATABASES ORIGINAIS (6)
// ========================================

/**
 * Busca tarefas de hoje (Today's Tasks)
 */
export async function getTodayTasks() {
  const results = await queryDatabase(DATABASE_IDS.todayTasks, {}, [
    { property: "Priority Level", direction: "ascending" },
  ]);

  return results.map((page) => ({
    id: page.id,
    name: page.properties.Name?.title[0]?.plain_text || "Sem título",
    priority:
      page.properties["Priority Level"]?.select?.name || "Sem prioridade",
    estimatedTime: page.properties["Estimated Time"]?.number || 0,
    status:
      page.properties.Status?.status?.name ||
      page.properties.Status?.select?.name ||
      "A Fazer",
    description: page.properties.Description?.rich_text[0]?.plain_text || "",
  }));
}

/**
 * Busca horas da semana (Hours This Week)
 */
export async function getHoursThisWeek() {
  const results = await queryDatabase(DATABASE_IDS.hoursWeek);

  return results.map((page) => ({
    id: page.id,
    activity:
      page.properties["Time dedicated during the week🤖"]?.title[0]
        ?.plain_text || "Sem nome",
    category: page.properties.Category?.select?.name || "Sem categoria",
    hoursPlanned: page.properties["Horas Plan."]?.number || 0,
    hoursReal: page.properties["Horas Real."]?.number || 0,
    status: page.properties.Status?.status?.name || "A iniciar",
    description: page.properties.Description?.url || "",
  }));
}

/**
 * Busca histórico de horas (Hour Tracker)
 * CORRIGIDO: Usa nomes com emojis
 */
export async function getHourTracker(startDate = null, endDate = null) {
  let filter = {};

  if (startDate && endDate) {
    filter = {
      and: [
        {
          property: "📅 Date",
          date: {
            on_or_after: startDate,
          },
        },
        {
          property: "📅 Date",
          date: {
            on_or_before: endDate,
          },
        },
      ],
    };
  }

  const results = await queryDatabase(DATABASE_IDS.hourTracker, filter);

  return results.map((page) => ({
    id: page.id,
    activity:
      page.properties["📋 Activity"]?.rich_text[0]?.plain_text ||
      page.properties["📝 Prohibited"]?.title[0]?.plain_text ||
      "Sem nome",
    category: page.properties["📂 Category"]?.select?.name || "Sem categoria",
    project: page.properties["💼 Project"]?.select?.name || "Sem projeto",
    date: page.properties["📅 Date"]?.date?.start || null,
    hours: page.properties["⏱️ Hours"]?.number || 0,
    description: page.properties["📋 Activity"]?.rich_text[0]?.plain_text || "",
  }));
}

/**
 * Busca tarefas do painel (Task Panel)
 */
export async function getTaskPanel() {
  const results = await queryDatabase(DATABASE_IDS.taskPanel);

  return results.map((page) => ({
    id: page.id,
    task: page.properties.Task?.title[0]?.plain_text || "Sem nome",
    category: page.properties.Category?.select?.name || "Sem categoria",
    priority: page.properties.Priority?.select?.name || "Sem prioridade",
    status: page.properties.Status?.select?.name || "No Status",
    estimatedTime: page.properties["Estimated Time"]?.number || 0,
    realTime: page.properties["Real Time"]?.number || 0,
    progress: page.properties.Progress?.select?.name || "0%",
  }));
}

/**
 * Busca projetos ativos (Active Projects)
 * CORRIGIDO: Nome correto da coluna e tipo status
 */
export async function getActiveProjects() {
  const results = await queryDatabase(DATABASE_IDS.activeProjects);

  return results.map((page) => ({
    id: page.id,
    name:
      page.properties["Projetos Ativos (4-8 meses)"]?.title[0]?.plain_text ||
      "Sem nome",
    status: page.properties.Status?.status?.name || "Sem status",
    priority: page.properties.Prioridade?.select?.name || "Sem prioridade",
    progress: page.properties.Progresso?.select?.name || "0%",
    category: page.properties.Categoria?.select?.name || "Sem categoria",
  }));
}

/**
 * Busca roadmap anual (12-Month Roadmap)
 */
export async function getRoadmap() {
  const results = await queryDatabase(DATABASE_IDS.roadmap);

  return results.map((page) => ({
    id: page.id,
    name:
      page.properties["Projetos do ano de 2026"]?.title[0]?.plain_text ||
      "Sem nome",
    date: page.properties.Date?.date?.start || null,
    category: page.properties.Categoria?.select?.name || "Sem categoria",
    status: page.properties.Status?.select?.name || "Sem status",
    priority: page.properties.Prioridade?.select?.name || "Sem prioridade",
    description: page.properties["Descrição"]?.rich_text[0]?.plain_text || "",
  }));
}

// ========================================
// NOVAS FUNÇÕES: OKRs (2 databases)
// ========================================

/**
 * Busca OKRs (Objetivos)
 * @param {string} quarter - Quarter para filtrar (ex: 'Q1 2026')
 */
export async function getOKRs(quarter = "Q1 2026") {
  // TEMPORÁRIO: SEM FILTRO PARA DEBUG
  const results = await queryDatabase(DATABASE_IDS.okrs);

  console.log("[getOKRs] Total encontrado:", results.length);

  // ADICIONE ISSO TEMPORARIAMENTE:
  if (results.length > 0) {
    console.log(
      "[DEBUG] Propriedades do primeiro KR:",
      Object.keys(results[0].properties),
    );
  }

  return results.map((page) => ({
    id: page.id,
    objective:
      page.properties.Objective?.title[0]?.plain_text || "Sem objetivo",
    icon: page.properties.Icon?.rich_text[0]?.plain_text || "📊",
    quarter: page.properties.Quarter?.select?.name || quarter,
    category: page.properties.Category?.select?.name || "Sem categoria",
    status: page.properties.Status?.select?.name || "Em Andamento",
    description: page.properties.Description?.rich_text[0]?.plain_text || "",
  }));
}

/**
 * Busca Key Results
 * @param {string} quarter - Quarter para filtrar (ex: 'Q1 2026')
 */
export async function getKeyResults(quarter = "Q1 2026") {
  // TEMPORÁRIO: SEM FILTRO PARA DEBUG
  const results = await queryDatabase(DATABASE_IDS.keyResults);

  console.log("[getKeyResults] Total encontrado:", results.length);

  return results.map((page) => {
    // Pega a relação com OKR
    const okrRelation = page.properties.OKR?.relation || [];
    const okrId = okrRelation[0]?.id || null;

    console.log(
      "[getKeyResults] KR:",
      page.properties["Key Result"]?.title[0]?.plain_text,
      "-> OKR ID:",
      okrId,
    );

    return {
      id: page.id,
      keyResult:
        page.properties["Key Result"]?.title[0]?.plain_text || "Sem KR",
      okrId, // ID do OKR relacionado
      progress: page.properties.Progress?.number || 0,
      target: page.properties.Target?.rich_text[0]?.plain_text || "100%",
      status: page.properties.Status?.select?.name || "Em Andamento",
      quarter: page.properties.Quarter?.select?.name || quarter,
    };
  });
}

/**
 * Busca OKRs completos com seus Key Results
 * @param {string} quarter - Quarter para filtrar
 */
export async function getOKRsWithKeyResults(quarter = "Q1 2026") {
  // Busca OKRs e KRs em paralelo
  const [okrs, keyResults] = await Promise.all([
    getOKRs(quarter),
    getKeyResults(quarter),
  ]);

  // Agrupa KRs por OKR e calcula progresso médio
  const okrsWithKRs = okrs.map((okr) => {
    // Filtra os KRs que pertencem a este OKR
    const krs = keyResults.filter((kr) => kr.okrId === okr.id);

    // Calcula progresso médio do OKR (média dos KRs)
    const totalProgress = krs.reduce((sum, kr) => sum + (kr.progress || 0), 0);
    const avgProgress =
      krs.length > 0 ? Math.round(totalProgress / krs.length) : 0;

    return {
      ...okr,
      keyResults: krs,
      progress: avgProgress, // Progresso calculado automaticamente!
      totalKRs: krs.length,
    };
  });

  return okrsWithKRs;
}

export default notion;
