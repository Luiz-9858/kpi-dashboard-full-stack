# 🚀 Guia de Instalação Completo - KPI Dashboard

Este guia te leva do zero até o dashboard funcionando no seu computador!

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

### 1. Node.js (versão 18 ou superior)

**Windows:**
- Baixe em: https://nodejs.org/
- Execute o instalador
- Verifique: abra PowerShell e digite `node --version`

**Mac:**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verificar instalação:**
```bash
node --version  # Deve mostrar v18.x.x ou superior
npm --version   # Deve mostrar 9.x.x ou superior
```

### 2. Git (para clonar o projeto)

**Verificar se tem Git:**
```bash
git --version
```

**Se não tiver:**
- Windows: https://git-scm.com/download/win
- Mac: `brew install git`
- Linux: `sudo apt-get install git`

### 3. Conta no Notion (gratuita)

- Acesse: https://www.notion.so/
- Crie uma conta se ainda não tiver

### 4. Conta na Vercel (opcional, para deploy)

- Acesse: https://vercel.com/
- Cadastre-se com GitHub (gratuito)

---

## 📦 PASSO 1: Baixar o Projeto

### Opção A: Download ZIP (mais fácil)

1. Baixe o arquivo `kpi-dashboard-project.zip`
2. Descompacte em uma pasta de sua escolha
3. Abra o terminal nessa pasta

### Opção B: Git Clone (se tiver repositório)

```bash
git clone <url-do-repositorio>
cd kpi-dashboard-project
```

---

## 🔧 PASSO 2: Instalar Dependências

Abra o terminal na pasta do projeto:

### Windows (PowerShell ou CMD):
```bash
cd frontend
npm install
```

### Mac/Linux:
```bash
cd frontend
npm install
```

**Tempo estimado:** 2-5 minutos

**Você vai ver:**
```
added 347 packages in 2m
```

✅ **Sucesso!** Dependências instaladas.

---

## 🔑 PASSO 3: Configurar Notion

Agora vem a parte mais importante! Siga com atenção:

### 3.1 Criar Integration no Notion

1. Abra: https://www.notion.so/my-integrations
2. Clique em **"+ New integration"**
3. Preencha:
   - **Nome:** KPI Dashboard
   - **Associated workspace:** Seu workspace
   - **Type:** Internal
4. Clique em **"Submit"**

5. **COPIE O TOKEN** que aparece:
   ```
   secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
   
   ⚠️ **IMPORTANTE:** Guarde este token! Não compartilhe!

### 3.2 Conectar suas Databases

Para CADA database do seu Notion:

**Databases necessárias:**
- Today's Tasks
- Hours This Week
- Hour Tracker
- Task Panel
- Active Projects
- 12-Month Roadmap

**Como conectar (faça para TODAS):**

1. Abra a database no Notion
2. Clique nos **3 pontinhos** ⋯ (canto superior direito)
3. Role até o final
4. Clique em **"+ Add connections"**
5. Selecione **"KPI Dashboard"**

✅ Você verá: "KPI Dashboard has access to this page"

**⚠️ REPITA ISSO PARA AS 6 DATABASES!**

### 3.3 Copiar Database IDs

Para cada database, copie o ID da URL:

**Exemplo de URL:**
```
https://www.notion.so/1234567890abcdef1234567890abcdef?v=...
                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                      Este é o Database ID
```

**Como copiar:**
1. Abra a database
2. Copie a URL do navegador
3. O ID são os 32 caracteres entre `.so/` e `?v=`

**Anote todos os IDs:**
```
Today's Tasks: ________________________________
Hours This Week: ______________________________
Hour Tracker: _________________________________
Task Panel: ___________________________________
Active Projects: ______________________________
12-Month Roadmap: _____________________________
```

---

## ⚙️ PASSO 4: Configurar Variáveis de Ambiente

### 4.1 Criar arquivo .env.local

Na pasta `frontend/`, crie um arquivo chamado `.env.local`:

**Windows (PowerShell):**
```bash
cd frontend
New-Item .env.local -ItemType File
notepad .env.local
```

**Mac/Linux:**
```bash
cd frontend
touch .env.local
nano .env.local
```

### 4.2 Adicionar suas credenciais

Cole este conteúdo no arquivo `.env.local`:

```env
# Notion Integration
NOTION_API_KEY=secret_COLE_SEU_TOKEN_AQUI
NOTION_VERSION=2022-06-28

# Database IDs (substitua pelos seus IDs)
NOTION_DB_TODAY_TASKS=COLE_O_ID_AQUI
NOTION_DB_HOURS_WEEK=COLE_O_ID_AQUI
NOTION_DB_HOUR_TRACKER=COLE_O_ID_AQUI
NOTION_DB_TASK_PANEL=COLE_O_ID_AQUI
NOTION_DB_ACTIVE_PROJECTS=COLE_O_ID_AQUI
NOTION_DB_ROADMAP=COLE_O_ID_AQUI

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**⚠️ SUBSTITUA:**
- `secret_COLE_SEU_TOKEN_AQUI` → Seu token do Notion
- `COLE_O_ID_AQUI` → IDs das suas databases

**Exemplo preenchido:**
```env
NOTION_API_KEY=secret_a1b2c3d4e5f6g7h8i9j0
NOTION_DB_TODAY_TASKS=1234567890abcdef1234567890abcdef
NOTION_DB_HOURS_WEEK=abcdef1234567890abcdef123456
# ... e assim por diante
```

### 4.3 Salvar e fechar

- **Notepad:** Ctrl+S e feche
- **Nano:** Ctrl+X, depois Y, depois Enter

---

## 🚀 PASSO 5: Rodar o Projeto

### 5.1 Iniciar servidor de desenvolvimento

No terminal, dentro da pasta `frontend/`:

```bash
npm run dev
```

**Você vai ver:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
✓ Notion connection successful
✓ 6 databases connected
```

✅ **SUCESSO!** Dashboard rodando!

### 5.2 Acessar no navegador

Abra seu navegador em:
```
http://localhost:3000
```

**Você deve ver:**
- Página de boas-vindas
- Stats cards com seus dados
- KPIs calculados
- Gráficos
- Tasks de hoje

---

## 🎨 PASSO 6: Testar Funcionalidades

### Teste 1: Tema Dark/Light
- Clique no ícone 🌙/☀️ no header
- Tema deve alternar
- Recarregue a página → tema permanece

### Teste 2: Dados do Notion
- Veja se os números batem com seu Notion
- Confira tasks de hoje
- Veja horas da semana

### Teste 3: Navegação
- Clique em "Dashboard"
- Clique em "KPIs" (pode dar 404 por enquanto)
- Menu mobile: abra no celular ou redimensione janela

### Teste 4: Atualização
- Clique no botão "Atualizar" ⚡
- Dados devem recarregar

---

## 🐛 Solução de Problemas

### Erro: "Cannot find module"

**Causa:** Dependências não instaladas

**Solução:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Unauthorized" ou "401"

**Causa:** Token inválido ou database não conectada

**Solução:**
1. Verifique o token em `.env.local`
2. Confirme que conectou TODAS as databases (Passo 3.2)
3. Reinicie o servidor: Ctrl+C e `npm run dev`

### Erro: "Database not found"

**Causa:** Database ID incorreto

**Solução:**
1. Copie novamente o ID da URL
2. Cole no `.env.local` sem espaços
3. Reinicie o servidor

### Erro: "Port 3000 already in use"

**Causa:** Porta 3000 está ocupada

**Solução:**
```bash
# Mate o processo na porta 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <numero> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Ou use outra porta:
PORT=3001 npm run dev
```

### Dashboard em branco ou sem dados

**Causa:** Notion sem dados ou databases vazias

**Solução:**
1. Adicione pelo menos 1 entrada em cada database
2. Verifique nomes das propriedades (veja NOTION_SETUP.md)
3. Refresh a página

### Erro: "Module not found: Can't resolve '@/components'"

**Causa:** Alias @ não configurado

**Solução:**
Verifique se `jsconfig.json` existe na pasta `frontend/`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🌐 PASSO 7: Deploy na Vercel (Opcional)

### 7.1 Instalar Vercel CLI

```bash
npm install -g vercel
```

### 7.2 Fazer login

```bash
vercel login
```

Escolha seu método de login (GitHub, Email, etc.)

### 7.3 Deploy

Na pasta `frontend/`:

```bash
vercel
```

Responda as perguntas:
```
? Set up and deploy "frontend"? Y
? Which scope? [Sua conta]
? Link to existing project? N
? What's your project's name? kpi-dashboard
? In which directory is your code located? ./
? Want to override the settings? N
```

**Aguarde o deploy...**

```
✅ Deployed to production!
🔗 https://kpi-dashboard-xxxxx.vercel.app
```

### 7.4 Adicionar variáveis de ambiente na Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione TODAS as variáveis do `.env.local`:
   - `NOTION_API_KEY`
   - `NOTION_DB_TODAY_TASKS`
   - etc.

5. Clique em **"Redeploy"** no dashboard

✅ **Dashboard online!** Acesse pelo link da Vercel.

---

## 📱 Acessar no Mobile

### Localhost (mesma rede Wi-Fi)

1. Descubra seu IP local:

**Windows:**
```bash
ipconfig
# Procure por "IPv4 Address"
```

**Mac/Linux:**
```bash
ifconfig | grep inet
# Procure por algo como 192.168.x.x
```

2. No celular, acesse:
```
http://SEU_IP:3000
```

Exemplo: `http://192.168.1.100:3000`

### Vercel (acesso público)

Acesse o link da Vercel direto no navegador do celular!

---

## 🔄 Atualizar o Projeto

Se você receber atualizações:

```bash
# Parar o servidor (Ctrl+C)

# Atualizar código
git pull

# Reinstalar dependências (se mudaram)
cd frontend
npm install

# Rodar novamente
npm run dev
```

---

## 📚 Próximos Passos

Agora que está funcionando:

1. ✅ Personalize cores em `tailwind.config.js`
2. ✅ Ajuste metas dos KPIs em `lib/kpis.js`
3. ✅ Adicione mais databases do Notion
4. ✅ Crie páginas personalizadas

---

## 🆘 Precisa de Ajuda?

**Documentação adicional:**
- `README.md` - Visão geral do projeto
- `NOTION_SETUP.md` - Setup detalhado do Notion
- `OKRS_KPIS.md` - Explicação dos OKRs e KPIs

**Problemas comuns:**
- Verifique o console do navegador (F12)
- Veja logs do terminal
- Confira se todas databases estão conectadas

---

## ✅ Checklist Final

Antes de considerar instalado:

- [ ] Node.js instalado e funcionando
- [ ] Projeto baixado/clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Integration do Notion criada
- [ ] 6 databases conectadas à Integration
- [ ] Database IDs copiados
- [ ] Arquivo `.env.local` criado e preenchido
- [ ] Servidor rodando (`npm run dev`)
- [ ] Dashboard acessível em localhost:3000
- [ ] Dados do Notion aparecendo
- [ ] Tema dark/light funcionando
- [ ] Deploy na Vercel (opcional)

---

**Parabéns! 🎉 Seu dashboard está funcionando!**

Agora é só usar diariamente para acompanhar seu progresso como desenvolvedor Full Stack! 💪
