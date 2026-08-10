// components/Loading.js
// Componentes de loading para diferentes situações
// OTIMIZADO PARA MOBILE - Responsividade Completa

import { Loader2 } from "lucide-react";

// Loading padrão (spinner simples) - RESPONSIVE
export default function Loading({ message = "Carregando...", size = "md" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5 sm:w-6 sm:h-6",
    lg: "w-6 h-6 sm:w-8 sm:h-8",
    xl: "w-10 h-10 sm:w-12 sm:h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-6 sm:p-8">
      <Loader2
        className={`${sizes[size]} animate-spin text-blue-600 dark:text-blue-400`}
      />
      {message && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center">
          {message}
        </p>
      )}
    </div>
  );
}

// Loading em tela cheia - RESPONSIVE
export function LoadingFullScreen({ message = "Carregando seus dados..." }) {
  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 flex items-center justify-center z-50 p-4">
      <div className="text-center max-w-sm">
        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-3 sm:mb-4" />
        <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-2">
          {message}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Isso pode levar alguns segundos...
        </p>
      </div>
    </div>
  );
}

// Loading inline (para botões)
export function LoadingInline({ size = "sm" }) {
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
  };

  return <Loader2 className={`${sizes[size]} animate-spin`} />;
}

// Skeleton para Cards - RESPONSIVE
export function SkeletonCard() {
  return (
    <div className="card animate-pulse p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
        <div className="h-5 sm:h-6 w-14 sm:w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="h-6 sm:h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
      <div className="h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-3 sm:mb-4" />
      <div className="h-1.5 sm:h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-full" />
    </div>
  );
}

// Skeleton para Stats Card - RESPONSIVE
export function SkeletonStatsCard() {
  return (
    <div className="card animate-pulse p-3 sm:p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
          <div className="h-6 sm:h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
        </div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-200 dark:bg-slate-700 rounded-xl flex-shrink-0" />
      </div>
    </div>
  );
}

// Skeleton para gráfico - RESPONSIVE
export function SkeletonChart({ height = 250 }) {
  return (
    <div className="card animate-pulse p-3 sm:p-4">
      <div className="h-4 sm:h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-3 sm:mb-4" />
      <div
        className="bg-slate-200 dark:bg-slate-700 rounded"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}

// Skeleton para lista de tasks - RESPONSIVE
export function SkeletonTaskList({ count = 5 }) {
  return (
    <div className="card p-3 sm:p-4">
      <div className="h-4 sm:h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-3 sm:mb-4 animate-pulse" />
      <div className="space-y-2 sm:space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 animate-pulse"
          >
            <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <div className="h-3 sm:h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
            <div className="h-5 sm:h-6 w-16 sm:w-20 bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Grid de Skeleton Cards - RESPONSIVE
export function SkeletonGrid({ count = 6, variant = "card" }) {
  const SkeletonComponent =
    variant === "stats"
      ? SkeletonStatsCard
      : variant === "chart"
        ? SkeletonChart
        : SkeletonCard;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}

// Loading com progresso (opcional) - RESPONSIVE
export function LoadingProgress({ progress = 0, message = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 p-6 sm:p-8">
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
            {message}
          </span>
          <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
            {progress}%
          </span>
        </div>
        <div className="progress-bar h-1.5 sm:h-2">
          <div
            className="progress-bar-fill bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// Loading com dots animados - RESPONSIVE
export function LoadingDots({ message = "Carregando" }) {
  return (
    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
      <span className="text-xs sm:text-sm">{message}</span>
      <div className="flex gap-0.5 sm:gap-1">
        <span
          className="animate-bounce text-sm sm:text-base"
          style={{ animationDelay: "0ms" }}
        >
          .
        </span>
        <span
          className="animate-bounce text-sm sm:text-base"
          style={{ animationDelay: "150ms" }}
        >
          .
        </span>
        <span
          className="animate-bounce text-sm sm:text-base"
          style={{ animationDelay: "300ms" }}
        >
          .
        </span>
      </div>
    </div>
  );
}

// Estado vazio (quando não há dados) - RESPONSIVE
export function EmptyState({
  title = "Nenhum dado encontrado",
  message = "Adicione dados no Notion para vê-los aqui",
  icon = "📊",
  action = null,
}) {
  return (
    <div className="card text-center py-8 sm:py-12 px-4">
      <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 max-w-md mx-auto">
        {message}
      </p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}

// Estado de erro - RESPONSIVE
export function ErrorState({
  title = "Algo deu errado",
  message = "Não foi possível carregar os dados",
  error = null,
  onRetry = null,
}) {
  return (
    <div className="card text-center py-8 sm:py-12 px-4">
      <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">⚠️</div>
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-2 max-w-md mx-auto">
        {message}
      </p>
      {error && (
        <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 mb-4 sm:mb-6 font-mono break-all px-2">
          {error}
        </p>
      )}
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Tentar novamente
        </button>
      )}
      <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-3 sm:mt-4">
        Se o problema persistir, verifique a configuração do Notion
      </p>
    </div>
  );
}
