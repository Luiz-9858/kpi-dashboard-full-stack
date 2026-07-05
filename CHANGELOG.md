# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] (v2.0.0 - Q3 2026)

### Planejado

- 🔐 Autenticação com Google/GitHub OAuth
- 👥 Múltiplos usuários e team collaboration
- 💳 Planos de pagamento (Stripe integration)
- 📱 App mobile nativo (React Native)
- 🤖 IA/Recomendações baseado em histórico
- 🔌 Slack integration para notificações
- ⏲️ Pomodoro timer integrado
- 🎮 Gamificação (badges, leaderboard, achievements)
- 📊 Advanced analytics e relatórios customizados

---

## [1.6.0] - 2026-06-14

### Adicionado

#### 🔔 Sistema Completo de Notificações

- **NotificationBell**: Ícone no header com badge contador
- **NotificationCenter**: Modal responsivo com lista de notificações
- **NotificationItem**: Componente individual com ações
- **Tipos de notificações**:
  - ⚠️ Alertas (KPIs abaixo de 50%)
  - ⚡ Avisos (KPIs abaixo de 80%)
  - ✅ Sucessos (Tasks, streak, metas atingidas)
  - 💡 Informações (Dicas, motivação)
- **Filtros**: Por tipo (Alertas, Avisos, Sucessos, Informações)
- **Persistência**: localStorage para notificações descartadas
- **Auto-dismiss**: Notificações desaparecem ao navegar (localStorage)
- **Context API**: useNotifications hook para consumo global

#### 📊 Formatação de Horas

- `formatHours()` em utils.js para conversão de decimais
- Exemplo: `8.74h` → `8h 44min`
- Aplicado em: Dashboard, Progresso Semanal, Relatórios
- Atualização automática conforme dados mudam

#### 🔧 Correções de Comparação

- `getTopLanguages()` agora usa **bytes de código** (não repos)
- Formatação corrigida: `1.2000000000000002h` → `1.2h`
- Percentuais com 1 casa decimal
- Gráfico de tendência com dados precisos

### Corrigido

- ✅ Notificações resetando ao mudar página (localStorage)
- ✅ Horas em formato decimal sem espaço (8h 44min)
- ✅ Linguagens GitHub contando por bytes (não repos)
- ✅ Erro 404 ao clicar em notificações
- ✅ Scroll em NotificationCenter
- ✅ Timestamps de notificações atualizando incorretamente
- ✅ Contagem de notificações inconsistente
- ✅ Badge de notificação decrescendo corretamente

### Performance

- **First Load JS**: 206 kB (estável)
- **API Response**: 1.2s com cache: 104ms
- **Lighthouse Score**: 95+ Performance
- **Notificações**: Renderização O(n) otimizada com React.memo

### Dependências Adicionadas

```json
{
  "jspdf": "^2.5.1",
  "html2canvas": "^1.4.1"
}
```

### Commits Principais

- `feat: criar lib/notifications.js - lógica de geração`
- `feat: criar hooks/useNotifications.js - gerenciamento`
- `feat: criar NotificationItem.js - componente`
- `feat: criar NotificationCenter.js - modal`
- `feat: criar NotificationBell.js - ícone`
- `feat: integrar NotificationProvider em _app.js`
- `fix: formatar decimais em comparação mês a mês`
- `feat: usar formatHours() em dashboard`

---

## [1.5.0] - 2026-05-29

### Adicionado

#### 📱 Progressive Web App (PWA)

- Manifest.json com ícones e configurações
- Service Worker para funcionalidade offline
- Instalável em desktop, mobile, tablet
- Cache inteligente de assets
- Suporte a notificações push (preparado)

#### 🔗 GitHub Integration Completa

- **GitHub API v3**:
  - Fetch de todos os repositórios (não limita a 10)
  - Commits dos últimos 7 dias
  - Pull Requests e status
  - Linguagens por bytes de código
  - Streak de commits (dias consecutivos)
- **GitHub Webhook**:
  - Endpoint `/api/webhook/github`
  - HMAC SHA256 validation
  - Atualização em tempo real de commits
- **Cache**: 10 minutos em memória para otimizar

#### 📊 Página /github

- Estatísticas de commits
- Total de PRs (open, closed, merged)
- Linguagens mais usadas com percentuais
- Dados de timezone GMT-3 (Brasil) corrigidos

#### 🎯 OKRs Completos

- Página `/okrs` com timeline automática
- Visualização por trimestre (Q1, Q2, Q3, Q4)
- Key Results com progress bars
- Timeline inteligente detectando trimestre atual
- Próxima data de revisão (domingos)

#### 📄 PDF Export de Relatórios

- Função `generateReportPDF()` em lib/pdfExport.js
- Layout A4 profissional com:
  - Logo e cabeçalho customizado
  - Score de produtividade colorido
  - Resumo semanal formatado
  - Tabela de KPIs com status
  - Insights automáticos
  - Rodapé com paginação
- Arquivo: `relatorio-semanal-YYYY-MM-DD.pdf`
- Download automático ao clicar

#### 🌙 Dark Mode Completo

- Toggle no header
- Persistência com localStorage
- Aplicado em todas as páginas
- Cores otimizadas para contraste
- Suporte a prefers-color-scheme

#### 📈 Dashboard Responsivo

- Cards de resumo (Horas, Commits, Tasks, Streak)
- Gráficos animados (linha, barra, pizza)
- 60+ animações CSS suaves
- Grid responsivo (mobile-first)
- Loading skeleton states

#### 🎨 Componentes Base

- StatsCard com ícones
- KPICard com cores por status
- LineChart, BarChart, PieChart
- Header com navegação
- Loading states animados

### Corrigido

- ✅ Fuso horário GMT-3 em commits
- ✅ Commits contando múltiplos repos corretamente
- ✅ Cache não resetando desnecessariamente
- ✅ Webhook validação HMAC

### Performance

- **Build Time**: ~20s
- **First Load JS**: 206 kB
- **Cache**: 10 minutos em memória
- **API Response**: ~1.2s (primeiro), ~104ms (cached)
- **Lighthouse**: 95+ Performance, 90+ Accessibility

### Tecnologias Principais

```json
{
  "next": "^14.2.35",
  "react": "^18.3.1",
  "recharts": "^2.10.3",
  "date-fns": "^3.0.0",
  "next-pwa": "^5.6.0",
  "tailwindcss": "^3.4.1"
}
```

### Commits Principais

- `feat: adicionar PWA com service worker`
- `feat: integrar GitHub API (commits, PRs, linguagens)`
- `feat: adicionar webhook GitHub com HMAC`
- `feat: criar página /okrs com timeline`
- `feat: implementar PDF export de relatórios`
- `feat: dark mode com localStorage`
- `feat: dashboard responsivo com gráficos`

---

## [1.4.0] - 2026-05-15

### Adicionado

#### 📊 Comparação Mês a Mês

- Página `/comparacao` com análise
- Gráfico de tendência com Recharts
- Cards de comparação:
  - Diferença entre meses
  - Percentual de mudança
  - Status visual (up, down, same)
  - Emoji indicador
- Dados obtidos do Notion
- Atualização automática

#### 💾 Notion Integration

- **Conexão**: Notion API v1 (2022-06-28)
- **Databases conectados**:
  - Hour Tracker (horas semanais)
  - OKRs (objetivos)
  - Key Results (meta dos OKRs)
  - Today Tasks (tarefas diárias)
  - Task Panel (painel geral)
  - Active Projects (projetos)
  - Roadmap (roadmap de features)

#### 🎯 KPI Card Component

- Exibição colorida por status
- Ícones customizáveis
- Progress bars animadas
- Categoria de KPI destacada

### Corrigido

- ✅ Conexão com Notion mais robusta
- ✅ Tratamento de erros de API

### Commits Principais

- `feat: criar lib/comparison.js`
- `feat: criar páginas de comparação`
- `feat: integrar Notion API`

---

## [1.3.0] - 2026-05-01

### Adicionado

#### 🎨 Animações CSS

- 60+ animações suaves
- Fade in/out
- Slide animations
- Scale transforms
- Skeleton loading states
- Pulse effects em badges
- Bounce animations em botões

#### 🌈 Sistema de Cores

- Danger (vermelho): Status crítico
- Warning (amarelo): Atenção necessária
- Success (verde): Tudo bem
- Info (azul): Informações
- Dark mode automático

#### 📱 Responsividade Completa

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Flexbox e Grid layouts
- Touch-friendly buttons (min 44px)
- Font sizes escaláveis

### Commits Principais

- `feat: adicionar animações CSS globais`
- `feat: implementar sistema de cores`
- `feat: responsive design mobile-first`

---

## [1.2.0] - 2026-04-15

### Adicionado

#### 📖 Páginas Estrutura

- `/` - Dashboard
- `/okrs` - OKRs
- `/github` - GitHub Stats
- `/relatorios` - Relatórios
- `/kpis` - KPIs detalhados
- `/comparacao` - Comparação mês a mês
- `404` - Página de erro

#### 🧩 Componentes Base

- Header com navegação
- Loading component
- Error state
- Empty state
- Skeleton loaders

### Commits Principais

- `feat: criar estrutura de páginas`
- `feat: adicionar componentes base`

---

## [1.1.0] - 2026-04-01

### Adicionado

#### ⚙️ Setup Inicial

- Next.js 14 configurado
- Tailwind CSS integrado
- eslint e prettier
- tsconfig (opcional)
- vercel.json para deploy

#### 📁 Estrutura de Pastas

- `/pages` - Rotas
- `/components` - Componentes React
- `/lib` - Funções utilitárias
- `/hooks` - Custom hooks
- `/styles` - CSS global
- `/public` - Assets estáticos

### Commits Principais

- `init: criar projeto Next.js base`
- `chore: configurar Tailwind`
- `chore: configurar linting`

---

## [1.0.0] - 2026-03-20

### Adicionado

#### 🎉 Lançamento Inicial

- Projeto base iniciado
- Repositório criado no GitHub
- Deployment em Vercel configurado
- README.md inicial
- CHANGELOG.md criado

### Commits Principais

- `feat: initial commit com estrutura base`

---

## Versionamento

Este projeto segue [SemVer](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes, novas features grandes
- **MINOR** (1.1.0): Novas features compatíveis
- **PATCH** (1.1.1): Bug fixes

---

## Como Contribuir

Ao contribuir, siga o padrão de commits:

- `feat:` - Nova feature
- `fix:` - Bug fix
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `perf:` - Melhoria de performance
- `test:` - Testes
- `chore:` - Housekeeping

Exemplo: `feat: adicionar dark mode com localStorage`

---

## Links Úteis

- [GitHub Repository](https://github.com/Luiz-9858/kpi-dashboard-full-stack)
- [Deploy Vercel](https://kpi-dashboard-full-stack.vercel.app)
- [Notion Template](https://notion.so)
- [GitHub API Docs](https://docs.github.com/rest)

---

## Roadmap Futuro

### v2.0.0 (Q3 2026)

- Autenticação OAuth
- Multi-user support
- Planos de pagamento
- Slack integration

### v2.1.0 (Q4 2026)

- Mobile app (React Native)
- IA e recomendações
- Advanced analytics

### v3.0.0 (2027)

- Marketplace de templates
- API pública
- Integrações externas

---

**Última atualização**: Junho 14, 2026

⭐ Se gostou deste projeto, considere dar uma star no GitHub!
