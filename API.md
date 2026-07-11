# 📡 Documentação da API - KPI Dashboard

Esta documentação descreve todas as rotas da API REST do dashboard.

---

## 🌐 Base URL

**Desenvolvimento:**

```
http://localhost:3000/api
```

**Produção:**

```
https://seu-dominio.vercel.app/api
```

---

## 📋 Endpoints Disponíveis

### 1. GET `/api/dashboard`

Retorna todos os dados do dashboard incluindo KPIs calculados, tasks, projetos e gráficos.

#### Request

```http
GET /api/dashboard
```

**Headers:**

```
Content-Type: application/json
```

**Query Parameters:** Nenhum

#### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "kpis": {
      "productivity": {
        "praticaHours": {
          "value": 14,
          "target": { "min": 12, "max": 15 },
          "status": "success"
        },
        "teoriaHours": {
          "value": 6,
          "target": { "min": 5, "max": 8 },
          "status": "success"
        },
        "inglesHours": {
          "value": 4,
          "target": { "min": 3, "max": 5 },
          "status": "success"
        },
        "totalHours": {
          "value": 24,
          "target": { "min": 20, "max": 23 },
          "status": "success"
        },
        "daysStudied": {
          "value": 6,
          "target": { "min": 6, "max": 7 },
          "status": "success"
        },
        "streak": {
          "value": 12,
          "target": { "min": 7, "max": 999 },
          "status": "success"
        }
      },
      "practice": {
        "commits": {
          "value": 0,
          "target": { "min": 20, "max": 30 },
          "status": "pending"
        },
        "features": {
          "value": 4,
          "target": { "min": 3, "max": 5 },
          "status": "success"
        },
        "bugs": {
          "value": 3,
          "target": { "min": 5, "max": 8 },
          "status": "danger"
        },
        "prs": {
          "value": 0,
          "target": { "min": 2, "max": 4 },
          "status": "pending"
        },
        "projects": {
          "value": 1,
          "target": { "min": 1, "max": 2 },
          "status": "success"
        }
      },
      "learning": {
        "modules": {
          "value": 5,
          "target": { "min": 3, "max": 5 },
          "status": "success"
        },
        "exercises": {
          "value": 12,
          "target": { "min": 10, "max": 15 },
          "status": "success"
        },
        "concepts": {
          "value": 2,
          "target": { "min": 2, "max": 3 },
          "status": "success"
        }
      },
      "language": {
        "lessons": {
          "value": 3,
          "target": { "min": 3, "max": 3 },
          "status": "success"
        },
        "worksheets": {
          "value": 2,
          "target": { "min": 2, "max": 2 },
          "status": "success"
        }
      },
      "summary": {
        "total": 15,
        "success": 12,
        "warning": 1,
        "danger": 2
      }
    },
    "todayTasks": [
      {
        "id": "abc123",
        "name": "HashTag - Treinamentos Full-Stack",
        "priority": "Alta Prioridade",
        "estimatedTime": 1,
        "status": "A Fazer",
        "description": "Carrossel - Resolução 2/2"
      }
    ],
    "hoursWeek": [
      {
        "id": "def456",
        "activity": "HashTag - Treinamentos Full-Stack",
        "category": "Estudos",
        "hoursPlanned": 6,
        "hoursReal": 2.3,
        "status": "Em andamento",
        "description": "HTML e CSS"
      }
    ],
    "hourTracker": [
      {
        "id": "ghi789",
        "activity": "HashTag Curso Full-Stack",
        "category": "Prática",
        "project": "HashTag Treinamentos",
        "date": "2026-02-07T00:00:00.000Z",
        "hours": 0.5,
        "description": "Carrossel - Resolução 2/2"
      }
    ],
    "taskPanel": [
      {
        "id": "jkl012",
        "task": "SupaBase (Próximo Passo: Criar as Políticas de RLS)",
        "category": "Prática",
        "priority": "Média",
        "status": "In progress",
        "date": "2025-12-06T00:00:00.000Z",
        "progress": "50%"
      }
    ],
    "activeProjects": [
      {
        "id": "mno345",
        "name": "Automação N8N - Portfólio",
        "status": "Em teste",
        "priority": "Urgente"
      }
    ],
    "roadmap": [
      {
        "id": "pqr678",
        "name": "B77 Auto Parts Pro (PROJETO REAL)",
        "date": "2026-02-28T00:00:00.000Z",
        "category": "Projetos/Portfólio",
        "status": "Em progresso",
        "priority": "Alta",
        "description": "E-commerce completo"
      }
    ],
    "categoryBreakdown": [
      {
        "name": "Projetos",
        "planned": 6,
        "real": 2.1
      },
      {
        "name": "Estudos",
        "planned": 6,
        "real": 2.3
      },
      {
        "name": "Idiomas",
        "planned": 1.4,
        "real": 1
      }
    ],
    "weeklyProgress": {
      "planned": 13.4,
      "real": 5.4,
      "percentage": 40,
      "status": "danger"
    },
    "quickStats": {
      "totalHoursWeek": 24,
      "tasksCompleted": 4,
      "tasksTotal": 6,
      "activeProjectsCount": 3,
      "streak": 12
    }
  },
  "timestamp": "2026-02-13T14:30:00.000Z"
}
```

#### Códigos de Status

| Código | Descrição                                             |
| ------ | ----------------------------------------------------- |
| `200`  | Sucesso - Dados retornados                            |
| `500`  | Erro no servidor - Problema ao buscar dados do Notion |
| `503`  | Serviço indisponível - Notion fora do ar              |

#### Erros Possíveis

**500 Internal Server Error:**

```json
{
  "success": false,
  "error": "Erro ao buscar dados do Notion",
  "message": "Database not found"
}
```

**Causas comuns:**

- Token do Notion inválido
- Database ID incorreto
- Database não compartilhada com Integration
- Notion API fora do ar

---

## 🔧 Integração com Frontend

### Usando fetch nativo:

```javascript
async function getDashboardData() {
  try {
    const response = await fetch("/api/dashboard");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}
```

### Usando hook customizado:

```javascript
import { useDashboard } from "@/hooks/useDashboard";

function MyComponent() {
  const { data, loading, error, refresh } = useDashboard();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h1>Total: {data.quickStats.totalHoursWeek}h</h1>
      <button onClick={refresh}>Atualizar</button>
    </div>
  );
}
```

---

## 📊 Estrutura dos Dados

### KPIs

Cada KPI tem a estrutura:

```typescript
{
  value: number,           // Valor atual
  target: {                // Meta
    min: number,          // Mínimo
    max: number           // Máximo
  },
  status: string          // 'success' | 'warning' | 'danger' | 'pending'
}
```

**Status:**

- `success` 🟢 - Dentro da meta
- `warning` 🟡 - Próximo da meta (80%+)
- `danger` 🔴 - Abaixo da meta
- `pending` ⏳ - Aguardando integração (ex: GitHub)

### Tasks

```typescript
{
  id: string,
  name: string,
  priority: string,        // 'Alta Prioridade' | 'Média Prioridade' | 'Baixa Prioridade'
  estimatedTime: number,   // Em horas
  status: string,          // 'A Fazer' | 'Fazendo' | 'Concluído'
  description: string
}
```

### Projects

```typescript
{
  id: string,
  name: string,
  status: string,          // 'Em teste' | 'Pausado' | 'Em desenvolvimento'
  priority: string         // 'Urgente' | 'Alta' | 'Média'
}
```

---

## ⚡ Performance

### Cache

A API não implementa cache próprio. O cache é gerenciado no frontend via:

- LocalStorage (5 minutos)
- Hook `useDashboard` com opção `enableCache`

### Rate Limits

**Notion API:**

- 3 requisições por segundo
- Implementamos batching automático

**Dashboard API:**

- Sem rate limit (localhost)
- Vercel: Dependente do plano

### Otimizações

1. **Parallel Fetching:** Todas databases buscadas em paralelo
2. **Selective Fields:** Apenas campos necessários
3. **Error Handling:** Falhas não bloqueiam resposta parcial

---

## 🔒 Segurança

### Variáveis de Ambiente

**Nunca exponha:**

- `NOTION_API_KEY` - Apenas server-side
- `NOTION_DB_*` - Database IDs apenas server-side

### CORS

API aceita requisições apenas de:

- Same origin (localhost:3000)
- Domínio de produção configurado na Vercel

### Rate Limiting

Considere implementar rate limiting em produção:

```javascript
// Exemplo com biblioteca 'express-rate-limit'
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 30, // 30 requisições por minuto
});

export default limiter(handler);
```

---

## 🧪 Testando a API

### cURL

```bash
curl http://localhost:3000/api/dashboard
```

### Postman

1. Crie nova requisição
2. Método: `GET`
3. URL: `http://localhost:3000/api/dashboard`
4. Send

### Browser

Acesse diretamente:

```
http://localhost:3000/api/dashboard
```

Verá o JSON no navegador.

---

## 🚀 Expansões Futuras

### Endpoints planejados:

**GET `/api/kpis/:category`**

- Retorna KPIs de uma categoria específica
- Ex: `/api/kpis/productivity`

**GET `/api/okrs`**

- Retorna OKRs e progresso
- Calcula % de conclusão de cada Key Result

**GET `/api/projects/:id`**

- Detalhes de projeto específico
- Histórico de commits
- Timeline

**GET `/api/weekly-report`**

- Relatório semanal completo
- Comparação com semana anterior
- Insights automáticos

**POST `/api/refresh`**

- Força atualização do cache
- Útil para webhooks

**GET `/api/health`**

- Health check da API
- Status da conexão Notion
- Versão da API

---

## 📚 Recursos - Adicionais

- [Notion API Documentation](https://developers.notion.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

---

## 🐛 Reportar Problemas

Se encontrar bugs na API, passos:

1. Verifique logs do servidor (terminal)
2. Verifique console do navegador (F12)
3. Teste endpoint diretamente (cURL/Postman)
4. Verifique configuração do Notion

---

**API Version:** 1.0.0  
**Last Updated:** 13 de Fevereiro, 2026
