# 📊 KPI Dashboard Full Stack

> Dashboard pessoal de produtividade integrado com Notion para acompanhamento de KPIs, projetos e OKRs como desenvolvedor Full Stack.

[![Deploy on Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)](https://kpi-dashboard-full-stack.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Notion API](https://img.shields.io/badge/Notion-API-black?style=for-the-badge&logo=notion)](https://developers.notion.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🎯 Sobre o Projeto

Dashboard completo para acompanhamento de produtividade pessoal como desenvolvedor, com integração 100% automática com o Notion. Permite visualizar KPIs, projetos ativos, OKRs trimestrais e métricas de estudo em tempo real.

**🔗 Demo ao vivo:** [kpi-dashboard-full-stack.vercel.app](https://kpi-dashboard-full-stack.vercel.app)

---

## ✨ Funcionalidades

### 📈 Dashboard Principal

- **Estatísticas da Semana**: Horas estudadas, tasks completadas, streak de dias consecutivos
- **KPIs Principais**: Horas de prática, teoria, inglês, dias estudados
- **Gráfico de Distribuição**: Visualização de horas reais vs planejadas por categoria
- **Tasks de Hoje**: Lista de tarefas do dia com prioridades e status
- **Progresso Semanal**: Barra de progresso com meta de 20-23h semanais

### 🎯 KPIs Detalhados

- **15 KPIs organizados em 4 categorias**:
  - 📅 **Produtividade**: Horas prática, teoria, inglês, total, dias estudados, streak
  - 💻 **Prática**: Commits GitHub, features concluídas, bugs resolvidos, PRs, projetos
  - 📚 **Aprendizado**: Módulos concluídos, exercícios de algoritmos, conceitos dominados
  - 🌐 **Idioma**: Lições Method Callan, worksheets
- Sistema de status visual (🟢 Ótimo, 🟡 Atenção, 🔴 Crítico)
- Barras de progresso com metas dinâmicas

### 🚀 OKRs Q1 2026

- **4 Objetivos principais** com 16 Key Results
- Acompanhamento de progresso por OKR
- Cards expansíveis com detalhes de cada KR
- Cálculo automático de progresso geral
- Timeline Q1 2026 (Jan-Mar)

### 📁 Projetos Ativos

- **7 projetos em andamento**
- Filtros: Todos, Ativos, Concluídos
- Cards com status, prioridade, progresso e categoria
- Estatísticas: Total, Em Andamento, Concluídos

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **[Next.js 14.2](https://nextjs.org/)** - Framework React com SSR
- **[React 18](https://react.dev/)** - Biblioteca para interfaces
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[date-fns](https://date-fns.org/)** - Manipulação de datas

### Backend & API

- **[Notion API](https://developers.notion.com/)** - Integração com databases
- **[@notionhq/client](https://github.com/makenotion/notion-sdk-js)** - SDK oficial do Notion
- **Next.js API Routes** - Endpoints serverless

### Deploy & Infraestrutura

- **[Vercel](https://vercel.com/)** - Hospedagem e CI/CD
- **Environment Variables** - Gestão segura de secrets

---

## 📊 Arquitetura

```
┌─────────────────────────────────────────────┐
│           Frontend (Next.js)                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │  Home   │  │  KPIs   │  │  OKRs   │    │
│  └────┬────┘  └────┬────┘  └────┬────┘    │
│       │            │             │          │
│       └────────────┼─────────────┘          │
│                    │                        │
│              ┌─────▼──────┐                │
│              │ API Routes │                │
│              └─────┬──────┘                │
└────────────────────┼────────────────────────┘
                     │
              ┌──────▼───────┐
              │  Notion API  │
              └──────┬───────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
   │ Today's │ │  Hours  │ │ Active  │
   │  Tasks  │ │  Week   │ │Projects │
   └─────────┘ └─────────┘ └─────────┘
```

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Notion com workspace configurado
- Integração Notion criada ([Como criar](https://developers.notion.com/docs/create-a-notion-integration))

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/Luiz-9858/kpi-dashboard-full-stack.git
cd kpi-dashboard-full-stack/frontend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na pasta `frontend/`:

```env
NOTION_API_KEY=seu_token_aqui
NOTION_VERSION=2022-06-28
NOTION_DB_TODAY_TASKS=id_da_database
NOTION_DB_HOURS_WEEK=id_da_database
NOTION_DB_HOUR_TRACKER=id_da_database
NOTION_DB_TASK_PANEL=id_da_database
NOTION_DB_ACTIVE_PROJECTS=id_da_database
NOTION_DB_ROADMAP=id_da_database
```

4. **Execute o servidor de desenvolvimento**

```bash
npm run dev
```

5. **Abra no navegador**

```
http://localhost:3000
```

---

## 📁 Estrutura de Pastas

```
frontend/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Header.js
│   │   ├── StatsCard.js
│   │   ├── KPICard.js
│   │   ├── Charts.js
│   │   └── Loading.js
│   ├── lib/              # Lógica de negócio
│   │   ├── notion.js     # Conexão com Notion API
│   │   ├── kpis.js       # Cálculo de KPIs
│   │   ├── constants.js  # Constantes e OKRs
│   │   └── utils.js      # Funções utilitárias
│   ├── pages/            # Páginas do Next.js
│   │   ├── index.js      # Dashboard principal
│   │   ├── kpis.js       # Página de KPIs
│   │   ├── okrs.js       # Página de OKRs
│   │   ├── projetos.js   # Página de Projetos
│   │   └── api/
│   │       └── dashboard.js  # API endpoint
│   └── styles/
│       └── globals.css   # Estilos globais
├── public/               # Arquivos estáticos
├── .env.local           # Variáveis de ambiente (não commitado)
├── .gitignore
├── package.json
└── README.md
```

---

## 🔧 Configuração do Notion

### Databases Necessárias

O dashboard requer 6 databases no Notion:

1. **Today's Tasks** - Tarefas do dia
   - Name (título)
   - Priority Level (select)
   - Estimated Time (number)
   - Status (status)

2. **Hours This Week** - Horas da semana
   - Activity (título)
   - Category (select)
   - Horas Plan. (number)
   - Horas Real. (number)

3. **Hour Tracker** - Histórico de horas
   - 📋 Activity (rich_text)
   - 📅 Date (date)
   - ⏱️ Hours (number)
   - 📂 Category (select)

4. **Task Panel** - Painel de tarefas
   - Task (título)
   - Category (select)
   - Priority (select)
   - Status (select)

5. **Active Projects** - Projetos ativos
   - Projetos Ativos (título)
   - Status (status)
   - Prioridade (select)
   - Progresso (select)

6. **12-Month Roadmap** - Roadmap anual
   - Name (título)
   - Date (date)
   - Categoria (select)
   - Status (select)

### Permissões

Compartilhe todas as databases com sua integração Notion!

---

## 📈 KPIs Calculados

### Produtividade (6 KPIs)

- Horas Prática: 12-15h/semana
- Horas Teoria: 5-8h/semana
- Horas Inglês: 3-5h/semana
- Total Horas: 20-23h/semana
- Dias Estudados: 6-7 dias/semana
- Streak: 7+ dias consecutivos

### Prática (5 KPIs)

- Commits GitHub: 20-30/semana
- Features Concluídas: 3-5/semana
- Bugs Resolvidos: 5-8/semana
- Pull Requests: 2-4/mês
- Projetos Finalizados: 1-2/trimestre

### Aprendizado (3 KPIs)

- Módulos Concluídos: 3-5/semana
- Exercícios Algoritmos: 10-15/semana
- Conceitos Dominados: 2-3/semana

### Idioma (2 KPIs)

- Lições Method Callan: 3/semana
- Worksheets: 2/semana

---

## 🎨 Features Técnicas

### Performance

- ⚡ Server-Side Rendering (SSR)
- 🔄 Cache de 5 minutos
- 📦 Code splitting automático
- 🖼️ Lazy loading de componentes

### UX/UI

- 🌓 Dark mode nativo
- 📱 Design 100% responsivo
- ⌨️ Acessibilidade (ARIA)
- 🎯 Loading states elegantes
- ❌ Error boundaries

### Segurança

- 🔒 Variáveis de ambiente
- 🚫 Token nunca exposto no frontend
- ✅ Validação de dados
- 🛡️ HTTPS obrigatório (Vercel)

---

## 🚢 Deploy

### Vercel (Recomendado)

1. **Importe o repositório no Vercel**
2. **Configure as variáveis de ambiente** (mesmas do `.env.local`)
3. **Deploy automático!**

```bash
vercel --prod
```

### Outras plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

## 📝 Roadmap

### Fase 2 - Automação Completa

- [ ] Automatizar OKRs do Notion
- [ ] Cache global Redis
- [ ] Otimização de carregamento (2s → 0.5s)

### Fase 3 - Novas Features

- [ ] Integração GitHub API (commits reais)
- [ ] Gráficos avançados (burn-down, velocity)
- [ ] Exportar relatórios PDF
- [ ] Notificações push
- [ ] API pública

### Fase 4 - Mobile

- [ ] Progressive Web App (PWA)
- [ ] App React Native
- [ ] Widgets iOS/Android

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Luiz Fernando**

- GitHub: [@Luiz-9858](https://github.com/Luiz-9858)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- Portfolio: [kpi-dashboard-full-stack.vercel.app](https://kpi-dashboard-full-stack.vercel.app)

---

## 🙏 Agradecimentos

- [Notion](https://notion.so) pela API incrível
- [Vercel](https://vercel.com) pelo deploy gratuito
- [Next.js](https://nextjs.org) pelo framework fantástico
- Comunidade open source 💙

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela! ⭐**

Made with ❤️ and ☕

</div>
