// hooks/useNotifications.js
// Hook customizado para gerenciar notificações no dashboard

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { generateNotifications } from "@/lib/notifications";

// ← ADICIONAR ISTO:
const DISMISSED_KEY = "dismissed-notifications";

function getDismissedNotifications() {
  if (typeof window === "undefined") return new Set();
  const stored = localStorage.getItem(DISMISSED_KEY);
  return new Set(stored ? JSON.parse(stored) : []);
}

function saveDismissedNotifications(dismissed) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DISMISSED_KEY, JSON.stringify(Array.from(dismissed)));
}
// ← ATÉ AQUI

// Context (exportar para usar em _app.js)
export const NotificationContext = createContext();

/**
 * Hook para usar notificações
 * @returns {Object} { notifications, addNotification, removeNotification, clearAll, stats, updateNotifications }
 */
export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de NotificationProvider",
    );
  }

  return context;
}

/**
 * Provider de notificações (usar em _app.js)
 */
export function NotificationProvider({ children, dashboardData: initialData }) {
  const [notifications, setNotifications] = useState([]);

  // Gerar notificações quando dados iniciais chegam
  useEffect(() => {
    if (initialData) {
      const newNotifications = generateNotifications(initialData);
      setNotifications(newNotifications);
    }
  }, [initialData]);

  // Atualizar notificações manualmente (chamado quando busca dados em index.js)
  const updateNotifications = useCallback(
    (dashboardData) => {
      if (dashboardData) {
        let newNotifications = generateNotifications(dashboardData);

        const dismissed = getDismissedNotifications();
        newNotifications = newNotifications.filter((n) => !dismissed.has(n.id));

        // Manter timestamp das notificações antigas
        const updatedNotifications = newNotifications.map((notif) => {
          const oldNotif = notifications.find((n) => n.id === notif.id);
          return oldNotif ? { ...notif, timestamp: oldNotif.timestamp } : notif;
        });

        setNotifications(updatedNotifications);
      }
    },
    [notifications],
  ); // ← ADICIONAR ESTA DEPENDÊNCIA!

  // Adicionar notificação manual
  const addNotification = useCallback((notification) => {
    const id = notification.id || `manual-${Date.now()}`;
    const newNotification = {
      ...notification,
      id,
      timestamp: new Date().toISOString(),
      dismissible: notification.dismissible !== false,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Auto-remover em 10 segundos se não foi dismissible manualmente
    if (notification.autoDismiss !== false) {
      setTimeout(() => {
        removeNotification(id);
      }, 10000);
    }

    return id;
  }, []);

  // Remover notificação específica
  const removeNotification = useCallback((id) => {
    // Guardar em localStorage
    const dismissed = getDismissedNotifications();
    dismissed.add(id);
    saveDismissedNotifications(dismissed);

    // Remover do state
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);
  // Limpar todas
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Marcar como lida
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  // Obter estatísticas
  const getStats = useCallback(() => {
    return {
      total: notifications.length,
      danger: notifications.filter((n) => n.severity === "danger").length,
      warning: notifications.filter((n) => n.severity === "warning").length,
      info: notifications.filter((n) => n.severity === "info").length,
      success: notifications.filter((n) => n.severity === "success").length,
      unread: notifications.filter((n) => !n.read).length,
    };
  }, [notifications]);

  // Filtrar por tipo
  const filterByType = useCallback(
    (type) => {
      return notifications.filter((n) => n.type === type);
    },
    [notifications],
  );

  // Filtrar por categoria
  const filterByCategory = useCallback(
    (category) => {
      return notifications.filter((n) => n.category === category);
    },
    [notifications],
  );

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    markAsRead,
    updateNotifications, // ← NOVA FUNÇÃO!
    stats: getStats(),
    filterByType,
    filterByCategory,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
