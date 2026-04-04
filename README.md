# 📊 KPI Dashboard Full Stack

> Dashboard personalizado integrado com Notion API para visualização de KPIs, OKRs e acompanhamento de progresso como desenvolvedor Full Stack

[![Deploy on Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)](https://kpi-dashboard-full-stack.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Notion API](https://img.shields.io/badge/Notion-API-black?style=for-the-badge&logo=notion)](https://developers.notion.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**🔗 Demo ao vivo:** [kpi-dashboard-full-stack.vercel.app](https://kpi-dashboard-full-stack.vercel.app)

> ⚠️ **Nota de Privacidade**: Os dados exibidos na demo são pessoais e reais, utilizados para acompanhamento de metas de desenvolvimento. O código é público, mas as credenciais do Notion são privadas e seguras.

---

## 📊 Visão Geral

Sistema completo de tracking de progresso para desenvolvedores, integrando automaticamente com o Notion para extrair dados de tarefas, horas de estudo, projetos e gerar visualizações em tempo real.

### ✨ Funcionalidades Principais

- 📈 **Dashboard Principal** - Estatísticas da semana, tasks completadas, streak de dias consecutivos
- 🎯 **15 KPIs Automáticos** - Organizados em 4 categorias (Produtividade, Prática, Aprendizado, Idioma)
- 🚀 **OKRs Q1 2026** - 4 objetivos trimestrais com 16 Key Results
- 📁 **Projetos Ativos** - Acompanhamento de 7 projetos em andamento
- 📊 **Gráficos Interativos** - Distribuição de tempo, progresso semanal, tendências
- 🌓 **Dark/Light Mode** - Tema escuro por padrão
- 📱 **100% Responsivo** - Mobile, tablet e desktop
- 🔥 **Heatmap GitHub Style** - Visualização de dias de estudo
- ⚡ **Atualização Automática** - Sincronização em tempo real com Notion

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

- 📚 Curso HashTag: 37% → 100% - **45%**
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

| #   | KPI                  | Meta Semanal | Meta Mensal  | Medição                       |
| --- | -------------------- | ------------ | ------------ | ----------------------------- |
| 7   | Commits GitHub       | 20-30        | 80-120       | GitHub API (futuro)           |
| 8   | Features Concluídas  | 3-5          | 12-20        | Task Panel (status: Complete) |
| 9   | Bugs Resolvidos      | 5-8          | 20-32        | Task Panel (tag: bug)         |
| 10  | Pull Requests        | -            | 2-4          | GitHub API (futuro)           |
| 11  | Projetos Finalizados | -            | Trimestre: 2 | Task Panel (progress: 100%)   |

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
- **Estilização**: Tailwind CSS
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Datas**: date-fns
- **HTTP**: Fetch API

### Backend & API

- **Runtime**: Node.js 20+
- **API Routes**: Next.js Serverless Functions
- **Notion SDK**: @notionhq/client
- **Cache**: Em memória (5 minutos)

### Deploy & Infraestrutura

- **Hospedagem**: Vercel
- **CI/CD**: GitHub Actions (automático)
- **Variáveis de Ambiente**: Vercel Environment Variables
- **HTTPS**: Incluído (Vercel)

---

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Header.js        # Cabeçalho e navegação
│   │   ├── StatsCard.js     # Cards de estatísticas
│   │   ├── KPICard.js       # Cards de KPIs
│   │   ├── Charts.js        # Gráficos (Recharts)
│   │   └── Loading.js       # Estados de loading/error
│   ├── lib/                 # Lógica de negócio
│   │   ├── notion.js        # Conexão Notion API
│   │   ├── kpis.js          # Cálculo de KPIs
│   │   ├── constants.js     # OKRs e constantes
│   │   └── utils.js         # Funções utilitárias
│   ├── pages/               # Páginas Next.js
│   │   ├── index.js         # Dashboard principal
│   │   ├── kpis.js          # Página de KPIs
│   │   ├── okrs.js          # Página de OKRs
│   │   ├── projetos.js      # Página de Projetos
│   │   └── api/
│   │       └── dashboard.js # API endpoint
│   └── styles/
│       └── globals.css      # Estilos globais
├── public/                  # Assets estáticos
├── .env.local              # Variáveis de ambiente (não commitado)
├── .gitignore
├── package.json
└── README.md               # Este arquivo
```

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Notion com workspace configurado
- Integração Notion criada ([Como criar](https://developers.notion.com/docs/create-a-notion-integration))
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

## 🔧 Configuração do Notion

### Databases Necessárias

O dashboard requer **6 databases** no Notion:

#### 1. **Today's Tasks** - Tarefas do dia

**Propriedades:**

- `Name` (título) - Nome da task
- `Priority Level` (select) - 🔴 Alta / 🟡 Média / 🟢 Baixa
- `Estimated Time` (number) - Horas estimadas
- `Status` (status) - A Fazer / Fazendo / Concluído
- `Description` (rich_text) - Descrição

#### 2. **Hours This Week** - Horas planejadas vs reais

**Propriedades:**

- `Time dedicated during the week🤖` (título)
- `Category` (select) - 🔵 Estudos / 🟣 Projetos / 🟠 Idiomas / 🟢 Desenvolvimento Pessoal
- `Horas Plan.` (number) - Horas planejadas
- `Horas Real.` (number) - Horas realizadas
- `Status` (status) - Estado atual
- `Description` (url) - Link relacionado

#### 3. **Hour Tracker** - Registro histórico de horas

**Propriedades:**

- `📝 Prohibited` (título) - Nome
- `📋 Activity` (rich_text) - Atividade realizada
- `📅 Date` (date) - Data do registro
- `⏱️ Hours` (number) - Horas gastas
- `📂 Category` (select) - Categoria
- `💼 Project` (select) - Projeto relacionado
- `📌 Notas` (rich_text) - Observações

#### 4. **Task Panel** - Painel geral de tarefas

**Propriedades:**

- `Task` (título) - Nome da task
- `Category` (select) - Categoria
- `Priority` (select) - Prioridade
- `Status` (select) - Status
- `Estimated Time` (number) - Tempo estimado
- `Real Time` (number) - Tempo real
- `Progress` (select) - Porcentagem (0%, 25%, 50%, 75%, 100%)

#### 5. **Active Projects** - Projetos em andamento

**Propriedades:**

- `Projetos Ativos (4-8 meses)` (título) - Nome do projeto
- `Status` (status) - Em desenvolvimento / Em teste / Pausado
- `Prioridade` (select) - 🔴 Urgente / 🟠 Alta / 🟡 Média / 🟢 Baixa
- `Progresso` (select) - 🔴 0-25% / 🟡 25-50% / 🟠 50-75% / 🟢 75-100%
- `Categoria` (select) - Tipo do projeto

#### 6. **12-Month Roadmap** - Roadmap anual

**Propriedades:**

- `Projetos do ano de 2026` (título)
- `Date` (date) - Data/deadline
- `Categoria` (select) - Área
- `Status` (select) - Estado
- `Prioridade` (select) - Prioridade
- `Descrição` (rich_text) - Detalhes

### Obter Database IDs

1. Abra a database no Notion
2. Clique em "Share" → "Copy link"
3. O ID está na URL:

```
https://notion.so/workspace/DATABASE_ID?v=...
                          ^^^^^^^^^^^^^^^^
```

### Compartilhar com a Integração

Para cada database:

1. Clique em `•••` (menu)
2. "Add connections"
3. Selecione sua integração
4. ✅ Confirm

---

## 🎨 Features Técnicas

### Performance

- ⚡ **Server-Side Rendering** (SSR) com Next.js
- 🔄 **Cache de 5 minutos** para reduzir chamadas à API
- 📦 **Code splitting** automático
- 🖼️ **Lazy loading** de componentes pesados
- 🚀 **Otimização de build** com Vercel

### UX/UI

- 🌓 **Dark mode** por padrão (toggle no header)
- 📱 **Design 100% responsivo** (mobile-first)
- ⌨️ **Acessibilidade** (ARIA labels)
- 🎯 **Loading states** elegantes
- ❌ **Error boundaries** para falhas graciosamente
- 💫 **Animações suaves** com Tailwind

### Segurança

- 🔒 **Variáveis de ambiente** (.env.local)
- 🚫 **Token nunca exposto** no frontend
- ✅ **Validação de dados** da API
- 🛡️ **HTTPS obrigatório** (Vercel)
- 🔐 **CORS configurado** corretamente

---

## 📊 Visualizações do Dashboard

### 📈 Dashboard Principal (`/`)

- **Cards de estatísticas**: Horas semana, tasks completadas, streak, projetos ativos
- **KPIs Principais**: 6 cards com os KPIs mais importantes
- **Gráfico de barras**: Distribuição de tempo (Reais vs Planejadas)
- **Tasks de Hoje**: Lista das 5 próximas tasks com status
- **Progresso Semanal**: Barra de progresso com meta 20-23h

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

---

## 🔔 Sistema de Notificações (Roadmap)

### Alertas planejados:

- ❌ Horas semanais < 18h
- ❌ Dias sem estudar > 1
- ❌ Commits semanais < 15
- ❌ Features semanais < 2
- ⚠️ Qualquer KPI abaixo de 80% da meta

**Status:** 🔮 Planejado para v1.1

---

## 🚢 Deploy

### Vercel (Recomendado)

**1. Importe o repositório**

- Vá para [vercel.com](https://vercel.com)
- New Project → Import from GitHub
- Selecione `kpi-dashboard-full-stack`

**2. Configure variáveis de ambiente**

Adicione todas as variáveis do `.env.local`:

- `NOTION_API_KEY`
- `NOTION_VERSION`
- `NOTION_DB_TODAY_TASKS`
- `NOTION_DB_HOURS_WEEK`
- `NOTION_DB_HOUR_TRACKER`
- `NOTION_DB_TASK_PANEL`
- `NOTION_DB_ACTIVE_PROJECTS`
- `NOTION_DB_ROADMAP`

**3. Deploy!**

Clique em "Deploy" e aguarde ~3 minutos ✅

**4. Atualizações automáticas**

Cada push no GitHub = novo deploy automático! 🚀

### Outras Plataformas

O projeto é compatível com:

- **Netlify**: Suporta Next.js
- **Railway**: Deploy direto do GitHub
- **AWS Amplify**: Integração com Next.js
- **Google Cloud Run**: Containerização

---

## 📈 Roadmap

### ✅ v1.0 (Atual)

- ✅ Integração completa com Notion (6 databases)
- ✅ 15 KPIs calculados automaticamente
- ✅ 4 OKRs Q1 2026 com 16 Key Results
- ✅ Dashboard visual com gráficos
- ✅ 4 páginas (Home, KPIs, OKRs, Projetos)
- ✅ Tema dark/light
- ✅ Mobile 100% responsivo
- ✅ Deploy Vercel

### 🔄 v1.1 (Próximo)

- 🔄 Integração GitHub API (commits reais)
- 🔄 Cache global com Redis
- 🔄 Otimização de loading (24s → 2s)
- 🔄 Export PDF de relatórios
- 🔄 Comparação mês a mês
- 🔄 Metas personalizáveis por semana
- 🔄 Sistema de notificações

### 🔮 v2.0 (Futuro)

- 🔮 **Automação total**: OKRs do Notion (eliminar atualização manual)
- 🔮 **Machine Learning**: Previsão de tendências e metas
- 🔮 **Gamificação**: Badges, níveis, conquistas
- 🔮 **Integração Slack**: Notificações e resumos
- 🔮 **Modo Pomodoro**: Timer integrado
- 🔮 **API Pública**: Endpoints para consumo externo
- 🔮 **Progressive Web App** (PWA)
- 🔮 **App Mobile**: React Native (iOS/Android)

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

Você é livre para:

- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Usar em projetos privados

---

## 👤 Autor

**Luiz Fernando**

- GitHub: [@Luiz-9858](https://github.com/Luiz-9858)
- LinkedIn: [Seu Perfil](www.linkedin.com/in/luiz-fernando-9747922b7)
- Portfolio: [kpi-dashboard-full-stack.vercel.app](https://kpi-dashboard-full-stack.vercel.app)
- Email: seu@email.com

---

## 🙏 Agradecimentos

- **[Notion](https://notion.so)** - Pela API incrível e plataforma versátil
- **[Vercel](https://vercel.com)** - Pelo deploy gratuito e CI/CD automático
- **[Next.js](https://nextjs.org)** - Framework React fantástico
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS moderno
- **[Recharts](https://recharts.org)** - Biblioteca de gráficos elegante
- **Comunidade Open Source** 💙

---

## 💡 Inspiração

Este projeto foi criado para resolver um problema real: **acompanhar meu progresso como desenvolvedor de forma visual e automática**.

Se você é desenvolvedor e quer evoluir com dados, este dashboard pode te ajudar! 🚀

---

<div align="center">

**⭐ Se este projeto te ajudou ou inspirou, considere dar uma estrela! ⭐**

**Desenvolvido com ❤️ e ☕ por um desenvolvedor que quer evoluir com dados**

</div>
test
test
test
