// components/StatsCard.js
// Cards de estatísticas rápidas para o topo do dashboard

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatsCard({ stat }) {
  const {
    title,
    value,
    subtitle,
    icon: Icon,
    trend = null, // 'up', 'down', 'stable'
    trendValue = null,
    trendLabel = '',
    color = 'blue', // 'blue', 'green', 'orange', 'purple', 'red'
    onClick = null,
  } = stat;

  // Define cores baseado no tipo
  const colorSchemes = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-600 to-blue-500',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      icon: 'text-green-600 dark:text-green-400',
      gradient: 'from-green-600 to-green-500',
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      icon: 'text-orange-600 dark:text-orange-400',
      gradient: 'from-orange-600 to-orange-500',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      icon: 'text-purple-600 dark:text-purple-400',
      gradient: 'from-purple-600 to-purple-500',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'text-red-600 dark:text-red-400',
      gradient: 'from-red-600 to-red-500',
    },
  };

  const colors = colorSchemes[color] || colorSchemes.blue;

  // Ícone de tendência
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = 
    trend === 'up' ? 'text-green-600 dark:text-green-400' : 
    trend === 'down' ? 'text-red-600 dark:text-red-400' : 
    'text-slate-400 dark:text-slate-500';

  return (
    <div 
      className={`card group hover:shadow-medium transition-all ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Header com ícone */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {title}
          </p>
          
          {/* Valor principal */}
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              {value}
            </h3>
            
            {/* Tendência */}
            {trend && trendValue !== null && (
              <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
                <TrendIcon className="w-4 h-4" />
                <span>{trendValue > 0 ? '+' : ''}{trendValue}</span>
              </div>
            )}
          </div>

          {/* Subtitle ou tendência label */}
          {(subtitle || trendLabel) && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {trendLabel || subtitle}
            </p>
          )}
        </div>

        {/* Ícone */}
        {Icon && (
          <div className={`p-3 rounded-xl ${colors.bg} group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
        )}
      </div>
    </div>
  );
}

// Variação com gradiente de fundo
export function StatsCardGradient({ stat }) {
  const {
    title,
    value,
    subtitle,
    icon: Icon,
    gradient = 'from-blue-600 to-purple-600',
  } = stat;

  return (
    <div className={`card bg-gradient-to-br ${gradient} text-white hover:shadow-strong transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-white/80 mb-1">
            {title}
          </p>
          <h3 className="text-4xl font-bold text-white mb-2">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-white/70">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}

// Variação compacta (para mini widgets)
export function StatsCardMini({ stat }) {
  const { title, value, icon: Icon, color = 'blue' } = stat;

  const colorSchemes = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    purple: 'text-purple-600 dark:text-purple-400',
    red: 'text-red-600 dark:text-red-400',
  };

  const iconColor = colorSchemes[color] || colorSchemes.blue;

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
      {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
      <div>
        <div className="text-xs text-slate-600 dark:text-slate-400">{title}</div>
        <div className="text-lg font-bold text-slate-900 dark:text-white">{value}</div>
      </div>
    </div>
  );
}

// Grid para exibir múltiplos stats cards
export function StatsGrid({ stats, variant = 'default' }) {
  const CardComponent = 
    variant === 'gradient' ? StatsCardGradient :
    variant === 'mini' ? StatsCardMini :
    StatsCard;

  return (
    <div className={`grid gap-6 ${
      variant === 'mini' 
        ? 'grid-cols-1 sm:grid-cols-2' 
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    }`}>
      {stats.map((stat, index) => (
        <CardComponent key={index} stat={stat} />
      ))}
    </div>
  );
}
