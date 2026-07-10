# ❓ FAQ - Perguntas Frequentes

Respostas para as perguntas mais comuns sobre o KPI Dashboard.

---

## 📋 Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Integração](#integração)
- [Problemas](#problemas)
- [Preços & Planos](#preços--planos)
- [Segurança](#segurança)

---

## Instalação

### P: Qual versão de Node.js preciso?

**R:** Node.js 18+ (recomendado 20+). Verifique com `node --version`.

---

### P: Posso instalar no Windows?

**R:** Sim! Siga o NOTION_SETUP.md que tem instruções específicas para Windows, Mac e Linux.

---

### P: Quanto espaço em disco preciso?

**R:** ~500MB após instalação (depende de node_modules). Git clone pesa ~50MB.

---

### P: Preciso de um servidor próprio?

**R:** Não! Use Vercel (grátis) para deploy. Veja DEPLOYMENT.md.

---

## Configuração

### P: Como obtenho o token do Notion?

**R:**

1. Acesse https://www.notion.so/my-integrations
2. Clique "New integration"
3. Preencha o formulário
4. Copie o token (começa com `secret_`)

**⚠️ NUNCA compartilhe o token!**

---

### P: Preciso de todas as 6 databases do Notion?

**R:** Sim! O projeto espera:

- Today's Tasks
- Hours This Week
- Hour Tracker
- Task Panel
- Active Projects
- 12-Month Roadmap

Se quiser usar menos, edite `pages/api/dashboard.js`.

---

### P: Posso mudar os nomes das databases?

**R:** Sim, mas precisa atualizar o código em `lib/dashboard.js`. Não é recomendado para iniciantes.

---

### P: Como reseto as configurações?

**R:** Delete o arquivo `.env.local` e refaça o passo 4 do NOTION_SETUP.md.

---

### P: Meu `.env.local` não está funcionando

**R:**

1. Verifique se está na pasta `frontend/`
2. Não espaços extras nas values
3. Reinicie o servidor (`npm run dev`)
4. Recarregue o navegador (Ctrl+Shift+R = cache limpo)

---

## Uso

### P: Com que frequência os dados atualizam?

**R:**

- **Automático**: A cada 10 minutos
- **Manual**: Clique no botão ⚡ "Atualizar"
- **Webhook GitHub**: Instantâneo (quando você commita)

---

### P: Por que meus dados não aparecem?

**R:**

1. Verifique se as databases têm dados
2. Confirme que conectou TODAS as databases ao Integration
3. Verifique o console (F12) para erros
4. Veja o terminal do servidor para logs

---

### P: Posso usar com múltiplos usuários?

**R:**

- **v1.6.0**: Não, apenas 1 usuário (use Notion compartilhado)
- **v2.0.0**: Sim! Multi-user com autenticação

---

### P: Como exporto meus dados?

**R:**

- **PDF**: Clique "Baixar PDF" em /relatorios
- **Notion**: Dados originam do Notion, exporte lá
- **CSV**: Futuro (v2.0+)

---

### P: Funciona offline?

**R:**

- **Dashboard**: Sim, mostra último dado cached
- **Dados novos**: Não, precisa internet
- **PWA**: Instalável como app (Menu → Install app)

---

## Integração

### P: Posso conectar outras ferramentas além de GitHub e Notion?

**R:**

- **v1.6.0**: Apenas GitHub e Notion
- **v2.0.0**: Slack integration
- **v2.2.0**: Email, Calendar, Zapier

---

### P: GitHub mostra dados incorretos

**R:** Possíveis causas:

1. Token GitHub expirado → gere novo em GitHub Settings
2. Repos são forks → remova `fork: false` em `lib/github.js`
3. Timezone errado → check fuso horário em utils.js

---

### P: Notificações não aparecem

**R:**

1. Verifique localStorage não está cheio
2. Abra DevTools → Application → localStorage
3. Delete chave `dismissed-notifications`
4. Recarregue página

---

### P: Webhook do GitHub não funciona

**R:**

1. Verifique URL: `https://seu-dominio.com/api/webhook/github`
2. Confirme Secret no Vercel settings
3. Veja "Recent Deliveries" no webhook GitHub
4. Procure status 200 OK

---

## Problemas

### P: "Cannot find module" error

**R:** Dependências faltando:

```bash
cd frontend
rm -rf node_modules
npm install
```

---

### P: "Port 3000 already in use"

**R:** Mate o processo na porta 3000:

```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <numero> /F
```

Ou use outra porta:

```bash
PORT=3001 npm run dev
```

---

### P: Dashboard carrega muito devagar

**R:**

1. Cache em 10 minutos → espere ou clique "Atualizar"
2. Muitos dados no Notion → filtre databases
3. Internet lenta → check speed em DevTools Network

---

### P: Dark mode não funciona

**R:**

1. Verifique localStorage
2. Recarregue página (Ctrl+Shift+R = cache limpo)
3. Check browser suporta localStorage

---

### P: Dados do Notion não sincronizam

**R:**

1. Verifique se conectou database ao Integration
2. Confirme token é válido
3. Notion pode estar fora do ar → tente depois

---

## Preços & Planos

### P: O projeto é grátis?

**R:**

- **v1.6.0**: Sim, gratuito! 🎉
- **v2.0.0**: Freemium (free + planos pagos)

---

### P: Quando começa a cobrar?

**R:** Ainda não! Continuaremos gratuito enquanto em beta.

Planejamos começar em v2.0 (Julho 2026).

---

### P: Qual será o preço?

**R:** Preço tentativo:

- **Free**: R$0 (básico)
- **Pro**: R$29-39/mês
- **Team**: R$99+/mês
- **Enterprise**: Customizado

Veja SAAS-PLAN.md para detalhes.

---

### P: Preciso pagar para usar v1.6?

**R:** **NÃO!** v1.6 é 100% grátis. Sem cartão de crédito necessário.

---

## Segurança

### P: Meus dados é seguro?

**R:**

- ✅ Dados armazenados no Notion (você controla)
- ✅ Token não exposto (server-side only)
- ✅ Sem servidor próprio (Vercel com HTTPS)
- ✅ Open source (pode auditar código)

---

### P: Vocês veem meus dados?

**R:** **NÃO!**

- Dados ficam 100% no seu Notion
- Não armazenamos nada nos nossos servidores
- Open source = você pode verificar

---

### P: E se meu token vazar?

**R:** Imediatamente:

1. Vá em https://www.notion.so/my-integrations
2. Delete a integration
3. Crie nova integration com novo token
4. Atualize `.env.local` (ou Vercel settings)

---

### P: Posso usar sem compartilhar Notion?

**R:**

- **Dados**: Não, precisa conectar database
- **Com outros**: Use Notion shared workspace (colaboração Notion)

---

### P: Vocês usam senhas criptografadas?

**R:**

- **v1.6**: Sem login (dados pessoais)
- **v2.0**: Sim! Senhas com bcrypt (padrão seguro)

---

## Desenvolvimento

### P: Posso contribuir?

**R:** **SIM!** Veja CONTRIBUTING.md para guidelines.

Aceitamos:

- Bug reports
- Feature suggestions
- Pull requests
- Documentação

---

### P: Como reporto um bug?

**R:**

1. GitHub Issues → New issue
2. Título claro
3. Passos para reproduzir
4. Screenshots se possível
5. Seu ambiente (OS, Node version, etc)

---

### P: Posso fazer fork e customizar?

**R:** **SIM!** Licença MIT permite. Mas:

- Mantenha atribuição
- Compartilhe melhorias (PR)
- Respeite open source spirit

---

### P: Qual é a roadmap?

**R:** Veja ROADMAP.md para visão de futuro até 2027.

Resumo:

- **v2.0** (JUL-AGO): Auth + Billing
- **v2.1** (SET-OUT): Mobile + AI
- **v2.2** (NOV-DEZ): Integrações
- **v3.0** (2027): Ecosystem

---

## Não Encontrou Resposta?

### Opções:

1. **GitHub Issues**: Abra uma issue
2. **Discussions**: Pergunte em Discussions
3. **Email**: luiz@kpi-dashboard.dev (futuro)
4. **Discord**: Servidor da comunidade (futuro)

---

## Última Atualização

**Junho 2026** - Documentação v1.0

---

**Mais dúvidas? Contribua adicionando sua pergunta!** 🚀
