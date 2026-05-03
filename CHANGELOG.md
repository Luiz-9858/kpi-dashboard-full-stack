# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [1.5.0] - 2026-04-29

### 🎉 Feature 8: PWA (Progressive Web App)

Sistema completo de PWA implementado, transformando o dashboard em um app instalável!

### ✨ Adicionado

#### PWA (Progressive Web App)

- **Manifest.json** configurado com metadados completos
  - Nome: "KPI Dashboard - Full Stack Progress"
  - Tema azul/roxo (#3b82f6 → #8b5cf6)
  - Display: standalone (sem barra do navegador)
  - 4 shortcuts: Dashboard, KPIs, GitHub, Relatórios
- **Service Worker** com cache inteligente
  - Cache de API Notion (NetworkFirst, 24h)
  - Cache de API GitHub (NetworkFirst, 24h)
  - Cache de imagens (CacheFirst, 30 dias)
  - Gerado automaticamente via next-pwa
- **Ícones personalizados**
  - icon-192x192.png (letra "K" azul/roxo)
  - icon-512x512.png (letra "K" azul/roxo)
  - Gradiente moderno e profissional
- **Instalação**
  - Desktop: Windows, macOS, Linux
  - Mobile: Android (Chrome), iOS (Safari)
  - Ícone na tela inicial
  - Abertura em janela própria
- **Funcionalidade offline**
  - Interface carrega sem internet
  - Dados em cache disponíveis
  - Service worker ativo 24/7

#### Integração GitHub Completa

- **API do GitHub** para buscar dados reais
  - Commits dos últimos 7 dias
  - Pull Requests (30 dias)
  - Repositórios ativos
  - Linguagens mais usadas
  - Streak de commits consecutivos
- **Correção de fuso horário GMT-3**
  - Commits aparecem no dia correto (Brasil)
  - Comparação precisa de timestamps
  - Suporte a meia-noite e virada de dia
- **Busca em TODOS os repos ativos**
  - Removido limite de 10 repos
  - Busca em repos não-fork e não-arquivados
  - Contagem precisa de commits totais
- **Biblioteca lib/github.js**
  - getRepositories() - Lista repos
  - countCommits() - Conta commits
  - getCommitsChartData() - Dados do gráfico
  - getPullRequests() - Lista PRs
  - getCommitStreak() - Calcula streak
  - getGitHubStats() - Estatísticas gerais

#### GitHub Webhook (Tempo Real)

- **Endpoint /api/webhook/github**
  - Recebe eventos do GitHub
  - Validação HMAC SHA256 (segurança)
  - Suporte a eventos: push, pull_request, create, delete
- **Invalidação automática de cache**
  - Limpa cache quando você commita
  - Atualização instantânea no dashboard
  - Sem esperar 10 minutos
- **Logs detalhados**
  - Registra cada evento recebido
  - Mostra commits, PRs, branches
  - Debug facilitado
- **Configuração no GitHub**
  - Webhook ativo e funcionando
  - Secret configurado no Vercel
  - Status: ✅ 200 OK

#### Página /github

- **Visualização completa** de dados do GitHub
  - Cards de estatísticas (commits, PRs, repos, streak)
  - Gráfico de commits dos últimos 7 dias
  - Lista de repositórios recentes
  - Top 5 linguagens mais usadas
- **Design moderno**
  - Ícones do GitHub
  - Cores consistentes
  - Animações suaves
  - 100% responsivo
- **Auto-refresh a cada 10 minutos**
  - Dados sempre atualizados
  - Cache inteligente
  - Loading states elegantes

#### Relatórios e Insights

- **Página /relatorios**
  - Análise semanal automática
  - Recomendações personalizadas
  - Avisos de KPIs baixos
  - Conquistas desbloqueadas
- **Score de produtividade (0-100)**
  - Baseado em 15 KPIs
  - Visual com CircularProgress
  - Cores dinâmicas (verde/amarelo/vermelho)
- **Insights automáticos**
  - Análise de tendências
  - Sugestões de melhoria
  - Comparação com metas
- **Card de resumo semanal**
  - Horas totais
  - Commits
  - Tasks completadas
  - Streak atual

### 🔧 Modificado

#### Estrutura do Projeto

- Reorganizado frontend/ para Vercel
  - Arquivos na pasta `frontend/`
  - Build otimizado
  - Root directory configurado
- Atualizado vercel.json
  - Suporte a rotas PWA
  - Build command correto
  - Output directory configurado

#### Header

- Adicionado link "Relatórios"
- Adicionado link "GitHub"
- Ícones atualizados (FileText, Github)
- Menu mobile otimizado

#### API

- Cache de 10 minutos implementado
  - Memória em JavaScript
  - Expira automaticamente
  - Logs de hit/miss
- Endpoint /api/github criado
  - Retorna dados do GitHub
  - Inclui chartData para gráfico
  - Estatísticas completas

### 🐛 Corrigido

#### Fuso Horário

- Correção de GMT-3 para commits
  - Offset de -3h aplicado corretamente
  - Comparação de datas precisa
  - Commits aparecem no dia certo
- Bug de meia-noite resolvido
  - Commits após 00h não somem mais
  - Cache atualizado corretamente

#### Busca de Commits

- Removido limite de 10 repos
  - Agora busca em TODOS os repos
  - Contagem precisa
  - Performance mantida
- Repos vazios tratados
  - Não quebra com repos sem commits
  - Error handling robusto

#### Vercel Deploy

- Estrutura de pastas corrigida
  - frontend/ reconhecido
  - Build funciona
  - Rotas PWA servidas
- vercel.json otimizado
  - Builds configurado
  - Routes para PWA
  - Cache headers

### 📚 Documentação

- **ESTADO-PROJETO.md** criado
  - Contexto completo do projeto
  - Features implementadas
  - Arquivos importantes
  - Workflow de continuação
- **README.md** atualizado
  - Seção PWA adicionada
  - Integração GitHub documentada
  - Novos screenshots
- Este CHANGELOG.md atualizado

### 🔐 Segurança

- GITHUB_WEBHOOK_SECRET configurado
  - Validação HMAC SHA256
  - Secret no Vercel
  - Webhook protegido
- Variáveis de ambiente seguras
  - Nunca expostas no frontend
  - Configuradas no Vercel
  - .env.local no .gitignore

---

## [1.0.0] - 2026-02-13

### 🎉 Lançamento Inicial

Primeira versão do KPI Dashboard - Sistema completo de acompanhamento de progresso para desenvolvedores Full Stack.

### ✨ Adicionado

#### Core Features

- **Dashboard Principal** com visão geral de KPIs e estatísticas
- **Sistema de KPIs** com 15 métricas principais:
  - 5 KPIs de Produtividade (horas prática, teoria, inglês, dias, streak)
  - 5 KPIs de Prática (commits, features, bugs, PRs, projetos)
  - 3 KPIs de Aprendizado (módulos, exercícios, conceitos)
  - 2 KPIs de Idioma (lições, worksheets)
- **Sistema de OKRs** para Q1 2026 com 4 objetivos e 16 key results
- **Integração com Notion API** para buscar dados automaticamente
- **Cálculo automático de KPIs** baseado nos dados do Notion

#### Interface

- **Tema Dark/Light** com toggle e persistência no localStorage
- **Design Responsivo** mobile-first (mobile, tablet, desktop)
- **Componentes Reutilizáveis**:
  - KPICard - Cards de KPI com status visual
  - StatsCard - Cards de estatísticas rápidas
  - Charts - Gráficos de linha, barras, área e pizza
  - Header - Navegação com menu mobile
  - Loading - Estados de loading, skeleton e erro
- **Animações Suaves** em hover, transições e carregamento

#### Funcionalidades

- **Cache Inteligente** com localStorage (5 minutos)
- **Auto-refresh** opcional dos dados (configurável)
- **Status Visual** dos KPIs (🟢 Ótimo, 🟡 Atenção, 🔴 Baixo)
- **Progresso Semanal** com barra visual
- **Distribuição de Tempo** por categoria (Prática, Teoria, Idioma)
- **Tasks de Hoje** com priorização visual
- **Projetos Ativos** com status e deadlines

#### Dados e APIs

- **API REST** em `/api/dashboard` com todos os dados calculados
- **6 Databases do Notion** integradas:
  - Today's Tasks
  - Hours This Week
  - Hour Tracker
  - Task Panel
  - Active Projects
  - 12-Month Roadmap
- **Formatação de Dados** com date-fns e utilitários customizados

#### Developer Experience

- **Hooks Customizados**:
  - `useTheme` - Gerenciamento de tema
  - `useDashboard` - Fetch de dados com cache
  - `useKPI`, `useKPIs`, `useQuickStats`, `useChartData` - Hooks especializados
- **Utilitários** com 35+ funções helper (formatação, cálculos, validações)
- **Constantes** centralizadas (metas, cores, mensagens, emojis)
- **TypeScript-like** schemas para melhor IntelliSense

#### Estilização

- **Tailwind CSS** configurado com tema personalizado
- **Classes Utilitárias** customizadas (cards, badges, buttons, progress bars)
- **Gradientes e Glassmorphism** para visual moderno
- **Cores Consistentes** com suporte dark mode
- **Fontes Google** (Inter, JetBrains Mono)

#### Deploy e Configuração

- **Vercel Deploy** configurado com vercel.json
- **Environment Variables** para segurança
- **Cache Headers** para performance
- **Security Headers** (XSS, Clickjacking)
- **404 Page** personalizada com links úteis

#### Documentação

- **README.md** - Visão geral do projeto
- **SETUP.md** - Guia de instalação completo
- **NOTION_SETUP.md** - Configuração detalhada do Notion
- **OKRS_KPIS.md** - Explicação de cada OKR e KPI
- **API.md** - Documentação da API REST
- **frontend/README.md** - Guia do desenvolvedor frontend
- **LICENSE** - Licença MIT
- **CHANGELOG.md** - Este arquivo

### 🎨 Design

- **Paleta de Cores**:
  - Primary: Blue (#3b82f6)
  - Success: Green (#10b981)
  - Warning: Yellow (#f59e0b)
  - Danger: Red (#ef4444)
  - Purple, Cyan, Pink para variações
- **Layout**:
  - Header fixo com navegação
  - Grid responsivo 1-4 colunas
  - Cards com shadow e hover
  - Spacing consistente

### 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **Estilização**: Tailwind CSS, PostCSS
- **Backend**: Next.js API Routes, Node.js 20+
- **Dados**: Notion API (@notionhq/client)
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Datas**: date-fns
- **Deploy**: Vercel

### 📦 Estrutura

```
kpi-dashboard-project/
├── frontend/src/
│   ├── components/    (5 componentes)
│   ├── hooks/         (2 hooks)
│   ├── lib/           (4 bibliotecas)
│   ├── pages/         (5 páginas)
│   └── styles/        (1 arquivo)
├── Documentação       (8 arquivos)
└── Configuração       (7 arquivos)
```

### 🎯 Metas dos KPIs

- **Horas Prática**: 12-15h/semana
- **Horas Teoria**: 5-8h/semana
- **Horas Inglês**: 3-5h/semana
- **Total Semanal**: 20-23h
- **Dias Estudados**: 6-7 dias
- **Commits**: 20-30/semana
- **Features**: 3-5/semana

### 📊 Disponibilidade Semanal

- Segunda/Quarta: 1.5h (com inglês presencial)
- Terça/Quinta/Sexta: 2.5h
- Sábado/Domingo: 5h cada
- **Total**: 20.5h/semana

---

## [Unreleased]

### 🔮 Planejado para v1.6.0

#### Features

- [ ] Export PDF de relatórios semanais
- [ ] Comparação mês a mês com gráficos
- [ ] Notificações push quando abaixo da meta
- [ ] Metas personalizáveis por semana
- [ ] Heatmap estilo GitHub para dias de estudo

#### Melhorias

- [ ] Otimização de loading com Redis
- [ ] Gráficos adicionais (radar, burndown)
- [ ] Filtros por período (semana, mês, trimestre)
- [ ] Dark mode por schedule (automático noite/dia)
- [ ] Multi-idioma (PT-BR, EN)

#### Otimizações

- [ ] ISR (Incremental Static Regeneration)
- [ ] Image optimization
- [ ] Lazy loading de gráficos
- [ ] Code splitting melhorado

---

## Como Usar Este Changelog

### Tipos de Mudanças

- **Adicionado** - Novas features
- **Modificado** - Mudanças em features existentes
- **Depreciado** - Features que serão removidas
- **Removido** - Features removidas
- **Corrigido** - Bug fixes
- **Segurança** - Vulnerabilidades corrigidas

### Versionamento Semântico

- **MAJOR** (X.0.0) - Mudanças incompatíveis na API
- **MINOR** (1.X.0) - Novas funcionalidades compatíveis
- **PATCH** (1.0.X) - Bug fixes compatíveis

---

## Suporte

- 🐛 Issues: https://github.com/Luiz-9858/kpi-dashboard-full-stack/issues
- 💬 Discussões: https://github.com/Luiz-9858/kpi-dashboard-full-stack/discussions

---

**Mantido com ❤️ por desenvolvedores, para desenvolvedores**
