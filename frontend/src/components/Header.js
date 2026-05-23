// components/Header.js
// Cabeçalho do dashboard com navegação e toggle de tema

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../hooks/useTheme";
import {
  LayoutDashboard,
  Target,
  TrendingUp,
  FolderOpen,
  FileText,
  GitHub as GitHubIcon,
  BarChart3,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const { isDark, toggleTheme, mounted } = useTheme();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Links de navegação
  const navLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/kpis", label: "KPIs", icon: TrendingUp },
    { href: "/okrs", label: "OKRs", icon: Target },
    { href: "/projetos", label: "Projetos", icon: FolderOpen },
    { href: "/comparacao", label: "Comparação", icon: BarChart3 },
    { href: "/relatorios", label: "Relatórios", icon: FileText },
    { href: "/github", label: "GitHub", icon: GitHubIcon },
  ];

  // Verifica se link está ativo
  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  // Toggle menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo e Título */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    KPI Dashboard
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Full Stack Progress
                  </p>
                </div>
              </Link>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg
                      transition-all duration-200 font-medium text-sm
                      ${
                        active
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Botões de ação */}
            <div className="flex items-center gap-2">
              {/* Toggle tema */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="btn-ghost p-2 rounded-lg"
                  title={isDark ? "Modo claro" : "Modo escuro"}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              )}

              {/* Menu mobile */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden btn-ghost p-2 rounded-lg"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Mobile (overlay) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />

          {/* Menu */}
          <div className="fixed top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 md:hidden animate-slide-up">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200 font-medium
                      ${
                        active
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}

// Variação compacta do Header (para páginas internas)
export function HeaderCompact({ title, subtitle }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {mounted && (
            <button onClick={toggleTheme} className="btn-ghost p-2 rounded-lg">
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
