# ⚡ Quick Start - 5 Minutos para Rodar

Guia ultrarrápido para ter o dashboard funcionando. Sem enrolação!

---

## 🚀 Setup em 5 Passos

### 1️⃣ **Pré-requisitos** (30 segundos)

Você precisa ter instalado:
- ✅ Node.js 18+ ([baixar](https://nodejs.org/))
- ✅ Conta Notion ([criar](https://notion.so/))

Verifique:
```bash
node --version  # Deve mostrar v18+ ou v20+
```

---

### 2️⃣ **Baixar e Instalar** (2 minutos)

```bash
# Extrair o ZIP
unzip kpi-dashboard-project.zip
cd kpi-dashboard-project/frontend

# Instalar
npm install
```

---

### 3️⃣ **Configurar Notion** (2 minutos)

**A. Criar Integration:**
1. Acesse: https://www.notion.so/my-integrations
2. Clique **"+ New integration"**
3. Nome: `KPI Dashboard`
4. Clique **"Submit"**
5. **COPIE O TOKEN** (secret_XXXX...)

**B. Conectar Databases:**

Para CADA uma das 6 databases no seu Notion:
1. Abra a database
2. Clique **⋯** (3 pontinhos)
3. Clique **"+ Add connections"**
4. Selecione **"KPI Dashboard"**

Databases necessárias:
- Today's Tasks
- Hours This Week
- Hour Tracker
- Task Panel
- Active Projects
- 12-Month Roadmap

**C. Copiar Database IDs:**

Na URL de cada database, copie o ID (32 caracteres):
```
https://notion.so/1234567890abcdef1234567890abcdef?v=...
                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 Este é o ID
```

---

### 4️⃣ **Configurar Variáveis** (1 minuto)

Crie arquivo `.env.local` na pasta `frontend/`:

```bash
cd frontend
cp ../.env.example .env.local
```

Edite `.env.local` e cole:

```env
NOTION_API_KEY=secret_SEU_TOKEN_AQUI
NOTION_DB_TODAY_TASKS=ID_DA_DATABASE_1
NOTION_DB_HOURS_WEEK=ID_DA_DATABASE_2
NOTION_DB_HOUR_TRACKER=ID_DA_DATABASE_3
NOTION_DB_TASK_PANEL=ID_DA_DATABASE_4
NOTION_DB_ACTIVE_PROJECTS=ID_DA_DATABASE_5
NOTION_DB_ROADMAP=ID_DA_DATABASE_6
```

---

### 5️⃣ **Rodar!** (10 segundos)

```bash
npm run dev
```

Abra: **http://localhost:3000** 🎉

---

## ✅ Pronto!

Se você vê o dashboard com seus dados, **funcionou!**

---

## 🐛 Não Funcionou?

### Erro: "Unauthorized"
- Token do Notion está errado
- Copie novamente em https://www.notion.so/my-integrations

### Erro: "Database not found"
- Database ID está errado
- Ou database não foi conectada à Integration
- Verifique os 3 pontinhos → Add connections

### Dashboard em branco
- Suas databases do Notion estão vazias
- Adicione pelo menos 1 entrada em cada

### Porta 3000 em uso
```bash
PORT=3001 npm run dev
# Acesse: http://localhost:3001
```

---

## 📚 Documentação Completa

**Guias detalhados:**
- 📖 [SETUP.md](./SETUP.md) - Instalação completa
- 🔧 [NOTION_SETUP.md](./NOTION_SETUP.md) - Configuração Notion
- 📊 [OKRS_KPIS.md](./OKRS_KPIS.md) - Explicação dos KPIs
- 🔌 [API.md](./API.md) - Documentação API

---

## 🎯 Próximos Passos

Agora que está rodando:

### 1. **Personalize suas Metas**

Edite `frontend/src/lib/constants.js`:

```javascript
export const KPI_TARGETS = {
  praticaHours: { min: 12, max: 15 },  // Mude aqui!
  teoriaHours: { min: 5, max: 8 },     // E aqui!
  // ...
};
```

### 2. **Customize Cores**

Edite `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#3b82f6',  // Azul padrão - mude!
  },
}
```

### 3. **Deploy na Vercel** (Grátis)

```bash
npm i -g vercel
vercel login
vercel
```

Adicione variáveis de ambiente no dashboard da Vercel.

---

## 🎨 Features Principais

O que você pode fazer agora:

### 📊 **Dashboard**
- Ver KPIs calculados automaticamente
- Estatísticas rápidas (horas, streak, projetos)
- Gráficos de distribuição de tempo
- Tasks de hoje

### 🌓 **Tema**
- Clique no ícone ☀️/🌙 no header
- Tema salvo automaticamente

### 🔄 **Atualizar Dados**
- Clique no botão ⚡ "Atualizar"
- Ou aguarde 5 minutos (cache expira)

### 📱 **Mobile**
- Acesse do celular
- Totalmente responsivo

---

## 💡 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor local

# Build
npm run build        # Cria build de produção
npm run start        # Roda build em produção

# Limpar cache
rm -rf .next         # Deleta build
rm -rf node_modules  # Deleta dependências
npm install          # Reinstala tudo
```

---

## 🔥 Dicas Rápidas

### Cache
- Dados ficam em cache por 5 minutos
- Limpe localStorage se dados travarem:
  ```javascript
  // No console do navegador (F12):
  localStorage.clear()
  ```

### Performance
- Primeira carga: ~3 segundos
- Cargas seguintes: instantâneo (cache)

### Dados
- Dashboard busca de 6 databases
- Cálculo automático dos 15 KPIs
- Progresso semanal calculado

---

## 📞 Precisa de Ajuda?

**Ordem de troubleshooting:**

1. ✅ Verifica console do navegador (F12)
2. ✅ Verifica terminal onde rodou `npm run dev`
3. ✅ Leia [SETUP.md](./SETUP.md) completo
4. ✅ Verifica [NOTION_SETUP.md](./NOTION_SETUP.md)
5. ✅ Confere se databases têm dados

**Se nada funcionar:**
- Tente `npm install` novamente
- Delete `.next/` e `node_modules/`
- Reinstale tudo

---

## 🎯 Checklist Rápido

Antes de pedir ajuda, confirme:

- [ ] Node.js 18+ instalado
- [ ] `npm install` executado sem erros
- [ ] Integration do Notion criada
- [ ] 6 databases conectadas à Integration
- [ ] 6 Database IDs copiados corretamente
- [ ] `.env.local` criado e preenchido
- [ ] `npm run dev` rodando sem erros
- [ ] http://localhost:3000 acessível

---

## 🚀 Deploy Rápido (Vercel)

**5 minutos para ter online:**

```bash
# 1. Instalar CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd frontend
vercel

# 4. Adicionar variáveis
# No dashboard Vercel:
# Settings → Environment Variables
# Adicione TODAS as variáveis do .env.local

# 5. Redeploy
vercel --prod
```

**Pronto!** Seu dashboard está online! 🎉

---

## 📖 Mais Info

### Estrutura do Projeto
```
frontend/
├── src/
│   ├── components/    # Componentes React
│   ├── pages/         # Páginas (rotas)
│   ├── lib/           # Funções auxiliares
│   └── styles/        # CSS global
```

### Tech Stack
- ⚛️ Next.js 14 + React 18
- 🎨 Tailwind CSS
- 📊 Recharts (gráficos)
- 📡 Notion API
- 🚀 Vercel (deploy)

### Links Úteis
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Notion API](https://developers.notion.com/)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎉 Parabéns!

Você tem um dashboard de KPIs funcionando!

**Próximo:** Comece a usar diariamente para acompanhar seu progresso! 💪

---

**Leva 5 minutos para rodar. 5 minutos por dia para usar. Progresso mensurável para sempre.** 📈
