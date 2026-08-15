// components/KPICard.js
// Componente para exibir um KPI individual com status visual
//  COM ANIMAÇÕES NATIVAS

import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react";

export default function KPICard({ kpi }) {
  const {
    title,
    value,
    target,
    status,
    unit = "",
    icon: Icon,
    trend = null,
    trendValue = null,
  } = kpi;

  // Define cores baseado no status
  const statusColors = {
    success: {
      badge: "status-success",
      progress: "progress-success",
      icon: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/10",
    },
    warning: {
      badge: "status-warning",
      progress: "progress-warning",
      icon: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/10",
    },
    danger: {
      badge: "status-danger",
      progress: "progress-danger",
      icon: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/10",
    },
    pending: {
      badge: "status-info",
      progress: "bg-slate-300 dark:bg-slate-600",
      icon: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-50 dark:bg-slate-900/10",
    },
  };

  const colors = statusColors[status] || statusColors.pending;

  // Calcula porcentagem de progresso
  const calculateProgress = () => {
    if (!target) return 0;
    const { min, max } = target;

    // Se min e max são iguais (ex: 7-7)
    if (min === max) {
      return value >= max ? 100 : (value / max) * 100;
    }

    // Se min é 0 (ex: 0-2) - OPÇÃO B: estar dentro da meta = 100%
    if (min === 0) {
      if (value >= 0 && value <= max) return 100; // Dentro da meta = 100%
      if (value > max) return 100 + ((value - max) / max) * 50; // Acima da meta
      return 0; // Não deveria acontecer (valor negativo)
    }

    // Cálculo normal
    if (value >= max) return 100;
    if (value <= min) return (value / min) * 50;
    const range = max - min;
    const progress = ((value - min) / range) * 50 + 50;
    return Math.min(100, Math.max(0, progress));
  };

  const progress = calculateProgress();

  // Ícone de tendência
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
        ? "text-red-600"
        : "text-slate-400";

  // Label de status
  const statusLabels = {
    success: "🟢 Ótimo",
    warning: "🟡 Atenção",
    danger: "🔴 Baixo",
    pending: "⏳ Aguardando",
  };

  return (
    <div className="kpi-card group transition-all duration-300">
      {/* Header com ícone e status */}
      <div className="kpi-card-header">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {Icon && (
            <div
              className={`p-2 rounded-lg ${colors.bg} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`w-5 h-5 ${colors.icon}`} />
            </div>
          )}
          <span className="kpi-card-title truncate">{title}</span>
        </div>
        <span className={`status-badge ${colors.badge} flex-shrink-0 ml-2`}>
          {statusLabels[status]}
        </span>
      </div>

      {/* Valor principal */}
      <div className="flex items-baseline gap-2 mt-3">
        <span className="kpi-card-value">
          {value}
          <span className="text-lg font-normal text-slate-500 dark:text-slate-400 ml-1">
            {unit}
          </span>
        </span>

        {/* Tendência (se houver) */}
        {trend && trendValue && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}
          >
            <TrendIcon className="w-4 h-4" />
            <span>
              {trendValue > 0 ? "+" : ""}
              {trendValue}
              {unit}
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      {target && (
        <div className="flex items-center gap-1 kpi-card-target mt-2">
          <Target className="w-3 h-3" />
          <span>
            Meta:{" "}
            {target.min === target.max
              ? `${target.min}${unit}`
              : `${target.min}-${target.max}${unit}`}
          </span>
        </div>
      )}

      {/* Barra de progresso COM ANIMAÇÃO */}
      <div className="progress-bar mt-3">
        <div
          className={`progress-bar-fill ${colors.progress} transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-right">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
