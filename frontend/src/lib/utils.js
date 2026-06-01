// lib/utils.js
// Funções utilitárias usadas em todo o projeto

import {
  format,
  formatDistanceToNow,
  parseISO,
  isToday,
  isYesterday,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";

// ============================================
// FORMATAÇÃO DE DATAS
// ============================================

/**
 * Formata data para formato brasileiro
 * @param {string|Date} date - Data para formatar
 * @param {string} formatStr - Formato desejado
 * @returns {string} Data formatada
 */
export function formatDate(date, formatStr = "dd/MM/yyyy") {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: ptBR });
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "";
  }
}

/**
 * Formata data de forma relativa (ex: "há 2 horas")
 * @param {string|Date} date - Data para formatar
 * @returns {string} Texto relativo
 */
export function formatRelativeDate(date) {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;

    if (isToday(dateObj)) return "Hoje";
    if (isYesterday(dateObj)) return "Ontem";

    return formatDistanceToNow(dateObj, {
      addSuffix: true,
      locale: ptBR,
    });
  } catch (error) {
    console.error("Erro ao formatar data relativa:", error);
    return "";
  }
}

/**
 * Formata data e hora
 * @param {string|Date} date - Data para formatar
 * @returns {string} Data e hora formatadas
 */
export function formatDateTime(date) {
  return formatDate(date, "dd/MM/yyyy 'às' HH:mm");
}

/**
 * Retorna início e fim da semana atual
 * @returns {object} { start, end }
 */
export function getCurrentWeekRange() {
  const now = new Date();
  return {
    start: startOfWeek(now, { weekStartsOn: 0 }), // Domingo
    end: endOfWeek(now, { weekStartsOn: 0 }),
  };
}

// ============================================
// FORMATAÇÃO DE NÚMEROS
// ============================================

/**
 * Formata número com separadores
 * @param {number} num - Número para formatar
 * @param {number} decimals - Casas decimais
 * @returns {string} Número formatado
 */
export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined) return "0";

  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formata porcentagem
 * @param {number} value - Valor (0-100)
 * @param {number} decimals - Casas decimais
 * @returns {string} Porcentagem formatada
 */
export function formatPercent(value, decimals = 0) {
  if (value === null || value === undefined) return "0%";
  return `${formatNumber(value, decimals)}%`;
}

/**
 * Formata horas
 * @param {number} hours - Número de horas
 * @returns {string} Horas formatadas
 */
export function formatHours(hours) {
  if (!hours) return "0h";

  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);

  if (m === 0) return `${h}h`;
  if (h === 0) return `${m}min`;

  return `${h}h${m}min`;
}

/**
 * Formata número decimal para evitar problemas de ponto flutuante
 * @param {number} value - Valor numérico
 * @param {number} decimals - Casas decimais (padrão: 2)
 * @returns {number} Número formatado
 */
export function fixDecimal(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return 0;
  return parseFloat(value.toFixed(decimals));
}

/**
 * Formata moeda (Real)
 * @param {number} value - Valor em reais
 * @returns {string} Valor formatado
 */
export function formatCurrency(value) {
  if (value === null || value === undefined) return "R$ 0,00";

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ============================================
// CÁLCULOS
// ============================================

/**
 * Calcula porcentagem de progresso
 * @param {number} current - Valor atual
 * @param {number} target - Valor alvo
 * @returns {number} Porcentagem (0-100)
 */
export function calculateProgress(current, target) {
  if (!target || target === 0) return 0;
  return Math.min(100, Math.max(0, (current / target) * 100));
}

/**
 * Calcula porcentagem entre min e max
 * @param {number} value - Valor atual
 * @param {number} min - Mínimo
 * @param {number} max - Máximo
 * @returns {number} Porcentagem (0-100)
 */
export function calculateProgressRange(value, min, max) {
  if (value <= min) return 0;
  if (value >= max) return 100;

  const range = max - min;
  const progress = ((value - min) / range) * 100;

  return Math.round(Math.min(100, Math.max(0, progress)));
}

/**
 * Calcula média de array
 * @param {number[]} arr - Array de números
 * @returns {number} Média
 */
export function calculateAverage(arr) {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

/**
 * Soma valores de array
 * @param {number[]} arr - Array de números
 * @returns {number} Soma
 */
export function sum(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((acc, val) => acc + (val || 0), 0);
}

// ============================================
// STRINGS
// ============================================

/**
 * Trunca texto
 * @param {string} text - Texto para truncar
 * @param {number} maxLength - Tamanho máximo
 * @returns {string} Texto truncado
 */
export function truncate(text, maxLength = 50) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Capitaliza primeira letra
 * @param {string} text - Texto
 * @returns {string} Texto capitalizado
 */
export function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Gera slug de texto
 * @param {string} text - Texto
 * @returns {string} Slug
 */
export function slugify(text) {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/[\s_-]+/g, "-") // Substitui espaços por hífen
    .replace(/^-+|-+$/g, ""); // Remove hífens do início/fim
}

// ============================================
// VALIDAÇÕES
// ============================================

/**
 * Valida se é email
 * @param {string} email - Email para validar
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida se é URL
 * @param {string} url - URL para validar
 * @returns {boolean}
 */
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Verifica se objeto está vazio
 * @param {object} obj - Objeto
 * @returns {boolean}
 */
export function isEmpty(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

// ============================================
// ARRAYS
// ============================================

/**
 * Agrupa array por propriedade
 * @param {Array} arr - Array para agrupar
 * @param {string} key - Propriedade para agrupar
 * @returns {object} Objeto agrupado
 */
export function groupBy(arr, key) {
  if (!arr) return {};

  return arr.reduce((result, item) => {
    const group = item[key] || "outros";
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
}

/**
 * Remove duplicatas de array
 * @param {Array} arr - Array
 * @param {string} key - Chave única (opcional)
 * @returns {Array} Array sem duplicatas
 */
export function unique(arr, key = null) {
  if (!arr) return [];

  if (key) {
    const seen = new Set();
    return arr.filter((item) => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }

  return [...new Set(arr)];
}

/**
 * Ordena array por propriedade
 * @param {Array} arr - Array para ordenar
 * @param {string} key - Propriedade
 * @param {string} order - 'asc' ou 'desc'
 * @returns {Array} Array ordenado
 */
export function sortBy(arr, key, order = "asc") {
  if (!arr) return [];

  return [...arr].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
}

// ============================================
// DOM / BROWSER
// ============================================

/**
 * Copia texto para clipboard
 * @param {string} text - Texto para copiar
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Erro ao copiar:", error);
    return false;
  }
}

/**
 * Faz scroll suave até elemento
 * @param {string} elementId - ID do elemento
 */
export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Detecta se é mobile
 * @returns {boolean}
 */
export function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * Detecta se é tablet
 * @returns {boolean}
 */
export function isTablet() {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

/**
 * Detecta se é desktop
 * @returns {boolean}
 */
export function isDesktop() {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 1024;
}

// ============================================
// DEBOUNCE / THROTTLE
// ============================================

/**
 * Debounce de função
 * @param {Function} func - Função
 * @param {number} wait - Tempo de espera (ms)
 * @returns {Function} Função com debounce
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle de função
 * @param {Function} func - Função
 * @param {number} limit - Limite de tempo (ms)
 * @returns {Function} Função com throttle
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============================================
// CORES
// ============================================

/**
 * Retorna classe de cor baseado em status
 * @param {string} status - 'success', 'warning', 'danger'
 * @returns {string} Classes CSS
 */
export function getStatusColor(status) {
  const colors = {
    success:
      "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
    warning:
      "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
    danger: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",
    info: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
    pending:
      "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20",
  };

  return colors[status] || colors.info;
}

// ============================================
// CLASSE HELPER (cn - classnames)
// ============================================

/**
 * Combina classes CSS (similar ao clsx)
 * @param  {...any} classes - Classes
 * @returns {string} String de classes
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ============================================
// TRIMESTRES (Q1, Q2, Q3, Q4) - AUTOMÁTICO
// ============================================

/**
 * Detecta qual trimestre estamos (Q1, Q2, Q3, Q4)
 * @returns {string} Ex: "Q1", "Q2", "Q3", "Q4"
 */
export function getCurrentQuarter() {
  const month = new Date().getMonth() + 1; // 1-12

  if (month <= 3) return "Q1";
  if (month <= 6) return "Q2";
  if (month <= 9) return "Q3";
  return "Q4";
}

/**
 * Retorna meses do trimestre
 * @param {string} quarter - Ex: "Q1", "Q2", "Q3", "Q4"
 * @returns {Object} { start: "Janeiro", end: "Março", months: [1, 2, 3] }
 */
export function getQuarterMonths(quarter) {
  const months = {
    Q1: { start: "Janeiro", end: "Março", months: [1, 2, 3] },
    Q2: { start: "Abril", end: "Junho", months: [4, 5, 6] },
    Q3: { start: "Julho", end: "Setembro", months: [7, 8, 9] },
    Q4: { start: "Outubro", end: "Dezembro", months: [10, 11, 12] },
  };

  return months[quarter] || months.Q1;
}

/**
 * Calcula data de próxima revisão (próximo domingo)
 * @returns {string} Próximo domingo formatado em português
 */
export function getNextReviewDate() {
  const today = new Date();
  const daysUntilSunday = (7 - today.getDay()) % 7 || 7;
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);

  return format(nextSunday, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}
