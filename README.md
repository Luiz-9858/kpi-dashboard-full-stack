# 🎨 Frontend - KPI Dashboard

Este diretório contém todo o código frontend do dashboard em Next.js + React.

---

## 📁 Estrutura de Pastas

```
frontend/
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── KPICard.js           # Card de KPI individual
│   │   ├── StatsCard.js         # Card de estatísticas rápidas
│   │   ├── Charts.js            # Gráficos (Recharts)
│   │   ├── Header.js            # Cabeçalho com navegação
│   │   └── Loading.js           # Estados de loading e erro
│   │
│   ├── hooks/            # React Hooks customizados
│   │   ├── useTheme.js          # Gerenciamento de tema dark/light
│   │   └── useDashboard.js      # Fetch de dados da API
│   │
│   ├── lib/              # Funções auxiliares e lógica
│   │   ├── notion.js            # Cliente Notion API
│   │   ├── kpis.js              # Cálculo de KPIs
│   │   ├── utils.js             # Funções utilitárias gerais
│   │   └── constants.js         # Constantes do projeto
│   │
│   ├── pages/            # Páginas Next.js (rotas)
│   │   ├── _app.js              # App wrapper (layout global)
│   │   ├── _document.js         # HTML base
│   │   ├── index.js             # Página inicial (dashboard)
│   │   └── api/
│   │       └── dashboard.js     # API endpoint
│   │
│   └── styles/           # Estilos CSS
│       └── globals.css          # Estilos globais + Tailwind
│
├── public/               # Arquivos estáticos
│   └── README.md                # Guia de arquivos públicos
│
├── package.json          # Dependências do projeto
├── next.config.js        # Configuração Next.js
├── tailwind.config.js    # Configuração Tailwind CSS
├── postcss.config.js     # Configuração PostCSS
└── jsconfig.json         # Configuração JavaScript (alias @)
```

---

## 🚀 Scripts Disponíveis

### Desenvolvimento

```bash
npm run dev
```
- Inicia servidor de desenvolvimento
- Hot reload habilitado
- Acesse em: http://localhost:3000

### Build

```bash
npm run build
```
- Cria build otimizado para produção
- Gera pasta `.next/`
- Minifica código

### Produção

```bash
npm run start
```
- Inicia servidor em modo produção
- Requer build prévio
- Otimizado para performance

### Lint

```bash
npm run lint
```
- Verifica erros no código
- Next.js ESLint config

---

## 🛠️ Stack Tecnológica

### Core

- **Next.js 14** - Framework React
- **React 18** - Biblioteca UI
- **Node.js 20+** - Runtime

### Estilização

- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - Processador CSS
- **CSS Modules** - Scoped CSS (opcional)

### Dados

- **@notionhq/client** - Cliente oficial Notion
- **date-fns** - Manipulação de datas

### Gráficos

- **Recharts** - Biblioteca de gráficos React

### Ícones

- **lucide-react** - Ícones modernos

### Utilidades

- **clsx** - Combinar classes CSS

---

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo de variáveis de ambiente
cp ../.env.example .env.local

# Editar .env.local com suas credenciais
nano .env.local

# Rodar em desenvolvimento
npm run dev
```

---

## 🎨 Componentes

### KPICard

Card para exibir um KPI individual com status visual.

```jsx
import KPICard from '@/components/KPICard';
import { Code } from 'lucide-react';

<KPICard 
  kpi={{
    title: 'Horas Prática',
    value: 14,
    unit: 'h',
    target: { min: 12, max: 15 },
    status: 'success',
    icon: Code,
  }}
/>
```

### StatsCard

Card para estatísticas rápidas no topo do dashboard.

```jsx
import StatsCard from '@/components/StatsCard';
import { Clock } from 'lucide-react';

<StatsCard 
  stat={{
    title: 'Horas esta semana',
    value: '22h',
    subtitle: 'Meta: 20-23h',
    icon: Clock,
    color: 'blue',
    trend: 'up',
    trendValue: 3,
  }}
/>
```

### Charts

Gráficos pré-configurados com tema dark/light.

```jsx
import { LineChartComponent, BarChartComponent } from '@/components/Charts';

<LineChartComponent
  title="Horas por Semana"
  data={weeklyData}
  xAxisKey="week"
  dataKeys={[{ dataKey: 'hours', name: 'Horas' }]}
/>
```

### Loading States

```jsx
import Loading, { SkeletonCard, ErrorState } from '@/components/Loading';

{loading && <Loading message="Carregando..." />}
{error && <ErrorState error={error} onRetry={refresh} />}
```

---

## 🎣 Hooks

### useTheme

Gerencia tema dark/light com persistência.

```jsx
import { useTheme } from '@/hooks/useTheme';

const { isDark, toggleTheme } = useTheme();
```

### useDashboard

Busca dados da API com cache e auto-refresh.

```jsx
import { useDashboard } from '@/hooks/useDashboard';

const { data, loading, error, refresh } = useDashboard({
  enableCache: true,
  autoRefresh: false,
});
```

---

## 🔧 Configuração

### Variáveis de Ambiente

Crie `.env.local` na raiz de `frontend/`:

```env
NOTION_API_KEY=secret_...
NOTION_DB_TODAY_TASKS=...
NOTION_DB_HOURS_WEEK=...
NOTION_DB_HOUR_TRACKER=...
NOTION_DB_TASK_PANEL=...
NOTION_DB_ACTIVE_PROJECTS=...
NOTION_DB_ROADMAP=...
```

### Alias de Imports

Configurado em `jsconfig.json`:

```javascript
import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';
import { formatDate } from '@/lib/utils';
```

---

## 🎨 Tema e Estilização

### Modo Dark/Light

Automático via classe `dark` no `<html>`:

```css
/* Light mode */
.text-primary {
  color: #0f172a;
}

/* Dark mode */
.dark .text-primary {
  color: #f8fafc;
}
```

### Cores Personalizadas

Definidas em `tailwind.config.js`:

```javascript
colors: {
  primary: {...},
  success: {...},
  warning: {...},
  danger: {...},
}
```

### Classes Utilitárias

Disponíveis em `globals.css`:

```css
.card              /* Card padrão */
.kpi-card          /* Card de KPI */
.btn-primary       /* Botão primário */
.status-success    /* Badge verde */
.progress-bar      /* Barra de progresso */
```

---

## 📱 Responsividade

### Breakpoints (Tailwind)

```
sm:  640px   (mobile landscape)
md:  768px   (tablets)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
2xl: 1536px  (extra large)
```

### Mobile First

```jsx
<div className="
  grid-cols-1      /* Mobile: 1 coluna */
  md:grid-cols-2   /* Tablet: 2 colunas */
  lg:grid-cols-4   /* Desktop: 4 colunas */
">
```

---

## 🧪 Desenvolvimento

### Adicionar Nova Página

1. Criar arquivo em `src/pages/`:
```javascript
// src/pages/kpis.js
export default function KPIsPage() {
  return <div>KPIs Page</div>;
}
```

2. Acessar: `http://localhost:3000/kpis`

### Adicionar Nova API

1. Criar arquivo em `src/pages/api/`:
```javascript
// src/pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello!' });
}
```

2. Acessar: `http://localhost:3000/api/hello`

### Adicionar Novo Componente

1. Criar arquivo em `src/components/`:
```javascript
// src/components/MyComponent.js
export default function MyComponent() {
  return <div>My Component</div>;
}
```

2. Importar onde precisar:
```javascript
import MyComponent from '@/components/MyComponent';
```

---

## 🐛 Debug

### Logs do Servidor

Terminal onde rodou `npm run dev` mostra:
- Erros de build
- Erros de API
- Requisições HTTP

### Logs do Cliente

Browser console (F12) mostra:
- Erros React
- Network requests
- Console.log

### Verificar Build

```bash
npm run build
```

Se houver erros, eles aparecerão aqui.

---

## 📈 Performance

### Lighthouse Score Alvo

- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

### Otimizações Aplicadas

✅ Next.js Image Optimization  
✅ Code Splitting automático  
✅ Font optimization (Google Fonts)  
✅ CSS purge (Tailwind)  
✅ Minificação automática  

---

## 🔒 Segurança

### Nunca commitar:

❌ `.env.local`  
❌ `node_modules/`  
❌ `.next/`  
❌ Tokens ou senhas  

### Sempre usar:

✅ Variáveis de ambiente  
✅ HTTPS em produção  
✅ Headers de segurança  

---

## 📚 Recursos

### Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Notion API](https://developers.notion.com/)

### Tutoriais

- [Next.js Learn](https://nextjs.org/learn)
- [Tailwind UI](https://tailwindui.com/)
- [Recharts Examples](https://recharts.org/en-US/examples)

---

## 🤝 Contribuindo

1. Mantenha código limpo e comentado
2. Siga convenções de nomenclatura
3. Teste antes de commitar
4. Use componentes reutilizáveis
5. Documente funções complexas

---

## 📝 Convenções

### Nomenclatura

- **Componentes**: PascalCase (`KPICard.js`)
- **Hooks**: camelCase com prefixo use (`useTheme.js`)
- **Utilitários**: camelCase (`formatDate`)
- **Constantes**: UPPER_SNAKE_CASE (`KPI_TARGETS`)

### Estrutura de Arquivos

- Um componente por arquivo
- Exports default para componentes principais
- Named exports para variantes

### Imports

Ordem preferencial:
1. React/Next
2. Bibliotecas externas
3. Hooks customizados
4. Componentes
5. Utilitários
6. Estilos

```javascript
import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useTheme } from '@/hooks/useTheme';
import Header from '@/components/Header';
import { formatDate } from '@/lib/utils';
```

---

**Happy Coding! 🚀**
