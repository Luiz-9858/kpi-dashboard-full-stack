// components/NotificationCenter.js
// Centro de notificações com lista e filtros

import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Trash2, Filter } from "lucide-react";
import NotificationItem from "./NotificationItem";

export default function NotificationCenter({ onClose }) {
  const { notifications, clearAll, filterByType, stats } = useNotifications();
  const [filterType, setFilterType] = useState(null);

  const displayNotifications = filterType
    ? filterByType(filterType)
    : notifications;

  const severityColors = {
    danger: "text-red-600 dark:text-red-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    info: "text-blue-600 dark:text-blue-400",
    success: "text-green-600 dark:text-green-400",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Notificações
          </h3>
          <button
            onClick={clearAll}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg 
                       text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Limpar todas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Estatísticas */}
        <div className="flex gap-2 text-xs">
          {stats?.danger > 0 && (
            <span
              className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 
                           dark:text-red-400 rounded-full font-semibold"
            >
              {stats.danger} Alertas
            </span>
          )}
          {stats?.warning > 0 && (
            <span
              className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 
                           dark:text-yellow-400 rounded-full font-semibold"
            >
              {stats.warning} Avisos
            </span>
          )}
          {stats?.success > 0 && (
            <span
              className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 
                           dark:text-green-400 rounded-full font-semibold"
            >
              {stats.success} Sucessos
            </span>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilterType(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                       ${
                         filterType === null
                           ? "bg-blue-600 text-white"
                           : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                       }`}
          >
            Todos ({notifications.length})
          </button>
          <button
            onClick={() => setFilterType("alert")}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                       ${
                         filterType === "alert"
                           ? "bg-red-600 text-white"
                           : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                       }`}
          >
            Alertas
          </button>
          <button
            onClick={() => setFilterType("warning")}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                       ${
                         filterType === "warning"
                           ? "bg-yellow-600 text-white"
                           : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                       }`}
          >
            Avisos
          </button>
          <button
            onClick={() => setFilterType("success")}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                       ${
                         filterType === "success"
                           ? "bg-green-600 text-white"
                           : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                       }`}
          >
            Sucessos
          </button>
        </div>
      </div>

      {/* Lista de notificações */}
      <div className="flex-1 overflow-y-auto">
        {displayNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filterType
                ? "Nenhuma notificação neste filtro"
                : "Sem notificações por enquanto!"}
            </p>
            {filterType && (
              <button
                onClick={() => setFilterType(null)}
                className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ver todas
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {displayNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                       bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                       border border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
// ========== 2. ALERTAS E AVISOS ==========

// 2.1 - Deadline próxima
