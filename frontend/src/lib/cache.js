// lib/cache.js
// Sistema de cache em memória para otimizar chamadas ao Notion
// Reduz de ~24s para ~2s ao navegar entre páginas

/**
 * Cache simples em memória com expiração
 * Armazena dados do dashboard por 5 minutos
 */
class SimpleCache {
  constructor() {
    this.cache = new Map(); // Armazena os dados
    this.timers = new Map(); // Armazena os timers de expiração
  }

  /**
   * Salva um valor no cache com TTL (Time To Live)
   * @param {string} key - Chave única (ex: 'dashboard-data')
   * @param {any} value - Dados a serem salvos
   * @param {number} ttl - Tempo de vida em milissegundos (padrão: 5 minutos)
   */
  set(key, value, ttl = 5 * 60 * 1000) {
    // Limpa timer anterior se existir
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Salva o valor
    this.cache.set(key, {
      value,
      createdAt: Date.now(),
      expiresAt: Date.now() + ttl,
    });

    // Cria timer para expirar automaticamente
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttl);

    this.timers.set(key, timer);

    console.log(`[Cache] ✅ Dados salvos: ${key} (expira em ${ttl / 1000}s)`);
  }

  /**
   * Busca um valor no cache
   * @param {string} key - Chave para buscar
   * @returns {any|null} - Retorna o valor ou null se não existir/expirado
   */
  get(key) {
    const item = this.cache.get(key);

    if (!item) {
      console.log(`[Cache] ❌ Miss: ${key} (não existe)`);
      return null;
    }

    // Verifica se expirou
    if (Date.now() > item.expiresAt) {
      console.log(`[Cache] ⏰ Expirado: ${key}`);
      this.delete(key);
      return null;
    }

    const age = Math.round((Date.now() - item.createdAt) / 1000);
    console.log(`[Cache] ✅ Hit: ${key} (${age}s atrás)`);
    return item.value;
  }

  /**
   * Remove um valor do cache
   * @param {string} key - Chave a ser removida
   */
  delete(key) {
    // Limpa o timer
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }

    // Remove o valor
    this.cache.delete(key);
    console.log(`[Cache] 🗑️ Removido: ${key}`);
  }

  /**
   * Limpa todo o cache
   */
  clear() {
    // Limpa todos os timers
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();

    // Limpa o cache
    this.cache.clear();
    console.log("[Cache] 🧹 Cache limpo completamente");
  }

  /**
   * Retorna informações sobre o cache
   */
  stats() {
    const items = [];
    this.cache.forEach((value, key) => {
      const age = Math.round((Date.now() - value.createdAt) / 1000);
      const ttl = Math.round((value.expiresAt - Date.now()) / 1000);
      items.push({ key, age, ttl });
    });
    return {
      size: this.cache.size,
      items,
    };
  }
}

// Exporta uma instância única (singleton)
// Isso garante que o mesmo cache é compartilhado por toda a aplicação
const cache = new SimpleCache();

export default cache;

// Exporta também a classe para testes
export { SimpleCache };
