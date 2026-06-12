// components/NotificationBell.js
// Ícone de sino com contador de notificações

import { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Bell, X } from "lucide-react";
import NotificationCenter from "./NotificationCenter";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, stats } = useNotifications();
  const bellRef = useRef(null);
  const menuRef = useRef(null);

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open]);

  const hasNotifications = notifications.length > 0;
  const dangerCount = stats?.danger || 0;

  return (
    <div className="relative">
      {/* Botão da campanhia */}
      <button
        ref={bellRef}
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 
                   dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 
                   rounded-lg transition-colors duration-200"
        title="Notificações"
        aria-label="Notificações"
      >
        <Bell className="w-5 h-5" />

        {/* Badge com contador */}
        {hasNotifications && (
          <span
            className={`absolute -top-1 -right-1 inline-flex items-center justify-center
                         px-2 py-0.5 rounded-full text-white text-xs font-bold
                         ${
                           dangerCount > 0
                             ? "bg-red-500"
                             : stats?.warning > 0
                               ? "bg-yellow-500"
                               : "bg-blue-500"
                         }
                         animate-pulse`}
          >
            {notifications.length > 99 ? "99+" : notifications.length}
          </span>
        )}
      </button>

      {/* Centro de notificações */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-96 max-h-[600px] 
                     bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50
                     border border-gray-200 dark:border-gray-700
                     animate-fade-in-down"
        >
          <NotificationCenter onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
