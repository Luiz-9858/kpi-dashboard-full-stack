// lib/notifications.js
// Lógica de geração de notificações baseado em dados do dashboard

/**
 * Gera notificações baseado nos dados do dashboard
 * @param {Object} dashboardData - Dados do dashboard
 * @returns {Array} Array de notificações
 */
export function generateNotifications(dashboardData) {
  const notifications = [];
  const timestamp = new Date().toISOString();

  if (!dashboardData) return notifications;

  const { kpis, quickStats, okrs, weeklyProgress } = dashboardData;

  // ========== 1. ALERTAS DE KPIs BAIXOS ==========
  if (kpis) {
    const kpiCategories = ["productivity", "practice", "learning", "language"];

    kpiCategories.forEach((category) => {
      if (kpis[category]) {
        Object.entries(kpis[category]).forEach(([key, kpiData]) => {
          if (
            kpiData &&
            typeof kpiData === "object" &&
            kpiData.status === "danger"
          ) {
            const label = formatKPILabel(key);
            const value = kpiData.value || 0;
            const target = kpiData.target?.max || 0;

            notifications.push({
              id: `kpi-danger-${category}-${key}`,
              type: "alert",
              severity: "danger",
              icon: "⚠️",
              title: `${label} está baixo`,
              message: `${value} de ${target} esperado. Aumente seus esforços!`,
              category: "kpi",
              timestamp,
              dismissible: true,
              actionUrl: "/",
            });
          }
        });
      }
    });
  }

  // ========== 2. AVISOS DE KPIs MÉDIOS ==========
  if (kpis) {
    const kpiCategories = ["productivity", "practice", "learning", "language"];

    kpiCategories.forEach((category) => {
      if (kpis[category]) {
        Object.entries(kpis[category]).forEach(([key, kpiData]) => {
          if (
            kpiData &&
            typeof kpiData === "object" &&
            kpiData.status === "warning"
          ) {
            const label = formatKPILabel(key);
            const value = kpiData.value || 0;
            const target = kpiData.target?.max || 0;

            notifications.push({
              id: `kpi-warning-${category}-${key}`,
              type: "warning",
              severity: "warning",
              icon: "⚡",
              title: `${label} precisa de atenção`,
              message: `${value} de ${target}. Mais um pouco para atingir a meta!`,
              category: "kpi",
              timestamp,
              dismissible: true,
              actionUrl: "/",
            });
          }
        });
      }
    });
  }

  // ========== 3. SUCESSOS E CELEBRAÇÕES ==========

  // 3.1 - Tasks completadas hoje
  if (quickStats?.tasksCompleted > 0) {
    notifications.push({
      id: "celebration-tasks",
      type: "success",
      severity: "success",
      icon: "🎉",
      title: "Parabéns!",
      message: `Você completou ${quickStats.tasksCompleted} task${quickStats.tasksCompleted > 1 ? "s" : ""} hoje!`,
      category: "celebration",
      timestamp,
      dismissible: true,
      actionUrl: "/",
    });
  }

  // 3.2 - Horas altas atingidas
  if (quickStats?.totalHoursWeek >= 20) {
    notifications.push({
      id: "celebration-hours",
      type: "success",
      severity: "success",
      icon: "🏆",
      title: "Semana incrível!",
      message: `Você acumulou ${quickStats.totalHoursWeek}h esta semana. Excelente dedicação!`,
      category: "celebration",
      timestamp,
      dismissible: true,
      actionUrl: "/relatorios",
    });
  }

  // 3.3 - Streak ativo
  if (quickStats?.streak >= 7) {
    notifications.push({
      id: "celebration-streak",
      type: "success",
      severity: "success",
      icon: "🔥",
      title: `Streak de ${quickStats.streak} dias!`,
      message: "Você está em uma sequência incrível. Continue assim!",
      category: "celebration",
      timestamp,
      dismissible: true,
      actionUrl: "/",
    });
  }

  // ========== 4. ALERTAS DE PROGRESSO SEMANAL ==========
  if (weeklyProgress) {
    if (weeklyProgress.status === "danger") {
      notifications.push({
        id: "progress-danger",
        type: "alert",
        severity: "danger",
        icon: "📉",
        title: "Progresso abaixo do esperado",
        message: `Você atingiu apenas ${weeklyProgress.percentage}% da meta semanal.`,
        category: "progress",
        timestamp,
        dismissible: true,
        actionUrl: "/",
      });
    } else if (weeklyProgress.status === "warning") {
      notifications.push({
        id: "progress-warning",
        type: "warning",
        severity: "warning",
        icon: "📊",
        title: "Progresso no limite",
        message: `Você atingiu ${weeklyProgress.percentage}% da meta semanal. Mais um pouco!`,
        category: "progress",
        timestamp,
        dismissible: true,
        actionUrl: "/",
      });
    }
  }

  // ========== 5. INFORMAÇÕES DE OKRs ==========
  if (okrs && okrs.length > 0) {
    okrs.forEach((okr) => {
      // 5.1 - OKRs próximos de vencer
      const progress = okr.progress || 0;

      if (progress === 100) {
        notifications.push({
          id: `okr-complete-${okr.id}`,
          type: "success",
          severity: "success",
          icon: "✅",
          title: "OKR completado!",
          message: `${okr.objective} foi alcançado com sucesso!`,
          category: "okr",
          timestamp,
          dismissible: true,
          actionUrl: "/okrs",
        });
      } else if (progress >= 80) {
        notifications.push({
          id: `okr-finishing-${okr.id}`,
          type: "info",
          severity: "info",
          icon: "🎯",
          title: "OKR quase completo!",
          message: `${okr.objective} está com ${progress}% de progresso.`,
          category: "okr",
          timestamp,
          dismissible: true,
          actionUrl: "/okrs",
        });
      }
    });
  }

  // ========== 6. DICAS E RECOMENDAÇÕES ==========

  // 6.1 - Dica se muitos KPIs estão baixos
  if (kpis) {
    const dangerCount = countByStatus(kpis, "danger");
    if (dangerCount > 5) {
      notifications.push({
        id: "tip-many-low",
        type: "info",
        severity: "info",
        icon: "💡",
        title: "Dica: Priorize!",
        message: `Você tem ${dangerCount} KPIs baixos. Escolha os 3 mais importantes e foque neles.`,
        category: "tip",
        timestamp,
        dismissible: true,
      });
    }
  }

  // ========== 7. NOTIFICAÇÕES RECORRENTES ==========
  // (Apenas uma vez por dia)

  const today = new Date().toDateString();
  const lastDailyTip = localStorage.getItem("lastDailyTip");

  if (lastDailyTip !== today) {
    notifications.push({
      id: "daily-motivation",
      type: "info",
      severity: "info",
      icon: "✨",
      title: "Motivação do dia",
      message:
        "Pequenos passos consistentes levam a grandes resultados. Você está no caminho certo!",
      category: "motivation",
      timestamp,
      dismissible: true,
    });

    localStorage.setItem("lastDailyTip", today);
  }

  // ========== ORDENAR POR PRIORIDADE ==========
  const priorityOrder = {
    danger: 1,
    warning: 2,
    info: 3,
    success: 4,
  };

  notifications.sort(
    (a, b) => priorityOrder[a.severity] - priorityOrder[b.severity],
  );

  return notifications;
}

/**
 * Formata label do KPI para exibição
 * @param {string} key - Chave do KPI
 * @returns {string} Label formatado
 */
function formatKPILabel(key) {
  const labels = {
    praticaHours: "Horas Prática",
    teoriaHours: "Horas Teoria",
    inglesHours: "Horas Inglês",
    totalHours: "Total de Horas",
    daysStudied: "Dias Estudados",
    streak: "Streak",
    commits: "Commits",
    features: "Features",
    bugs: "Bugs",
    prs: "Pull Requests",
    projects: "Projetos",
    modules: "Módulos",
    exercises: "Exercícios",
    concepts: "Conceitos",
    lessons: "Lições Inglês",
    worksheets: "Worksheets",
  };

  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Conta quantos KPIs têm um status específico
 * @param {Object} kpis - Objeto de KPIs
 * @param {string} status - Status para contar
 * @returns {number} Contagem
 */
function countByStatus(kpis, status) {
  let count = 0;

  Object.values(kpis).forEach((category) => {
    if (category && typeof category === "object") {
      Object.values(category).forEach((kpi) => {
        if (kpi && kpi.status === status) {
          count++;
        }
      });
    }
  });

  return count;
}

/**
 * Filtra notificações por tipo
 * @param {Array} notifications - Array de notificações
 * @param {string} type - Tipo para filtrar
 * @returns {Array} Notificações filtradas
 */
export function filterNotifications(notifications, type) {
  if (!type) return notifications;
  return notifications.filter((n) => n.type === type);
}

/**
 * Obtém contagem por severidade
 * @param {Array} notifications - Array de notificações
 * @returns {Object} Contagem por severidade
 */
export function getNotificationStats(notifications) {
  const stats = {
    total: notifications.length,
    danger: 0,
    warning: 0,
    info: 0,
    success: 0,
  };

  notifications.forEach((n) => {
    if (stats.hasOwnProperty(n.severity)) {
      stats[n.severity]++;
    }
  });

  return stats;
}
