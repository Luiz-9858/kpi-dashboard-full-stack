# 📊 KPI Dashboard Full Stack

> Dashboard personalizado integrado com Notion API e GitHub API para visualização de KPIs, OKRs e acompanhamento de progresso como desenvolvedor Full Stack

[![Deploy on Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)](https://kpi-dashboard-full-stack.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Notion API](https://img.shields.io/badge/Notion-API-black?style=for-the-badge&logo=notion)](https://developers.notion.com/)
[![GitHub API](https://img.shields.io/badge/GitHub-API-black?style=for-the-badge&logo=github)](https://docs.github.com/en/rest)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**🔗 Demo ao vivo:** [kpi-dashboard-full-stack.vercel.app](https://kpi-dashboard-full-stack.vercel.app)

> ⚠️ **Nota de Privacidade**: Os dados exibidos na demo são pessoais e reais, utilizados para acompanhamento de metas de desenvolvimento. O código é público, mas as credenciais do Notion são privadas e seguras.

---

## 📊 Visão Geral

Sistema completo de tracking de progresso para desenvolvedores, integrando automaticamente com o **Notion** e **GitHub** para extrair dados de tarefas, horas de estudo, commits, pull requests e gerar visualizações em tempo real.

### ✨ Funcionalidades Principais

**Dashboards & Visualização:**

- 📈 **Dashboard Principal** - Estatísticas da semana, tasks completadas, streak de dias consecutivos
- 🎯 **15 KPIs Automáticos** - Organizados em 4 categorias (Produtividade, Prática, Aprendizado, Idioma)
- 🚀 **OKRs Q1 2026** - 4 objetivos trimestrais com 16 Key Results
- 📁 **Projetos Ativos** - Acompanhamento de 7 projetos em andamento
- 📊 **Gráficos Interativos** - Distribuição de tempo, progresso semanal, tendências
- 🎨 **Sistema de Animações** - 60+ animações CSS customizadas

**Integrações:**

- 🔗 **Notion API** - 7 databases sincronizadas automaticamente
- 🐙 **GitHub API** - Commits, PRs, repositórios e linguagens em tempo real
- ⚡ **GitHub Webhook** - Atualização instantânea quando você commita
- 📡 **Cache Inteligente** - 10 minutos em memória para performance

**Relatórios & Insights:**

- 📊 **Análise Semanal Automática** - Score de produtividade (0-100)
- 💡 **Recomendações Inteligentes** - Baseadas nos seus KPIs
- 🏆 **Conquistas** - Sistema de badges e progresso
- ⚠️ **Avisos** - Quando KPIs ficam abaixo da meta

**PWA (Progressive Web App):**

- 📱 **Instalável** - Desktop (Windows/Mac/Linux) e Mobile (Android/iOS)
- 🔄 **Funciona Offline** - Service worker com cache inteligente
- ⚡ **Performance** - Cache de API (24h) e imagens (30 dias)
- 🎯 **Shortcuts** - 4 atalhos rápidos (Dashboard, KPIs, GitHub, Relatórios)
- 🎨 **Ícones Personalizados** - Logo "K" azul/roxo (192x192 e 512x512)

**Experiência:**

- 🌓 **Dark/Light Mode** - Tema escuro por padrão com toggle
- 📱 **100% Responsivo** - Mobile, tablet e desktop
- 🔥 **Heatmap GitHub Style** - Visualização de dias de estudo
- ⚡ **Atualização em Tempo Real** - Webhook do GitHub

---

## 🎯 OKRs Q1 2026 (Jan-Mar)

### 🚀 OKR 1: Concluir projeto AutoPeças B77 em produção

**Key Results:**

- ✅ Finalizar features essenciais (Admin, Detalhes, Carrinho, Filtros) - **75%**
- 🔄 Implementar autenticação e checkout - **60%**
- 📦 Deploy em produção com domínio - **0%**
- 📋 Testes E2E + Documentação GitHub completa - **30%**

### 💻 OKR 2: Evoluir habilidades Full Stack

**Key Results:**

- 📚 Curso HashTag: HTML & CSS Impressionador 61% → 100% - **39%**
- 🧮 Resolver 120 exercícios de algoritmos - **25%**
- 🛠️ Criar 1 projeto pessoal do zero - **50%**
- 🤝 Contribuir com 3 pull requests open source - **0%**

### 📁 OKR 3: Preparar portfólio profissional

**Key Results:**

- 🎨 2 projetos completos no portfólio - **50%**
- 📝 README detalhado em todos projetos GitHub - **40%**
- ✍️ Publicar 1 artigo técnico - **0%**
- 💼 LinkedIn otimizado + 8 posts técnicos - **25%**

### 🌐 OKR 4: Desenvolver proficiência técnica em inglês

**Key Results:**

- 🗣️ 36 lições Method Callan (3/semana) - **33%**
- 📖 Ler 12 artigos técnicos em inglês - **25%**
- 🎥 Assistir 12 vídeos técnicos sem legenda - **17%**
- 📄 Completar 24 worksheets Method Callan - **30%**

---

## 📊 15 KPIs Principais

### 🎯 Produtividade (6 KPIs)

| #   | KPI            | Meta Semanal | Status | Medição                                 |
| --- | -------------- | ------------ | ------ | --------------------------------------- |
| 1   | Horas Prática  | 12-15h       | 🔴     | Notion: Hours This Week (🟣 Projetos)   |
| 2   | Horas Teoria   | 5-8h         | 🔴     | Notion: Hours This Week (🔵 Estudos)    |
| 3   | Horas Inglês   | 3-5h         | 🔴     | Notion: Hours This Week (🟠 Idiomas)    |
| 4   | Total Horas    | 20-23h       | 🔴     | Soma das categorias                     |
| 5   | Dias Estudados | 6-7 dias     | 🔴     | Hour Tracker (contagem de datas únicas) |
| 6   | Streak         | 7+ dias      | 🟡     | Calculado automaticamente               |

### 💻 Prática (5 KPIs)

| #   | KPI                  | Meta Semanal | Meta Mensal  | Medição                        |
| --- | -------------------- | ------------ | ------------ | ------------------------------ |
| 7   | Commits GitHub       | 20-30        | 80-120       | ✅ **GitHub API (automático)** |
| 8   | Features Concluídas  | 3-5          | 12-20        | Task Panel (status: Complete)  |
| 9   | Bugs Resolvidos      | 5-8          | 20-32        | Task Panel (tag: bug)          |
| 10  | Pull Requests        | -            | 2-4          | ✅ **GitHub API (automático)** |
| 11  | Projetos Finalizados | -            | Trimestre: 2 | Task Panel (progress: 100%)    |

### 📚 Aprendizado (3 KPIs)

| #   | KPI                   | Meta Semanal | Meta Mensal | Medição                               |
| --- | --------------------- | ------------ | ----------- | ------------------------------------- |
| 12  | Módulos Concluídos    | 3-5          | 12-20       | Hour Tracker (descrição: "módulo")    |
| 13  | Exercícios Algoritmos | 10           | 40          | Hour Tracker (atividade: "exercício") |
| 14  | Conceitos Dominados   | 2-3          | 8-12        | Hour Tracker (descrição: "conceito")  |

### 🌐 Idioma (2 KPIs)

| #   | KPI                  | Meta Semanal | Meta Mensal | Medição                               |
| --- | -------------------- | ------------ | ----------- | ------------------------------------- |
| 15  | Lições Method Callan | 3            | 12          | Hour Tracker (projeto: Method Callan) |
| 16  | Worksheets           | 2            | 8           | Hour Tracker (atividade: "worksheet") |

**Status:** 🟢 Ótimo (≥90%) | 🟡 Atenção (70-89%) | 🔴 Crítico (<70%)

---

## 🐙 Integração GitHub

### Dados Automáticos

- ✅ **Commits dos últimos 7 dias** - Com correção de fuso horário GMT-3
- ✅ **Pull Requests** - Total, abertos, merged (30 dias)
- ✅ **Repositórios** - Total e ativos (atualizados nos últimos 30 dias)
- ✅ **Streak** - Dias consecutivos com commits
- ✅ **Linguagens** - Top 5 mais usadas com porcentagem
- ✅ **Gráfico de Commits** - Barras dos últimos 7 dias

### Webhook em Tempo Real

- ⚡ **Atualização instantânea** quando você faz commit
- 🔐 **Validação HMAC SHA256** para segurança
- 🗑️ **Invalidação automática de cache**
- 📊 **Logs detalhados** de cada evento (push, PR, create, delete)

### Página /github

Visualização completa com:

- Cards de estatísticas (commits, PRs, repos, streak)
- Gráfico de commits dos últimos 7 dias
- Lista de repositórios recentes
- Top 5 linguagens mais usadas

---

## ⏰ Disponibilidade Semanal

| Dia       | Horas      | Observação                    |
| --------- | ---------- | ----------------------------- |
| Segunda   | 1h30       | Inglês presencial 19:00-19:50 |
| Terça     | 2h30       | Livre após 18:30              |
| Quarta    | 1h30       | Inglês presencial 19:00-19:50 |
| Quinta    | 2h30       | Livre após 18:30              |
| Sexta     | 2h30       | Livre após 18:30              |
| Sábado    | 5h         | Fim de semana                 |
| Domingo   | 5h         | Fim de semana                 |
| **TOTAL** | **20-23h** | ✅ Meta semanal               |

### Distribuição Ideal:

- 🔧 **Prática** (projetos): 12-15h (60-65%)
- 📚 **Teoria** (cursos/livros): 5-8h (25-35%)
- 🌐 **Inglês** (aulas + estudo): 3-5h (15-20%)

---

## 🛠️ Stack Tecnológica

### Frontend

- **Framework**: Next.js 14.2 (React 18)
- **Estilização**: Tailwind CSS + animations.css (60+ animações)
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Datas**: date-fns
- **PWA**: next-pwa
- **HTTP**: Fetch API

### Backend & API

- **Runtime**: Node.js 20+
- **API Routes**: Next.js Serverless Functions
- **Notion SDK**: @notionhq/client
- **GitHub API**: REST API v3
- **Cache**: Em memória (10 minutos)
- **Webhook**: HMAC SHA256 validation

### Deploy & Infraestrutura

- **Hospedagem**: Vercel
- **CI/CD**: GitHub Actions (automático)
- **Variáveis de Ambiente**: Vercel Environment Variables
- **HTTPS**: Incluído (Vercel)
- **Webhook**: Configurado e ativo

---

## 📁 Estrutura do Projeto

```
kpi-dashboard-full-stack/
├── frontend/
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   │   ├── Header.js        # Header com dark mode
│   │   │   ├── StatsCard.js     # Cards com sparkline
│   │   │   ├── KPICard.js       # Cards de KPIs
│   │   │   ├── Charts.js        # Recharts básicos
│   │   │   ├── AdvancedCharts.js # Charts avançados
│   │   │   ├── InsightCard.js   # Cards de insights
│   │   │   └── Loading.js       # Estados de loading
│   │   ├── lib/                 # Lógica de negócio
│   │   │   ├── notion.js        # Conexão Notion API
│   │   │   ├── github.js        # ✨ Conexão GitHub API
│   │   │   ├── kpis.js          # Cálculo de KPIs
│   │   │   ├── insights.js      # ✨ Análise e insights
│   │   │   ├── cache.js         # ✨ Cache em memória
│   │   │   ├── constants.js     # OKRs e constantes
│   │   │   └── utils.js         # Funções utilitárias
│   │   ├── pages/               # Páginas Next.js
│   │   │   ├── index.js         # Dashboard principal
│   │   │   ├── kpis.js          # Página de KPIs
│   │   │   ├── okrs.js          # Página de OKRs
│   │   │   ├── projetos.js      # Página de Projetos
│   │   │   ├── github.js        # ✨ Página GitHub
│   │   │   ├── relatorios.js    # ✨ Página Relatórios
│   │   │   └── api/
│   │   │       ├── dashboard.js # API endpoint
│   │   │       ├── github.js    # ✨ API GitHub
│   │   │       └── webhook/
│   │   │           └── github.js # ✨ Webhook GitHub
│   │   ├── styles/
│   │   │   ├── globals.css      # Estilos globais
│   │   │   └── animations.css   # ✨ 60+ animações
│   │   └── hooks/
│   │       └── useDarkMode.js   # Hook de dark mode
│   ├── public/
│   │   ├── manifest.json        # ✨ PWA manifest
│   │   ├── icon-192x192.png     # ✨ Ícone PWA
│   │   ├── icon-512x512.png     # ✨ Ícone PWA
│   │   └── sw.js                # ✨ Service Worker
│   ├── .env.local               # Variáveis de ambiente
│   ├── next.config.js           # ✨ Config Next.js + PWA
│   └── package.json
├── vercel.json                  # ✨ Config Vercel
├── README.md                    # Este arquivo
├── CHANGELOG.md                 # ✨ Histórico de versões
└── ESTADO-PROJETO.md            # ✨ Estado atual

✨ = Novos na v1.5.0
```

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Notion com workspace configurado
- Integração Notion criada ([Como criar](https://developers.notion.com/docs/create-a-notion-integration))
- Conta no GitHub (para integração)
- Git instalado

### Instalação

**1. Clone o repositório**

```bash
git clone https://github.com/Luiz-9858/kpi-dashboard-full-stack.git
cd kpi-dashboard-full-stack/frontend
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na pasta `frontend/`:

```env
# Notion API
NOTION_API_KEY=seu_token_aqui
NOTION_VERSION=2022-06-28

# Database IDs
NOTION_DB_TODAY_TASKS=id_da_database
NOTION_DB_HOURS_WEEK=id_da_database
NOTION_DB_HOUR_TRACKER=id_da_database
NOTION_DB_TASK_PANEL=id_da_database
NOTION_DB_ACTIVE_PROJECTS=id_da_database
NOTION_DB_ROADMAP=id_da_database
NOTION_DB_OKRS=id_da_database
NOTION_DB_KEY_RESULTS=id_da_database

# GitHub (Opcional para desenvolvimento local)
GITHUB_USERNAME=seu_usuario_github
GITHUB_WEBHOOK_SECRET=seu_secret_webhook
```

**4. Execute o servidor de desenvolvimento**

```bash
npm run dev
```

**5. Abra no navegador**

```
http://localhost:3000
```

---

## 📱 Instalar como PWA

### Desktop (Windows/Mac/Linux)

**Chrome/Edge:**

1. Abra `https://kpi-dashboard-full-stack.vercel.app`
2. Procure ícone de instalação na barra de endereço
3. Clique em "Instalar"
4. App abre em janela própria!

### Mobile

**Android (Chrome):**

1. Abra o site
2. Menu → "Instalar app" ou "Adicionar à tela inicial"
3. Confirmar
4. Ícone "K" aparece na tela inicial!

**iOS (Safari):**

1. Abra o site
2. Compartilhar → "Adicionar à Tela de Início"
3. Confirmar
4. Ícone "K" aparece na tela inicial!

---

## 🐙 Configurar Webhook GitHub

### 1. No Vercel

**Settings → Environment Variables:**

```
GITHUB_WEBHOOK_SECRET=seu-secret-aqui
```

### 2. No GitHub

**Repositório → Settings → Webhooks → Add webhook:**

```
Payload URL: https://kpi-dashboard-full-stack.vercel.app/api/webhook/github
Content type: application/json
Secret: mesmo-secret-do-vercel
Events: Push, Pull requests, Create, Delete
Active: ✅
```

### 3. Testar

Faça um commit e veja os logs no Vercel!

---

## 🔧 Configuração do Notion

### Databases Necessárias

O dashboard requer **7 databases** no Notion:

1. **Today's Tasks** - Tarefas do dia
2. **Hours This Week** - Horas planejadas vs reais
3. **Hour Tracker** - Registro histórico de horas
4. **Task Panel** - Painel geral de tarefas
5. **Active Projects** - Projetos em andamento
6. **12-Month Roadmap** - Roadmap anual
7. **OKRs** - Objetivos trimestrais
8. **Key Results** - Resultados-chave

**Documentação completa:** Veja `NOTION_SETUP.md`

---

## 📊 Visualizações do Dashboard

### 📈 Dashboard Principal (`/`)

- **Cards de estatísticas**: Horas semana, tasks completadas, streak, projetos ativos
- **KPIs Principais**: 6 cards com os KPIs mais importantes
- **Gráfico de barras**: Distribuição de tempo (Reais vs Planejadas)
- **Tasks de Hoje**: Lista das 5 próximas tasks com status
- **Progresso Semanal**: Barra de progresso com meta 20-23h
- **Card de Relatórios**: Acesso rápido aos insights semanais

### 🎯 KPIs Detalhados (`/kpis`)

- **Estatísticas gerais**: Total, Ótimo (🟢), Atenção (🟡), Crítico (🔴)
- **4 seções organizadas**: Produtividade, Prática, Aprendizado, Idioma
- **Cards individuais**: Cada KPI com valor, meta, status e barra de progresso
- **Sistema de cores**: Visual intuitivo do status

### 🚀 OKRs Q1 2026 (`/okrs`)

- **Progresso geral**: Porcentagem total e estatísticas
- **4 cards de OKRs**: Expansíveis ao clicar
- **16 Key Results**: Com progresso individual
- **Timeline Q1**: Visualização do trimestre
- **Status visual**: CheckCircle (completo) / Circle (pendente)

### 📁 Projetos Ativos (`/projetos`)

- **Cards de estatísticas**: Total, Em andamento, Concluídos
- **Filtros**: Todos / Ativos / Concluídos
- **Grid de projetos**: Cards com status, prioridade, progresso
- **Barras de progresso**: Visual por projeto
- **Categorias**: Diferentes cores por tipo

### 🐙 GitHub (`/github`) - ✨ NOVO

- **Cards de estatísticas**: Commits, PRs, Repos, Streak
- **Gráfico de commits**: Barras dos últimos 7 dias
- **Repositórios recentes**: Lista com linguagem e stars
- **Top linguagens**: Top 5 com porcentagem
- **Auto-refresh**: A cada 10 minutos
- **Webhook**: Atualização instantânea ao commitar

### 📊 Relatórios (`/relatorios`) - ✨ NOVO

- **Score de produtividade**: 0-100 com gráfico circular
- **Resumo semanal**: Horas, commits, tasks, streak
- **Insights automáticos**: Análise inteligente dos KPIs
- **Recomendações**: Sugestões personalizadas
- **Conquistas**: Badges desbloqueados
- **Avisos**: KPIs que precisam de atenção

---

## 🎨 Features Técnicas

### Performance

- ⚡ **Server-Side Rendering** (SSR) com Next.js
- 🔄 **Cache de 10 minutos** para reduzir chamadas à API
- 📦 **Code splitting** automático
- 🖼️ **Lazy loading** de componentes pesados
- 🚀 **Otimização de build** com Vercel
- 💾 **Service Worker** com cache de 24h para APIs

### UX/UI

- 🌓 **Dark mode** por padrão (toggle no header)
- 📱 **Design 100% responsivo** (mobile-first)
- ⌨️ **Acessibilidade** (ARIA labels)
- 🎯 **Loading states** elegantes
- ❌ **Error boundaries** para falhas graciosamente
- 💫 **60+ animações CSS** (stagger, hover, entrance)
- 🎨 **Sistema de cores** consistente

### Segurança

- 🔒 **Variáveis de ambiente** (.env.local)
- 🚫 **Token nunca exposto** no frontend
- ✅ **Validação de dados** da API
- 🛡️ **HTTPS obrigatório** (Vercel)
- 🔐 **CORS configurado** corretamente
- 🔑 **Webhook HMAC SHA256** validation

---

## 📈 Roadmap

### ✅ v1.5 (Atual) - PWA & Integrações

- ✅ PWA (Progressive Web App)
- ✅ Integração GitHub API completa
- ✅ GitHub Webhook (tempo real)
- ✅ Página /github
- ✅ Relatórios e Insights automáticos
- ✅ Sistema de animações CSS
- ✅ Cache inteligente

### 🔄 v1.6 (Próximo)

- 🔄 Export PDF de relatórios
- 🔄 Comparação mês a mês
- 🔄 Notificações push
- 🔄 Metas personalizáveis
- 🔄 Otimização com Redis

### 🔮 v2.0 (Futuro)

- 🔮 Machine Learning (previsão de tendências)
- 🔮 Gamificação (badges, níveis)
- 🔮 Integração Slack
- 🔮 Modo Pomodoro
- 🔮 API Pública
- 🔮 App Mobile (React Native)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Padrão de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/Luiz-9858/kpi-dashboard-full-stack/issues) com:

- Descrição do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (OS, browser, versão)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Luiz Fernando**

- GitHub: [@Luiz-9858](https://github.com/Luiz-9858)
- LinkedIn: [Luiz Fernando](www.linkedin.com/in/luiz-fernando-9747922b7)
- Portfolio: [kpi-dashboard-full-stack.vercel.app](https://kpi-dashboard-full-stack.vercel.app)

---

## 🙏 Agradecimentos

- **[Notion](https://notion.so)** - Pela API incrível
- **[GitHub](https://github.com)** - Pela API e webhooks
- **[Vercel](https://vercel.com)** - Pelo deploy gratuito e CI/CD
- **[Next.js](https://nextjs.org)** - Framework React fantástico
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS moderno
- **[Recharts](https://recharts.org)** - Biblioteca de gráficos
- **Comunidade Open Source** 💙

---

## 💡 Inspiração

Este projeto foi criado para resolver um problema real: **acompanhar meu progresso como desenvolvedor de forma visual e automática, com dados reais do Notion e GitHub**.

Se você é desenvolvedor e quer evoluir com dados, este dashboard pode te ajudar! 🚀

---

<div align="center">

**⭐ Se este projeto te ajudou ou inspirou, considere dar uma estrela! ⭐**

**Desenvolvido com ❤️ e ☕ por um desenvolvedor que quer evoluir com dados**

[![Instalar PWA](https://img.shields.io/badge/📱_Instalar-PWA-purple?style=for-the-badge)](https://kpi-dashboard-full-stack.vercel.app)

</div>
