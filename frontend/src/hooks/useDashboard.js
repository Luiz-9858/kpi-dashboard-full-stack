// hooks/useDashboard.js
// Hook personalizado para buscar e gerenciar dados do dashboard

import { useState, useEffect, useCallback } from 'react';

export function useDashboard(options = {}) {
  const {
    autoRefresh = false,
    refreshInterval = 60000, // 1 minuto
    enableCache = true,
    cacheKey = 'dashboard-data',
    cacheDuration = 5 * 60 * 1000, // 5 minutos
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  // Busca dados da API
  const fetchData = useCallback(async (skipCache = false) => {
    try {
      setLoading(true);
      setError(null);

      // Tenta usar cache se habilitado
      if (enableCache && !skipCache) {
        const cached = getCache();
        if (cached) {
          setData(cached);
          setLoading(false);
          setLastFetch(new Date(localStorage.getItem(`${cacheKey}-timestamp`)));
          return cached;
        }
      }

      // Busca da API
      const response = await fetch('/api/dashboard');

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erro ao buscar dados');
      }

      // Atualiza estado
      setData(result.data);
      setLastFetch(new Date());

      // Salva no cache
      if (enableCache) {
        saveCache(result.data);
      }

      return result.data;
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [enableCache, cacheKey]);

  // Atualiza dados (força reload)
  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Salva dados no cache
  const saveCache = (data) => {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(`${cacheKey}-timestamp`, new Date().toISOString());
    } catch (err) {
      console.warn('Erro ao salvar cache:', err);
    }
  };

  // Recupera dados do cache
  const getCache = () => {
    try {
      const cached = localStorage.getItem(cacheKey);
      const timestamp = localStorage.getItem(`${cacheKey}-timestamp`);

      if (!cached || !timestamp) return null;

      const age = Date.now() - new Date(timestamp).getTime();

      // Cache expirado
      if (age > cacheDuration) {
        clearCache();
        return null;
      }

      return JSON.parse(cached);
    } catch (err) {
      console.warn('Erro ao ler cache:', err);
      return null;
    }
  };

  // Limpa cache
  const clearCache = () => {
    try {
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(`${cacheKey}-timestamp`);
    } catch (err) {
      console.warn('Erro ao limpar cache:', err);
    }
  };

  // Busca inicial
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh || !refreshInterval) return;

    const interval = setInterval(() => {
      fetchData(true); // Skip cache no auto-refresh
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchData]);

  return {
    data,
    loading,
    error,
    lastFetch,
    refresh,
    clearCache,
  };
}

// Hook para KPI específico
export function useKPI(kpiName) {
  const { data, loading, error, refresh } = useDashboard();

  const kpi = data?.kpis?.[kpiName] || null;

  return {
    kpi,
    loading,
    error,
    refresh,
  };
}

// Hook para múltiplos KPIs
export function useKPIs(kpiNames = []) {
  const { data, loading, error, refresh } = useDashboard();

  const kpis = kpiNames.reduce((acc, name) => {
    acc[name] = data?.kpis?.[name] || null;
    return acc;
  }, {});

  return {
    kpis,
    loading,
    error,
    refresh,
  };
}

// Hook para estatísticas rápidas
export function useQuickStats() {
  const { data, loading, error, refresh } = useDashboard();

  return {
    stats: data?.quickStats || null,
    loading,
    error,
    refresh,
  };
}

// Hook para gráficos
export function useChartData() {
  const { data, loading, error, refresh } = useDashboard();

  return {
    categoryBreakdown: data?.categoryBreakdown || [],
    weeklyProgress: data?.weeklyProgress || null,
    loading,
    error,
    refresh,
  };
}
