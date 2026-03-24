// lib/insights.js
// Funções para gerar insights e recomendações personalizadas

/**
 * Gera insights automáticos baseados nos dados da semana
 */
export function generateInsights(currentWeekData, previousWeekData = null) {
  const insights = [];
  const warnings = [];
  const achievements = [];

  // Análise de Horas Totais
  const totalHours = currentWeekData.quickStats.totalHoursWeek;
  const targetMin = 20;
  const targetMax = 23;

  if (totalHours >= targetMin && totalHours <= targetMax) {
    achievements.push({
      id: "hours-target",
      type: "success",
      title: "Meta de Horas Atingida! 🎯",
      description: `Você completou ${totalHours.toFixed(1)}h esta semana, dentro da meta de ${targetMin}-${targetMax}h.`,
      icon: "🎯",
    });
  } else if (totalHours > targetMax) {
    insights.push({
      id: "hours-above",
      type: "info",
      title: "Acima da Meta",
      description: `Você está ${(totalHours - targetMax).toFixed(1)}h acima da meta. Ótimo trabalho, mas cuidado com o burnout!`,
      icon: "⚡",
    });
  } else if (totalHours < targetMin * 0.8) {
    warnings.push({
      id: "hours-low",
      type: "warning",
      title: "Horas Abaixo da Meta",
      description: `Apenas ${totalHours.toFixed(1)}h de ${targetMin}h. Tente recuperar nos próximos dias!`,
      icon: "⚠️",
      recommendation: "Dedique pelo menos 3h por dia nos próximos dias.",
    });
  }

  // Análise de Streak
  const streak = currentWeekData.quickStats.streak;
  if (streak >= 7) {
    achievements.push({
      id: "streak-week",
      type: "success",
      title: `Streak de ${streak} Dias! 🔥`,
      description: "Você está mantendo consistência. Continue assim!",
      icon: "🔥",
    });
  } else if (streak >= 14) {
    achievements.push({
      id: "streak-two-weeks",
      type: "success",
      title: `Streak Incrível de ${streak} Dias! 🚀`,
      description: "Sua disciplina está em outro nível!",
      icon: "🚀",
    });
  } else if (streak < 3) {
    warnings.push({
      id: "streak-low",
      type: "warning",
      title: "Streak Baixo",
      description: `Apenas ${streak} dia(s). Estude hoje para não quebrar o ritmo!`,
      icon: "⏰",
      recommendation: "Reserve pelo menos 1h hoje para continuar o streak.",
    });
  }

  // Análise por Categoria (usando KPIs)
  const kpis = currentWeekData.kpis;

  // Prática
  if (kpis.productivity.praticaHours.status === "danger") {
    warnings.push({
      id: "pratica-low",
      type: "warning",
      title: "Prática Abaixo do Esperado",
      description: `Apenas ${kpis.productivity.praticaHours.value}h de código prático. Meta: ${kpis.productivity.praticaHours.target.min}-${kpis.productivity.praticaHours.target.max}h.`,
      icon: "💻",
      recommendation: "Dedique mais tempo a projetos práticos e exercícios.",
    });
  } else if (kpis.productivity.praticaHours.status === "success") {
    insights.push({
      id: "pratica-good",
      type: "success",
      title: "Prática em Dia! 💻",
      description: `${kpis.productivity.praticaHours.value}h de código prático esta semana.`,
      icon: "💻",
    });
  }

  // Teoria
  if (kpis.productivity.teoriaHours.status === "danger") {
    warnings.push({
      id: "teoria-low",
      type: "warning",
      title: "Teoria Abaixo do Esperado",
      description: `Apenas ${kpis.productivity.teoriaHours.value}h de estudo teórico. Meta: ${kpis.productivity.teoriaHours.target.min}-${kpis.productivity.teoriaHours.target.max}h.`,
      icon: "📚",
      recommendation:
        "Balance prática com teoria. Assista vídeos e leia documentação.",
    });
  }

  // Inglês
  if (kpis.productivity.inglesHours.status === "danger") {
    warnings.push({
      id: "ingles-low",
      type: "warning",
      title: "Inglês Precisa de Atenção",
      description: `Apenas ${kpis.productivity.inglesHours.value}h de inglês. Meta: ${kpis.productivity.inglesHours.target.min}-${kpis.productivity.inglesHours.target.max}h.`,
      icon: "🌍",
      recommendation: "Dedique pelo menos 30min por dia ao inglês.",
    });
  }

  // Análise de Tasks
  const tasksCompleted = currentWeekData.quickStats.tasksCompleted;
  const tasksTotal = currentWeekData.quickStats.tasksTotal;

  if (tasksTotal > 0) {
    const completionRate = (tasksCompleted / tasksTotal) * 100;

    if (completionRate >= 80) {
      achievements.push({
        id: "tasks-high",
        type: "success",
        title: "Alta Taxa de Conclusão! ✅",
        description: `${completionRate.toFixed(0)}% das tasks concluídas (${tasksCompleted}/${tasksTotal}).`,
        icon: "✅",
      });
    } else if (completionRate < 50) {
      warnings.push({
        id: "tasks-low",
        type: "warning",
        title: "Muitas Tasks Pendentes",
        description: `Apenas ${completionRate.toFixed(0)}% concluídas (${tasksCompleted}/${tasksTotal}).`,
        icon: "📋",
        recommendation:
          "Priorize as tasks mais importantes e reduza o backlog.",
      });
    }
  }

  // Comparação com Semana Anterior (se disponível)
  if (previousWeekData) {
    const previousHours = previousWeekData.quickStats.totalHoursWeek;
    const diff = totalHours - previousHours;

    if (diff > 0) {
      insights.push({
        id: "comparison-up",
        type: "info",
        title: "Evolução Positiva 📈",
        description: `Você estudou ${diff.toFixed(1)}h a mais que na semana passada.`,
        icon: "📈",
      });
    } else if (diff < -2) {
      warnings.push({
        id: "comparison-down",
        type: "warning",
        title: "Queda no Ritmo",
        description: `Você estudou ${Math.abs(diff).toFixed(1)}h a menos que na semana passada.`,
        icon: "📉",
        recommendation: "Identifique o que mudou e retome o ritmo anterior.",
      });
    }
  }

  return {
    insights,
    warnings,
    achievements,
    summary: {
      totalInsights: insights.length + warnings.length + achievements.length,
      successCount: achievements.length,
      warningCount: warnings.length,
      infoCount: insights.length,
    },
  };
}

/**
 * Calcula tendência (crescente, estável, decrescente)
 */
export function calculateTrend(currentValue, previousValue) {
  if (!previousValue || previousValue === 0) return "stable";

  const percentChange = ((currentValue - previousValue) / previousValue) * 100;

  if (percentChange > 5) return "up";
  if (percentChange < -5) return "down";
  return "stable";
}

/**
 * Gera recomendações baseadas nos KPIs
 */
export function generateRecommendations(kpis) {
  const recommendations = [];

  // Verifica cada categoria de KPI
  Object.entries(kpis).forEach(([category, categoryKpis]) => {
    if (category === "summary") return;

    Object.entries(categoryKpis).forEach(([kpiName, kpiData]) => {
      if (kpiData.status === "danger" || kpiData.status === "warning") {
        recommendations.push({
          category,
          kpi: kpiName,
          status: kpiData.status,
          value: kpiData.value,
          target: kpiData.target,
          message: getRecommendationMessage(category, kpiName, kpiData),
        });
      }
    });
  });

  return recommendations;
}

/**
 * Mensagens de recomendação personalizadas
 */
function getRecommendationMessage(category, kpiName, kpiData) {
  const messages = {
    productivity: {
      praticaHours:
        "Dedique mais tempo a projetos práticos. Tente fazer ao menos 2h por dia de código.",
      teoriaHours:
        "Balance prática com teoria. Assista vídeos técnicos ou leia documentação.",
      inglesHours:
        "30 minutos diários de inglês fazem diferença. Tente Method Callan + vídeos.",
      daysStudied:
        "Tente estudar todos os dias, mesmo que seja apenas 1h. Consistência importa!",
      streak: "Não deixe o streak quebrar! Reserve ao menos 1h hoje.",
    },
    practice: {
      features:
        "Foque em finalizar features existentes antes de começar novas.",
      bugs: "Reserve tempo para resolver bugs e melhorar a qualidade do código.",
      commits:
        "Commite com mais frequência. Pequenos commits diários são melhores.",
    },
    learning: {
      modules: "Complete pelo menos 1 módulo por dia do curso.",
      exercises: "Resolva exercícios diariamente para fixar conceitos.",
      concepts: "Documente novos conceitos aprendidos para melhor retenção.",
    },
    language: {
      lessons:
        "Não falte às aulas de Method Callan. 3 aulas por semana é o ideal.",
      worksheets: "Complete as worksheets para reforçar o aprendizado.",
    },
  };

  return messages[category]?.[kpiName] || "Continue se esforçando!";
}

/**
 * Calcula score geral da semana (0-100)
 */
export function calculateWeekScore(data) {
  const weights = {
    hours: 0.3, // 30% - Horas estudadas
    kpis: 0.4, // 40% - KPIs em "success"
    tasks: 0.2, // 20% - Tasks completadas
    streak: 0.1, // 10% - Streak
  };

  // Score de horas (0-100)
  const hoursScore = Math.min(100, (data.quickStats.totalHoursWeek / 23) * 100);

  // Score de KPIs (% em "success")
  const totalKpis = data.kpis.summary.total;
  const successKpis = data.kpis.summary.success;
  const kpisScore = (successKpis / totalKpis) * 100;

  // Score de tasks (% completadas)
  const tasksScore =
    data.quickStats.tasksTotal > 0
      ? (data.quickStats.tasksCompleted / data.quickStats.tasksTotal) * 100
      : 50;

  // Score de streak (7 dias = 100%)
  const streakScore = Math.min(100, (data.quickStats.streak / 7) * 100);

  // Calcula score total ponderado
  const totalScore =
    hoursScore * weights.hours +
    kpisScore * weights.kpis +
    tasksScore * weights.tasks +
    streakScore * weights.streak;

  return {
    total: Math.round(totalScore),
    breakdown: {
      hours: Math.round(hoursScore),
      kpis: Math.round(kpisScore),
      tasks: Math.round(tasksScore),
      streak: Math.round(streakScore),
    },
  };
}
