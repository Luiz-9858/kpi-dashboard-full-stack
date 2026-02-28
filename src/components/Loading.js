// components/Loading.js
// Componentes de loading para diferentes situações

import { Loader2 } from "lucide-react";

// Loading padrão (spinner simples)
export default function Loading({ message = "Carregando...", size = "md" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <Loader2
        className={`${sizes[size]} animate-spin text-blue-600 dark:text-blue-400`}
      />
      {message && (
        <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
      )}
    </div>
  );
}

// Loading em tela cheia
export function LoadingFullScreen({ message = "Carregando seus dados..." }) {
  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
          {message}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
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

// Skeleton para Cards
export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-4" />
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full w-full" />
    </div>
  );
}

// Skeleton para Stats Card
export function SkeletonStatsCard() {
  return (
    <div className="card animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
        </div>
        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>
    </div>
  );
}

// Skeleton para gráfico
export function SkeletonChart({ height = 300 }) {
  return (
    <div className="card animate-pulse">
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4" />
      <div
        className="bg-slate-200 dark:bg-slate-700 rounded"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}

// Skeleton para lista de tasks
export function SkeletonTaskList({ count = 5 }) {
  return (
    <div className="card">
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4 animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 animate-pulse"
          >
            <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Grid de Skeleton Cards
export function SkeletonGrid({ count = 6, variant = "card" }) {
  const SkeletonComponent =
    variant === "stats"
      ? SkeletonStatsCard
      : variant === "chart"
        ? SkeletonChart
        : SkeletonCard;

  return (
    <div className="dashboard-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}

// Loading com progresso (opcional)
export function LoadingProgress({ progress = 0, message = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {message}
          </span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {progress}%
          </span>
        </div>
        <div className="progress-bar h-2">
          <div
            className="progress-bar-fill bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// Loading com dots animados
export function LoadingDots({ message = "Carregando" }) {
  return (
    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
      <span className="text-sm">{message}</span>
      <div className="flex gap-1">
        <span className="animate-bounce" style={{ animationDelay: "0ms" }}>
          .
        </span>
        <span className="animate-bounce" style={{ animationDelay: "150ms" }}>
          .
        </span>
        <span className="animate-bounce" style={{ animationDelay: "300ms" }}>
          .
        </span>
      </div>
    </div>
  );
}

// Estado vazio (quando não há dados)
export function EmptyState({
  title = "Nenhum dado encontrado",
  message = "Adicione dados no Notion para vê-los aqui",
  icon = "📊",
  action = null,
}) {
  return (
    <div className="card text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}

// Estado de erro
export function ErrorState({
  title = "Algo deu errado",
  message = "Não foi possível carregar os dados",
  error = null,
  onRetry = null,
}) {
  return (
    <div className="card text-center py-12">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-2 max-w-md mx-auto">
        {message}
      </p>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mb-6 font-mono">
          {error}
        </p>
      )}
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Tentar novamente
        </button>
      )}
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
        Se o problema persistir, verifique a configuração do Notion
      </p>
    </div>
  );
}
