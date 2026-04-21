// components/InsightCard.js
// Componente para exibir insights, avisos e conquistas
// 100% RESPONSIVO

import { CheckCircle, AlertTriangle, Info, TrendingUp } from "lucide-react";

export default function InsightCard({ insight }) {
  const { type, title, description, icon, recommendation } = insight;

  // Configurações de estilo por tipo
  const typeConfig = {
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      icon: CheckCircle,
      iconColor: "text-green-600 dark:text-green-400",
      titleColor: "text-green-900 dark:text-green-100",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: AlertTriangle,
      iconColor: "text-yellow-600 dark:text-yellow-400",
      titleColor: "text-yellow-900 dark:text-yellow-100",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: Info,
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-900 dark:text-blue-100",
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <div
      className={`p-3 sm:p-4 rounded-lg border ${config.bg} ${config.border} hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Ícone */}
        <div className="flex-shrink-0 mt-0.5">
          {icon ? (
            <span className="text-xl sm:text-2xl">{icon}</span>
          ) : (
            <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
          )}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <h4
            className={`text-sm sm:text-base font-semibold ${config.titleColor} mb-1`}
          >
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {description}
          </p>

          {/* Recomendação (opcional) */}
          {recommendation && (
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-medium">💡 Dica:</span> {recommendation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente para exibir grid de insights
export function InsightsGrid({ insights }) {
  if (!insights || insights.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm sm:text-base">
          Nenhum insight disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
}

// Componente para Score Semanal
export function WeekScoreCard({ score }) {
  const { total, breakdown } = score;

  // Define cor baseada no score
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-blue-600 dark:text-blue-400";
    if (score >= 40) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return "S";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  return (
    <div className="card p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4">
        📊 Score da Semana
      </h3>

      {/* Score Total */}
      <div className="text-center mb-6">
        <div
          className={`text-5xl sm:text-6xl font-bold ${getScoreColor(total)}`}
        >
          {total}
        </div>
        <div className="text-lg sm:text-xl font-semibold text-slate-600 dark:text-slate-400 mt-2">
          Nota: {getScoreGrade(total)}
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <ScoreBar label="Horas" value={breakdown.hours} />
        <ScoreBar label="KPIs" value={breakdown.kpis} />
        <ScoreBar label="Tasks" value={breakdown.tasks} />
        <ScoreBar label="Streak" value={breakdown.streak} />
      </div>
    </div>
  );
}

// Barra de score individual
function ScoreBar({ label, value }) {
  const getBarColor = (value) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-blue-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {label}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
          {value}%
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getBarColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
