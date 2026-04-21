// pages/404.js
// Página 404 customizada - Página não encontrada

import Link from 'next/link';
import Head from 'next/head';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Página não encontrada | KPI Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          
          {/* Ícone grande */}
          <div className="mb-8 animate-bounce">
            <FileQuestion className="w-32 h-32 mx-auto text-slate-300 dark:text-slate-700" />
          </div>

          {/* Código 404 */}
          <h1 className="text-9xl font-black text-slate-900 dark:text-white mb-4">
            404
          </h1>

          {/* Mensagem principal */}
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Página não encontrada
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/" className="btn-primary flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Voltar para Home
            </Link>

            <button 
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>

          {/* Links úteis */}
          <div className="card max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Páginas disponíveis
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link 
                href="/"
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left group"
              >
                <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  📊 Dashboard
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Visão geral dos KPIs
                </div>
              </Link>

              <Link 
                href="/kpis"
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left group"
              >
                <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  📈 KPIs
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Métricas detalhadas
                </div>
              </Link>

              <Link 
                href="/okrs"
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left group"
              >
                <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  🎯 OKRs
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Objetivos trimestrais
                </div>
              </Link>

              <Link 
                href="/projetos"
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left group"
              >
                <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  📁 Projetos
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Projetos ativos
                </div>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Precisa de ajuda?{' '}
              <a 
                href="mailto:suporte@exemplo.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Entre em contato
              </a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
