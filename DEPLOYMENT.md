# 🚀 Deployment Guide

Guia completo para deploiar o KPI Dashboard em produção.

---

## 📋 Índice

1. [Deploy Vercel](#vercel-recomendado) (Recomendado)
2. [Deploy Docker](#docker)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [CI/CD](#cicd)
5. [Monitoramento](#monitoramento)
6. [Troubleshooting](#troubleshooting)

---

## Vercel (Recomendado) ⭐

### Por que Vercel?

- ✅ Otimizado para Next.js
- ✅ Deploy automático via Git
- ✅ Zero config necessário
- ✅ SSL/HTTPS automático
- ✅ Staging environments
- ✅ Analytics built-in
- ✅ Suporte a Edge Functions
- ✅ Free tier generoso

---

### Pré-requisitos

- Conta GitHub com repositório
- Conta Vercel (gratuita)
- Acesso ao repositório

---

### Passo 1: Conectar GitHub ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub"
4. Autorize o Vercel no GitHub
5. Selecione o repositório `kpi-dashboard-full-stack`

---

### Passo 2: Configurar Projeto

```
Project Name: kpi-dashboard
Framework: Next.js
Root Directory: ./frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

---

### Passo 3: Adicionar Variáveis de Ambiente

No dashboard Vercel:

1. Vá em **Settings → Environment Variables**
2. Adicione cada variável:

```env
NOTION_API_KEY=your_key_here
NOTION_VERSION=2022-06-28

NOTION_DB_HOUR_TRACKER=database_id
NOTION_DB_OKRS=database_id
NOTION_DB_KEY_RESULTS=database_id
NOTION_DB_TODAY_TASKS=database_id
NOTION_DB_TASK_PANEL=database_id
NOTION_DB_ACTIVE_PROJECTS=database_id
NOTION_DB_ROADMAP=database_id

GITHUB_USERNAME=seu_username
GITHUB_TOKEN=ghp_sua_token_aqui
GITHUB_WEBHOOK_SECRET=seu_secret_aqui
```

3. Selecione ambiente: **Production, Preview, Development**
4. Clique em "Save"

---

### Passo 4: Deploy Automático

**Opção A: Deploy via Git Push (Recomendado)**

```bash
# Após fazer commit
git push origin main

# Vercel automaticamente:
# 1. Detecta novo push
# 2. Cria Preview Deployment
# 3. Roda testes
# 4. Faz merge em main → Deploy Production
```

**Opção B: Deploy Manual**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy production
vercel --prod

# Deploy staging
vercel
```

---

### Passo 5: Verificar Deploy

1. Vá em **Deployments** no Vercel dashboard
2. Clique no deployment mais recente
3. Procure por ✅ Status: "Ready"
4. Clique no domínio para acessar

---

### URLs Após Deploy

```
Production: https://kpi-dashboard-full-stack.vercel.app
Preview (branches): https://kpi-dashboard-...-vercel.app
Staging: Configurável
```

---

### GitHub Webhook Setup (Opcional)

Para atualizações em tempo real de commits:

1. GitHub → Settings → Webhooks → Add webhook
2. Configure:

```
Payload URL: https://kpi-dashboard-full-stack.vercel.app/api/webhook/github
Content type: application/json
Events: Push events, Pull requests
Active: ✅ Checked
Secret: (seu GITHUB_WEBHOOK_SECRET)
```

3. Salve e teste

---

## Docker

### Pré-requisitos

- Docker instalado
- Docker Hub account (opcional, para push)

---

### Dockerfile

Crie `frontend/Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

---

### docker-compose.yml

```yaml
version: "3.8"

services:
  kpi-dashboard:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      NOTION_API_KEY: ${NOTION_API_KEY}
      NOTION_VERSION: ${NOTION_VERSION}
      GITHUB_USERNAME: ${GITHUB_USERNAME}
      GITHUB_TOKEN: ${GITHUB_TOKEN}
      GITHUB_WEBHOOK_SECRET: ${GITHUB_WEBHOOK_SECRET}
    volumes:
      - ./frontend/public:/app/public:ro
    restart: unless-stopped
```

---

### Build & Run

```bash
# Build image
docker build -t kpi-dashboard:latest ./frontend

# Run container
docker run -p 3000:3000 \
  -e NOTION_API_KEY=your_key \
  -e GITHUB_TOKEN=your_token \
  kpi-dashboard:latest

# Com docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f kpi-dashboard

# Parar
docker-compose down
```

---

### Push para Docker Hub

```bash
# Login
docker login

# Tag
docker tag kpi-dashboard:latest seu_username/kpi-dashboard:latest

# Push
docker push seu_username/kpi-dashboard:latest

# Pull (em outro servidor)
docker pull seu_username/kpi-dashboard:latest
docker run -p 3000:3000 seu_username/kpi-dashboard:latest
```

---

## Variáveis de Ambiente

### Obrigatórias

```env
# Notion
NOTION_API_KEY=ntn_[sua_key_aqui]
NOTION_VERSION=2022-06-28

# GitHub
GITHUB_USERNAME=seu_username
GITHUB_TOKEN=ghp_[seu_token_aqui]
GITHUB_WEBHOOK_SECRET=seu_secret_aleatorio
```

### Opcionais

```env
# Node.js
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://seu-dominio.com

# Vercel
VERCEL_ENV=production
VERCEL_URL=seu-dominio.com
```

---

### Como Obter Variáveis

#### Notion API Key

1. Acesse [Notion Integrations](https://www.notion.so/my-integrations)
2. Clique em "New integration"
3. Nome: "KPI Dashboard"
4. Escolha workspace
5. Copie "Internal Integration Token"

#### GitHub Token

1. GitHub → Settings → Developer settings → Personal access tokens
2. Clique em "Generate new token"
3. Nome: "KPI Dashboard"
4. Escopo: `public_repo`
5. Gerar e copiar token

#### Notion Database IDs

1. Abra database no Notion
2. URL será: `https://notion.so/workspace/[DATABASE_ID]?v=...`
3. Copie o ID (entre `/` e `?`)

---

## CI/CD

### GitHub Actions (Automatizado)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: |
          cd frontend
          npm ci

      - name: Build
        run: |
          cd frontend
          npm run build

      - name: Test build
        run: |
          cd frontend
          npm run build

      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

### Variáveis GitHub Secrets

1. GitHub → Settings → Secrets and variables → Actions
2. Adicione:
   - `VERCEL_TOKEN`: Token do Vercel (Settings → Tokens)
   - `VERCEL_ORG_ID`: ID da organização Vercel
   - `VERCEL_PROJECT_ID`: ID do projeto Vercel

---

## Monitoramento

### Vercel Analytics

```bash
# Já incluído automaticamente em deployments Vercel
# Dashboard → Analytics para ver:
# - Page views
# - Response times
# - Error rates
# - Browser/OS usage
```

---

### Sentry (Error Tracking)

Adicione para rastrear erros em produção:

```bash
# Install
npm install @sentry/nextjs

# Configure em next.config.js
const withSentry = require("@sentry/nextjs").withSentry;

module.exports = withSentry({
  // seu config aqui
});
```

---

### Health Checks

Crie endpoint em `pages/api/health.js`:

```javascript
export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

Monitorar com:

- **UptimeRobot**: https://uptimerobot.com
- **Healthchecks.io**: https://healthchecks.io

---

## Troubleshooting

### Build Failed: "Command 'npm run build' exited with 1"

**Causa**: Erro em build Next.js

**Solução**:

```bash
# Local
npm run build

# Ver erro completo
npm run build 2>&1 | tail -50

# Comum: import errado ou syntax error
```

---

### Deploy Success mas aplicação 404

**Causa**: `vercel.json` configurado errado

**Solução**:

```json
{
  "version": 2,
  "name": "kpi-dashboard",
  "builds": [{ "src": "frontend/package.json", "use": "@vercel/next" }],
  "routes": [{ "src": "/(.*)", "dest": "frontend/$1" }]
}
```

**Importante**: `"dest": "frontend/$1"` (com $1!)

---

### Variáveis de Ambiente não funcionam

**Causa**: Environment variables não configuradas no Vercel

**Solução**:

1. Vercel Dashboard → Settings → Environment Variables
2. Confirme que estão em "Production"
3. Redeploy: `vercel --prod`

---

### GitHub Webhook retorna 404

**Causa**: Endpoint webhook errado

**Solução**:

1. GitHub → Webhook settings
2. Confirme URL: `https://seu-dominio.com/api/webhook/github`
3. Método: POST
4. Content-Type: application/json
5. Teste com "Recent Deliveries"

---

### Performance lenta em produção

**Solução**:

1. Vercel Analytics → Performance tab
2. Verificar:
   - API response times
   - Database queries
   - Asset sizes
3. Otimizar:
   - Cache estratégias
   - Image optimization
   - Code splitting

---

### Rollback para versão anterior

```bash
# Vercel Dashboard → Deployments
# Clique no deployment anterior
# Clique em "Promote to Production"

# OU via CLI
vercel rollback
```

---

## Checklist de Deploy

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Build local funciona (`npm run build`)
- [ ] GitHub repositório atualizado
- [ ] Vercel conectado e configurado
- [ ] Domínio customizado (opcional)
- [ ] SSL/HTTPS ativo
- [ ] GitHub Webhook funcionando
- [ ] Health check respondendo
- [ ] Analytics monitorando
- [ ] Email de notificação funcionando
- [ ] Backup automático do Notion

---

## Próximos Passos

1. ✅ Deploy em Vercel (hoje)
2. ⏳ Configurar domínio customizado
3. ⏳ Setup GitHub Actions para CI/CD
4. ⏳ Integrar Sentry para error tracking
5. ⏳ Configurar uptime monitoring

---

## Suporte

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Notion API: https://developers.notion.com
- GitHub Webhooks: https://docs.github.com/webhooks

---

**Precisa de ajuda? Abra uma issue no GitHub!** 🎉
