// lib/constants.js
// Constantes e configurações globais do projeto

// ============================================
// METAS DOS KPIs
// ============================================

export const KPI_TARGETS = {
  // Produtividade
  praticaHours: { min: 12, max: 15, unit: "h" },
  teoriaHours: { min: 5, max: 8, unit: "h" },
  inglesHours: { min: 3, max: 5, unit: "h" },
  totalHours: { min: 20, max: 23, unit: "h" },
  daysStudied: { min: 6, max: 7, unit: "" },
  streak: { min: 7, max: 999, unit: "dias" },

  // Prática
  commits: { min: 20, max: 30, unit: "" },
  features: { min: 3, max: 5, unit: "" },
  bugs: { min: 5, max: 8, unit: "" },
  prs: { min: 2, max: 4, unit: "" },
  projects: { min: 1, max: 2, unit: "" },

  // Aprendizado
  modules: { min: 3, max: 5, unit: "" },
  exercises: { min: 10, max: 15, unit: "" },
  concepts: { min: 2, max: 3, unit: "" },

  // Idioma
  lessons: { min: 3, max: 3, unit: "" },
  worksheets: { min: 2, max: 2, unit: "" },
};

// ============================================
// NOMES DOS KPIs
// ============================================

export const KPI_NAMES = {
  // Produtividade
  praticaHours: "Horas Prática",
  teoriaHours: "Horas Teoria",
  inglesHours: "Horas Inglês",
  totalHours: "Total Horas",
  daysStudied: "Dias Estudados",
  streak: "Streak",

  // Prática
  commits: "Commits GitHub",
  features: "Features Concluídas",
  bugs: "Bugs Resolvidos",
  prs: "Pull Requests",
  projects: "Projetos Finalizados",

  // Aprendizado
  modules: "Módulos Concluídos",
  exercises: "Exercícios Algoritmos",
  concepts: "Conceitos Dominados",

  // Idioma
  lessons: "Lições Method Callan",
  worksheets: "Worksheets",
};

// ============================================
// CATEGORIAS
// ============================================

export const CATEGORIES = {
  ESTUDOS: "Estudos",
  PROJETOS: "Projetos",
  IDIOMAS: "Idiomas",
  DESENVOLVIMENTO_PESSOAL: "Desenvolvimento Pessoal",
  OUTROS: "Outros",
};

export const CATEGORY_COLORS = {
  [CATEGORIES.ESTUDOS]: {
    light: "#3b82f6",
    dark: "#60a5fa",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  [CATEGORIES.PROJETOS]: {
    light: "#10b981",
    dark: "#34d399",
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
  },
  [CATEGORIES.IDIOMAS]: {
    light: "#f59e0b",
    dark: "#fbbf24",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
  },
  [CATEGORIES.DESENVOLVIMENTO_PESSOAL]: {
    light: "#8b5cf6",
    dark: "#a78bfa",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
  },
  [CATEGORIES.OUTROS]: {
    light: "#6b7280",
    dark: "#9ca3af",
    bg: "bg-slate-50 dark:bg-slate-900/20",
    text: "text-slate-600 dark:text-slate-400",
  },
};

// ============================================
// STATUS E PRIORIDADES
// ============================================

export const STATUS = {
  TODO: "A Fazer",
  IN_PROGRESS: "Fazendo",
  DONE: "Concluído",
  BLOCKED: "Bloqueado",
  PENDING: "Pendente",
};

export const PRIORITY = {
  HIGH: "Alta Prioridade",
  MEDIUM: "Média Prioridade",
  LOW: "Baixa Prioridade",
};

export const PRIORITY_COLORS = {
  [PRIORITY.HIGH]: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
  [PRIORITY.MEDIUM]: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-600 dark:text-yellow-400",
    dot: "bg-yellow-500",
  },
  [PRIORITY.LOW]: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
};

export const STATUS_COLORS = {
  [STATUS.TODO]: {
    bg: "bg-slate-50 dark:bg-slate-900/20",
    text: "text-slate-600 dark:text-slate-400",
  },
  [STATUS.IN_PROGRESS]: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  [STATUS.DONE]: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
  },
  [STATUS.BLOCKED]: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
  },
  [STATUS.PENDING]: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-600 dark:text-yellow-400",
  },
};

// ============================================
// OKRs (Q1 2026: Jan-Mar)
// ATUALIZADO: Agora com campo 'progress' em cada Key Result
// ============================================

export const OKRS_Q1_2026 = [
  {
    id: "okr-1",
    objective: "AutoPeças B77 em Produção",
    icon: "🚀",
    category: "Projeto",
    keyResults: [
      {
        id: "kr-1-1",
        description:
          "Finalizar features essenciais (Admin, Detalhes, Carrinho, Filtros)",
        target: "4 features",
        progress: 75, // ← ATUALIZE AQUI! (0-100)
      },
      {
        id: "kr-1-2",
        description: "Implementar autenticação e checkout completo",
        target: "100%",
        progress: 60, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-1-3",
        description: "Deploy em produção com domínio configurado",
        target: "1 deploy",
        progress: 0, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-1-4",
        description: "Testes E2E + Documentação GitHub completa",
        target: "70% cobertura",
        progress: 30, // ← ATUALIZE AQUI!
      },
    ],
  },
  {
    id: "okr-2",
    objective: "Evoluir como Full Stack",
    icon: "💻",
    category: "Aprendizado",
    keyResults: [
      {
        id: "kr-2-1",
        description: "Curso HashTag: avançar de 37% para 100%",
        target: "100% completo",
        progress: 45, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-2-2",
        description: "Resolver 120 exercícios de algoritmos",
        target: "120 exercícios",
        progress: 25, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-2-3",
        description: "Criar 1 projeto pessoal completo do zero",
        target: "1 projeto",
        progress: 50, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-2-4",
        description: "Contribuir com 3 pull requests open source",
        target: "3 PRs",
        progress: 0, // ← ATUALIZE AQUI!
      },
    ],
  },
  {
    id: "okr-3",
    objective: "Portfólio Profissional Completo",
    icon: "📁",
    category: "Carreira",
    keyResults: [
      {
        id: "kr-3-1",
        description: "Adicionar 2 projetos completos no portfólio",
        target: "2 projetos",
        progress: 50, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-3-2",
        description: "README detalhado em todos projetos GitHub",
        target: "100% projetos",
        progress: 40, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-3-3",
        description: "Publicar 1 artigo técnico (Medium/Dev.to)",
        target: "1 artigo",
        progress: 0, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-3-4",
        description: "LinkedIn otimizado + 8 posts técnicos",
        target: "8 posts",
        progress: 25, // ← ATUALIZE AQUI!
      },
    ],
  },
  {
    id: "okr-4",
    objective: "Inglês Técnico Avançado",
    icon: "🌐",
    category: "Idioma",
    keyResults: [
      {
        id: "kr-4-1",
        description: "Completar 36 lições Method Callan (3/semana)",
        target: "36 lições",
        progress: 33, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-4-2",
        description: "Ler e resumir 12 artigos técnicos em inglês",
        target: "12 artigos",
        progress: 25, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-4-3",
        description: "Assistir 12 vídeos técnicos sem legenda",
        target: "12 vídeos",
        progress: 17, // ← ATUALIZE AQUI!
      },
      {
        id: "kr-4-4",
        description: "Completar 24 worksheets Method Callan",
        target: "24 worksheets",
        progress: 30, // ← ATUALIZE AQUI!
      },
    ],
  },
];

// ============================================
// DISPONIBILIDADE SEMANAL
// ============================================

export const WEEKLY_SCHEDULE = {
  MONDAY: { day: "Segunda", hours: 1.5, note: "Inglês presencial 19:00-19:50" },
  TUESDAY: { day: "Terça", hours: 2.5, note: "Livre após 18:30" },
  WEDNESDAY: {
    day: "Quarta",
    hours: 1.5,
    note: "Inglês presencial 19:00-19:50",
  },
  THURSDAY: { day: "Quinta", hours: 2.5, note: "Livre após 18:30" },
  FRIDAY: { day: "Sexta", hours: 2.5, note: "Livre após 18:30" },
  SATURDAY: { day: "Sábado", hours: 5, note: "Fim de semana" },
  SUNDAY: { day: "Domingo", hours: 5, note: "Fim de semana" },
};

export const TOTAL_WEEKLY_HOURS = Object.values(WEEKLY_SCHEDULE).reduce(
  (sum, day) => sum + day.hours,
  0,
);

// ============================================
// CONFIGURAÇÕES DO DASHBOARD
// ============================================

export const DASHBOARD_CONFIG = {
  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
  CACHE_KEY: "kpi-dashboard-data",

  // Auto-refresh
  AUTO_REFRESH_INTERVAL: 60 * 1000, // 1 minuto
  AUTO_REFRESH_ENABLED: false, // Desabilitado por padrão

  // Paginação
  TASKS_PER_PAGE: 10,
  PROJECTS_PER_PAGE: 6,

  // Gráficos
  CHART_HEIGHT_DEFAULT: 300,
  CHART_HEIGHT_LARGE: 400,
  CHART_COLORS: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"],

  // Tema
  DEFAULT_THEME: "light", // 'light' ou 'dark'
};

// ============================================
// LINKS ÚTEIS
// ============================================

export const USEFUL_LINKS = {
  NOTION_WORKSPACE: "https://notion.so/",
  GITHUB_PROFILE: "https://github.com/",
  LINKEDIN: "https://linkedin.com/",
  PORTFOLIO: "#",
  DOCUMENTATION: "/docs",
};

// ============================================
// MENSAGENS
// ============================================

export const MESSAGES = {
  LOADING: {
    DEFAULT: "Carregando...",
    DASHBOARD: "Carregando seus dados...",
    KPIS: "Calculando KPIs...",
    OKRS: "Buscando OKRs...",
    PROJECTS: "Carregando projetos...",
  },
  ERROR: {
    DEFAULT: "Algo deu errado",
    NETWORK: "Erro de conexão. Verifique sua internet.",
    NOTION: "Erro ao conectar com Notion. Verifique configuração.",
    NOT_FOUND: "Dados não encontrados",
    UNAUTHORIZED: "Token do Notion inválido",
  },
  SUCCESS: {
    REFRESH: "Dados atualizados com sucesso!",
    CACHE_CLEARED: "Cache limpo!",
    COPIED: "Copiado para área de transferência!",
  },
  EMPTY: {
    TASKS: "Nenhuma task para hoje",
    PROJECTS: "Nenhum projeto ativo",
    DATA: "Adicione dados no Notion para vê-los aqui",
  },
};

// ============================================
// EMOJIS
// ============================================

export const EMOJIS = {
  // Status
  SUCCESS: "✅",
  WARNING: "⚠️",
  ERROR: "❌",
  INFO: "ℹ️",
  PENDING: "⏳",

  // Ações
  FIRE: "🔥",
  ROCKET: "🚀",
  TARGET: "🎯",
  TROPHY: "🏆",
  STAR: "⭐",

  // Categorias
  CODE: "💻",
  BOOK: "📚",
  GLOBE: "🌐",
  CHART: "📊",
  CALENDAR: "📅",

  // Outros
  WAVE: "👋",
  CELEBRATE: "🎉",
  THINKING: "🤔",
  THUMB_UP: "👍",
};

// ============================================
// REGEX PATTERNS
// ============================================

export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  NOTION_PAGE_ID: /^[a-f0-9]{32}$/,
  GITHUB_USERNAME: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
};

// ============================================
// BREAKPOINTS (Tailwind)
// ============================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
};

// ============================================
// EXPORTS AGRUPADOS
// ============================================

export default {
  KPI_TARGETS,
  KPI_NAMES,
  CATEGORIES,
  CATEGORY_COLORS,
  STATUS,
  PRIORITY,
  OKRS_Q1_2026,
  WEEKLY_SCHEDULE,
  DASHBOARD_CONFIG,
  USEFUL_LINKS,
  MESSAGES,
  EMOJIS,
  PATTERNS,
  BREAKPOINTS,
};
