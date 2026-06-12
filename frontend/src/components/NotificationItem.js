// components/NotificationItem.js
// Item individual de notificação com ação de dismiss

import { useRouter } from "next/router";
import { useNotifications } from "@/hooks/useNotifications";
import { X } from "lucide-react";

export default function NotificationItem({ notification }) {
  const router = useRouter();
  const { removeNotification } = useNotifications();

  const handleDismiss = (e) => {
    e.stopPropagation();
    removeNotification(notification.id);
  };

  const handleAction = () => {
    if (notification.actionUrl) {
      removeNotification(notification.id);
      router.push(notification.actionUrl);
    }
  };

  // Cores por severidade
  const severityColors = {
    danger: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      icon: "text-red-600 dark:text-red-400",
      text: "text-red-900 dark:text-red-100",
      title: "text-red-700 dark:text-red-300",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: "text-yellow-600 dark:text-yellow-400",
      text: "text-yellow-900 dark:text-yellow-100",
      title: "text-yellow-700 dark:text-yellow-300",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      text: "text-blue-900 dark:text-blue-100",
      title: "text-blue-700 dark:text-blue-300",
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      text: "text-green-900 dark:text-green-100",
      title: "text-green-700 dark:text-green-300",
    },
  };

  const colors = severityColors[notification.severity] || severityColors.info;

  return (
    <div
      className={`p-3 border-l-4 ${colors.bg} ${colors.border} border-l-4 
                   cursor-pointer hover:opacity-90 transition-opacity
                   ${notification.actionUrl ? "hover:shadow-md" : ""}`}
      onClick={handleAction}
    >
      <div className="flex gap-3">
        {/* Ícone */}
        <div className={`flex-shrink-0 text-lg mt-0.5`}>
          {notification.icon}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm ${colors.title}`}>
            {notification.title}
          </h4>
          <p className={`text-xs mt-1 ${colors.text}`}>
            {notification.message}
          </p>

          {/* Link de ação */}
          {notification.actionUrl && (
            <p
              className={`text-xs mt-2 font-medium ${colors.title} hover:underline`}
            >
              Ver detalhes →
            </p>
          )}

          {/* Timestamp */}
          <p className={`text-xs mt-1.5 opacity-60 ${colors.text}`}>
            {formatTimeAgo(notification.timestamp)}
          </p>
        </div>

        {/* Botão de fechar */}
        {notification.dismissible && (
          <button
            onClick={handleDismiss}
            className={`flex-shrink-0 p-1 hover:bg-white/50 dark:hover:bg-black/20 rounded transition-colors`}
            title="Descartar"
          >
            <X className={`w-4 h-4 ${colors.icon}`} />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Formata timestamp para "há X minutos"
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Tempo formatado
 */
function formatTimeAgo(timestamp) {
  if (!timestamp) return "";

  const now = new Date();
  const notifTime = new Date(timestamp);
  const diffMs = now - notifTime;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Agora";
  if (diffMins < 60) return `Há ${diffMins}m`;
  if (diffHours < 24) return `Há ${diffHours}h`;
  if (diffDays < 7) return `Há ${diffDays}d`;

  return notifTime.toLocaleDateString("pt-BR");
}
