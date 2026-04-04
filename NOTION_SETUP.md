# 🔧 Configuração do Notion - Guia Completo

Este guia te ensina a conectar seu workspace do Notion com o dashboard KPI.

---

## 📋 Pré-requisitos

- Conta no Notion (gratuita ou paga)
- Acesso às databases que você já criou
- 15 minutos de tempo

---

## 🎯 PASSO 1: Criar Integration no Notion

### 1.1 Acesse a página de integrações

1. Vá para: https://www.notion.so/my-integrations
2. Faça login com sua conta Notion
3. Clique em **"+ New integration"**

### 1.2 Configure a Integration

Preencha os campos:

**Nome da Integration:**
```
KPI Dashboard
```

**Logo:** (opcional)
- Você pode usar um emoji 📊 ou deixar o padrão

**Associated workspace:**
- Selecione: **"My Tech Business"** (seu workspace)

**Type:**
- Selecione: **"Internal"**

**Capabilities:** (permissões)
- ✅ **Read content**
- ✅ **Update content** (opcional, para futuras funcionalidades)
- ⬜ No user information (deixe desmarcado)

**Content Capabilities:**
- ✅ Read content
- ✅ Read comments
- ✅ Read user information (sem informações de email)

Clique em **"Submit"**

### 1.3 Copie o Token

Após criar, você verá:

```
Internal Integration Secret
notion_v2_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

⚠️ **IMPORTANTE:**
- Copie este token e guarde em local seguro
- NÃO compartilhe este token publicamente
- NÃO faça commit deste token no Git

---

## 🗄️ PASSO 2: Conectar Databases à Integration

Agora você precisa dar permissão para a Integration acessar suas databases.

### 2.1 Lista de Databases Necessárias

Baseado nos seus prints, estas são as databases que precisamos conectar:

1. **Today's Tasks** (Daily activities)
2. **Hours This Week** (Time dedicated during the week)
3. **Hour Tracker** (Diário tracking)
4. **Task Panel** (Gestão de projetos/tasks)
5. **Active Projects** (Projetos médio prazo)
6. **12-Month Roadmap** (Timeline anual)

### 2.2 Como Conectar Cada Database

Para CADA database acima, faça:

**Passo a passo:**

1. Abra a página da database no Notion
2. Clique nos **3 pontinhos** (⋯) no canto superior direito
3. Role até o final do menu
4. Clique em **"+ Add connections"**
5. Procure por **"KPI Dashboard"** (a integration que você criou)
6. Clique para conectar

![alt text]

Você verá uma confirmação: ✅ "KPI Dashboard has access to this page"

⚠️ **REPITA ESTE PROCESSO PARA TODAS AS 6 DATABASES**

---

## 🆔 PASSO 3: Obter Database IDs

Cada database no Notion tem um ID único. Precisamos copiar esses IDs.

### 3.1 Como Encontrar o Database ID

**Método 1: Pela URL**

1. Abra a database no Notion
2. Copie a URL do navegador
3. O Database ID está na URL

**Exemplo de URL:**
```
https://www.notion.so/1234567890abcdef1234567890abcdef?v=...
                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                      Este é o Database ID
```

**Método 2: Compartilhar como Link**

1. Abra a database
2. Clique em **"Share"** (canto superior direito)
3. Clique em **"Copy link"**
4. O ID estará no link copiado

### 3.2 Copie os IDs de Todas as Databases

Crie um documento temporário com os IDs:

```
Today's Tasks: ________________________________
Hours This Week: ______________________________
Hour Tracker: _________________________________
Task Panel: ___________________________________
Active Projects: ______________________________
12-Month Roadmap: _____________________________
```

**Exemplo preenchido:**
```
Today's Tasks: 1234567890abcdef1234567890abcdef
Hours This Week: abcdef1234567890abcdef123456
Hour Tracker: 567890abcdef1234567890abcdef12
Task Panel: 90abcdef1234567890abcdef1234567
Active Projects: cdef1234567890abcdef12345678
12-Month Roadmap: 234567890abcdef1234567890ab
```

---

## ⚙️ PASSO 4: Configurar Variáveis de Ambiente

### 4.1 Criar arquivo .env.local

No diretório `frontend/` do projeto, crie um arquivo chamado `.env.local`

```bash
cd frontend
touch .env.local
```

### 4.2 Adicionar as Credenciais

Abra o arquivo `.env.local` e cole:

```env
# Notion Integration
NOTION_API_KEY=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NOTION_VERSION=2022-06-28

# Database IDs
NOTION_DB_TODAY_TASKS=1234567890abcdef1234567890abcdef
NOTION_DB_HOURS_WEEK=abcdef1234567890abcdef123456
NOTION_DB_HOUR_TRACKER=567890abcdef1234567890abcdef12
NOTION_DB_TASK_PANEL=90abcdef1234567890abcdef1234567
NOTION_DB_ACTIVE_PROJECTS=cdef1234567890abcdef12345678
NOTION_DB_ROADMAP=234567890abcdef1234567890ab

# GitHub (opcional - para integração futura)
GITHUB_TOKEN=
GITHUB_USERNAME=

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Substitua:**
- `secret_XXXX` pelo seu Integration Token (do Passo 1.3)
- Cada Database ID pelos IDs que você copiou (do Passo 3.2)

### 4.3 Verificar Segurança

⚠️ **IMPORTANTE - Segurança:**

1. O arquivo `.env.local` já está no `.gitignore`
2. NUNCA faça commit de `.env.local`
3. NUNCA compartilhe o Integration Token
4. Se vazar, revogue e crie um novo em https://www.notion.so/my-integrations

---

## ✅ PASSO 5: Testar a Conexão

### 5.1 Instalar Dependências

```bash
cd frontend
npm install
```

### 5.2 Rodar em Desenvolvimento

```bash
npm run dev
```

### 5.3 Verificar no Console

Você deve ver:

```
✓ Ready in 2.3s
○ Local: http://localhost:3000
✓ Notion connection successful
✓ 6 databases connected
```

### 5.4 Acessar o Dashboard

Abra no navegador:
```
http://localhost:3000
```

Se aparecer a tela inicial com seus dados, **SUCESSO!** 🎉

---

## 🔍 PASSO 6: Verificar Estrutura das Databases

Para o dashboard funcionar perfeitamente, suas databases precisam ter algumas propriedades específicas.

### 6.1 Database: "Today's Tasks"

**Propriedades necessárias:**
- ✅ Name (Title)
- ✅ Priority Level (Select: Alta Prioridade, Média Prioridade, Baixa Prioridade)
- ✅ Estimated Time (Number)
- ✅ Status (Select: A Fazer, Fazendo, Concluído)
- ✅ Description (Text)

**Se faltar alguma propriedade:**
1. Abra a database
2. Clique em **"+ New Property"**
3. Adicione a propriedade faltante

### 6.2 Database: "Hours This Week"

**Propriedades necessárias:**
- ✅ Time dedicated during the week (Title)
- ✅ Category (Select: Estudos, Projetos, Idiomas, Desenvolvimento Pessoal)
- ✅ Horas Plan. (Number)
- ✅ Horas Real. (Number)
- ✅ Status (Select: Em andamento, A iniciar, Fazendo, etc)
- ✅ Description (Text)

### 6.3 Database: "Hour Tracker"

**Propriedades necessárias:**
- ✅ Prohibited (Title) - nome da atividade
- ✅ Category (Select: Prática, Leitura, Inglês, Estudo, Projeto)
- ✅ Project (Select: HashTag Treinamentos, Method Callan, Site B77, etc)
- ✅ Date (Date)
- ✅ Hours (Number)
- ✅ Activity (Text)

### 6.4 Database: "Task Panel"

**Propriedades necessárias:**
- ✅ Task (Title)
- ✅ Category (Select: Inglês, Prática, Projeto, Estudo)
- ✅ Priority (Select: Alta, Média, Baixa)
- ✅ Status (Select: Complete, In progress, To-do, No Status)
- ✅ Date (Date) - prazo
- ✅ Progress (Number ou Select: 0%, 25%, 50%, 75%, 100%)

### 6.5 Database: "Active Projects"

**Propriedades necessárias:**
- ✅ Projetos Ativos (Title)
- ✅ Status (Select: Em teste, Pausado, Em desenvolvimento, etc)
- ✅ Priority (Select: Urgente, Alta, Média)
- ✅ Date (Date) - deadline

### 6.6 Database: "12-Month Roadmap"

**Propriedades necessárias:**
- ✅ Projetos do Ano (Title)
- ✅ Date (Date)
- ✅ Categoria (Select: Projetos/Portfólio, Conquistas, Estudos/Cursos, etc)
- ✅ Status (Select: Em progresso, Planejado, Pausado, Concluído)
- ✅ Priority (Select: Alta, Baixa, Média)

---

## 🆕 PASSO 7: Adicionar Campos Novos (KPIs)

Para trackear alguns KPIs, você precisa adicionar novos campos:

### 7.1 Em "Hour Tracker" - Adicione:

**Campo: Type**
- Tipo: Select
- Opções: Feature, Bug, Refactor, Docs, Study

Como adicionar:
1. Abra "Hour Tracker"
2. Clique em **"+"** para nova propriedade
3. Nome: `Type`
4. Tipo: `Select`
5. Adicione as opções acima

### 7.2 Em "Task Panel" - Adicione:

**Campo: Bugs Resolved**
- Tipo: Number

**Campo: Concepts Learned**
- Tipo: Multi-select
- Opções: (adicione conforme você aprende)

**Campo: Exercises Done**
- Tipo: Number

### 7.3 Em "Hours This Week" - Adicione:

**Campo: Module Completed**
- Tipo: Checkbox ou Text

**Campo: Worksheets**
- Tipo: Number

---

## 🐛 Troubleshooting (Solução de Problemas)

### Erro: "Unauthorized"
**Causa:** Token inválido ou database não conectada
**Solução:**
1. Verifique se o token está correto em `.env.local`
2. Confirme que a database está conectada à Integration (Passo 2.2)

### Erro: "Database not found"
**Causa:** Database ID incorreto
**Solução:**
1. Copie novamente o Database ID
2. Verifique se não tem espaços extras no `.env.local`

### Erro: "Could not find database with ID"
**Causa:** Database não compartilhada com a Integration
**Solução:**
1. Abra a database
2. Clique nos 3 pontinhos → Add connections
3. Selecione "KPI Dashboard"

### Dados não aparecem
**Causa:** Campos com nomes diferentes
**Solução:**
1. Verifique a estrutura das databases (Passo 6)
2. Certifique-se que os nomes das propriedades estão corretos

### Dashboard em branco
**Causa:** Sem dados nas databases
**Solução:**
1. Adicione pelo menos 1 entrada em cada database
2. Refresh a página

---

## ✅ Checklist Final

Antes de prosseguir, confirme:

- [ ] Integration criada no Notion
- [ ] Token copiado e salvo
- [ ] 6 databases conectadas à Integration
- [ ] 6 Database IDs copiados
- [ ] Arquivo `.env.local` criado
- [ ] Todas variáveis preenchidas
- [ ] Propriedades das databases verificadas
- [ ] Campos novos adicionados
- [ ] `npm install` executado
- [ ] `npm run dev` funcionando
- [ ] Dashboard acessível em localhost:3000
- [ ] Dados aparecendo na tela

---

## 🚀 Próximos Passos

Após completar este setup:

1. ✅ Notion configurado e conectado
2. ➡️ **Próximo:** Personalizar o dashboard
3. ➡️ Configurar gráficos
4. ➡️ Deploy na Vercel

---

## 📚 Recursos Adicionais

- [Documentação Oficial Notion API](https://developers.notion.com/)
- [Guia de Propriedades Notion](https://www.notion.so/help/database-properties)
- [Troubleshooting Notion API](https://developers.notion.com/docs/troubleshooting)

---

## 💬 Dúvidas?

Se algo não funcionou, verifique:
1. Console do navegador (F12) para erros
2. Terminal onde `npm run dev` está rodando
3. Se todas as databases têm ao menos 1 entrada

---

**Parabéns! Seu Notion está conectado! 🎉**

Próximo arquivo: `SETUP.md` (instalação completa do projeto)
