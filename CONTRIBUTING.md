# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o KPI Dashboard! Este documento explica como você pode ajudar.

---

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)
- [Desenvolvendo](#desenvolvendo)
- [Pull Requests](#pull-requests)
- [Guia de Estilo](#guia-de-estilo)

---

## 📜 Código de Conduta

Este projeto segue um código de conduta simples:

- ✅ Seja respeitoso e inclusivo
- ✅ Aceite críticas construtivas
- ✅ Foque no que é melhor para a comunidade
- ✅ Demonstre empatia com outros membros

Comportamentos inaceitáveis:
- ❌ Linguagem ou imagens sexualizadas
- ❌ Trolling, insultos ou ataques pessoais
- ❌ Assédio público ou privado
- ❌ Publicar informações privadas de outros

---

## 🎯 Como Posso Contribuir?

Existem várias formas de contribuir:

### 1. 🐛 Reportar Bugs
Encontrou um bug? Abra uma issue!

### 2. 💡 Sugerir Features
Tem uma ideia? Compartilhe conosco!

### 3. 📝 Melhorar Documentação
Documentação nunca é demais.

### 4. 💻 Contribuir com Código
Implemente features ou corrija bugs.

### 5. 🎨 Design e UX
Sugestões de melhorias visuais.

### 6. 🧪 Testar
Use o dashboard e reporte problemas.

---

## 🐛 Reportando Bugs

Antes de criar uma issue, verifique se já não existe uma similar.

### Como Reportar

Crie uma issue com:

**Título claro e descritivo:**
```
Bug: Dashboard não carrega dados do Notion
```

**Descrição detalhada:**
```markdown
### Descrição
Ao tentar carregar o dashboard, aparece erro 500.

### Passos para Reproduzir
1. Acesse http://localhost:3000
2. Aguarde carregamento
3. Erro aparece no console

### Comportamento Esperado
Dashboard deveria carregar os dados do Notion.

### Comportamento Atual
Erro 500 no console.

### Screenshots
[Cole screenshot do erro]

### Ambiente
- OS: Windows 11
- Browser: Chrome 120
- Node: v20.10.0
- Versão do projeto: 1.0.0

### Logs
```
Error: Database not found
    at /api/dashboard.js:23
```

### Informação Adicional
Funcionava ontem, parou hoje após atualizar dependências.
```

---

## 💡 Sugerindo Melhorias

### Features Novas

Use o template:

```markdown
### Feature Sugerida
Integração com GitHub API para buscar commits automaticamente.

### Motivação
Atualmente é preciso registrar commits manualmente no Notion.

### Solução Proposta
1. Adicionar campo GITHUB_TOKEN no .env
2. Criar endpoint /api/github
3. Buscar commits via API do GitHub
4. Atualizar KPI de commits automaticamente

### Alternativas Consideradas
- Webhook do GitHub (mais complexo)
- Scraping do perfil (não confiável)

### Informação Adicional
GitHub API é grátis até 5000 requests/hora.
```

### Melhorias

```markdown
### Melhoria Sugerida
Dashboard carrega muito devagar.

### Problema Atual
Leva ~3 segundos para carregar.

### Solução Proposta
Implementar ISR (Incremental Static Regeneration) do Next.js.

### Benefícios
- Carregamento instantâneo
- Dados ainda atualizados
- Melhor experiência do usuário
```

---

## 💻 Desenvolvendo

### Setup Inicial

```bash
# 1. Fork o projeto
# Clique em "Fork" no GitHub

# 2. Clone seu fork
git clone https://github.com/SEU-USUARIO/kpi-dashboard.git
cd kpi-dashboard

# 3. Adicione upstream
git remote add upstream https://github.com/ORIGINAL/kpi-dashboard.git

# 4. Instale dependências
cd frontend
npm install

# 5. Configure .env.local
cp ../.env.example .env.local
# Edite com suas credenciais

# 6. Rode em desenvolvimento
npm run dev
```

### Criando uma Branch

```bash
# Sempre crie uma branch para suas mudanças
git checkout -b feature/nome-da-feature

# Exemplos de nomes:
# feature/github-integration
# fix/dashboard-loading-bug
# docs/improve-setup-guide
# refactor/kpi-calculation
```

### Desenvolvendo

1. **Faça suas alterações**
2. **Teste localmente**
3. **Siga o guia de estilo**
4. **Commit com mensagens claras**

```bash
# Commits seguindo convenção
git commit -m "feat: add GitHub API integration"
git commit -m "fix: resolve dashboard loading issue"
git commit -m "docs: improve SETUP.md clarity"
```

### Tipos de Commit

- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (sem mudança de código)
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 🔀 Pull Requests

### Antes de Submeter

- [ ] Código segue o guia de estilo
- [ ] Testado localmente
- [ ] Documentação atualizada (se necessário)
- [ ] Sem warnings no console
- [ ] Build passa (`npm run build`)

### Como Submeter

1. **Push para seu fork:**
```bash
git push origin feature/nome-da-feature
```

2. **Abra Pull Request no GitHub**

3. **Preencha o template:**

```markdown
### Descrição
Implementa integração com GitHub API para buscar commits.

### Tipo de Mudança
- [ ] Bug fix
- [x] Nova feature
- [ ] Breaking change
- [ ] Documentação

### Como Testar
1. Configure GITHUB_TOKEN no .env.local
2. Acesse o dashboard
3. KPI de commits deve atualizar automaticamente

### Checklist
- [x] Código testado localmente
- [x] Documentação atualizada
- [x] Sem warnings
- [x] Build passa
- [x] Segue guia de estilo

### Screenshots
[Se aplicável]

### Issues Relacionadas
Closes #42
```

4. **Aguarde review**

### Durante o Review

- Responda comentários
- Faça ajustes solicitados
- Seja receptivo a feedback
- Faça commits adicionais se necessário

```bash
# Fazer mudanças solicitadas
git add .
git commit -m "fix: address review comments"
git push origin feature/nome-da-feature
```

---

## 🎨 Guia de Estilo

### JavaScript/React

#### Nomenclatura

```javascript
// Componentes: PascalCase
function KPICard() {}

// Funções: camelCase
function calculateKPIs() {}

// Constantes: UPPER_SNAKE_CASE
const KPI_TARGETS = {};

// Variáveis: camelCase
const totalHours = 20;
```

#### Imports

Ordem preferencial:

```javascript
// 1. React/Next
import { useState } from 'react';
import Link from 'next/link';

// 2. Bibliotecas externas
import { format } from 'date-fns';

// 3. Hooks customizados
import { useTheme } from '@/hooks/useTheme';

// 4. Componentes
import Header from '@/components/Header';

// 5. Utilitários
import { formatDate } from '@/lib/utils';

// 6. Estilos (se houver)
import styles from './styles.module.css';
```

#### Componentes

```javascript
// ✅ Bom
export default function KPICard({ kpi }) {
  const { value, status } = kpi;
  
  return (
    <div className="card">
      <span>{value}</span>
    </div>
  );
}

// ❌ Evitar
export default function KPICard(props) {
  return <div className="card"><span>{props.kpi.value}</span></div>
}
```

#### Hooks

```javascript
// ✅ Bom
const { data, loading, error } = useDashboard();

if (loading) return <Loading />;
if (error) return <Error />;

return <Dashboard data={data} />;

// ❌ Evitar
const dashboard = useDashboard();
return dashboard.loading ? <Loading /> : dashboard.error ? <Error /> : <Dashboard />;
```

### CSS/Tailwind

```jsx
// ✅ Bom - Classes ordenadas logicamente
<div className="
  flex items-center gap-4
  p-4 rounded-lg
  bg-white dark:bg-slate-800
  hover:shadow-lg transition-shadow
">

// ❌ Evitar - Misturado
<div className="flex bg-white p-4 items-center dark:bg-slate-800 gap-4 hover:shadow-lg rounded-lg transition-shadow">
```

### Comentários

```javascript
// ✅ Bom - Explica o "porquê"
// Usamos debounce para evitar requests excessivos ao Notion
const debouncedFetch = debounce(fetchData, 500);

// ❌ Evitar - Explica o óbvio
// Chama a função fetchData
fetchData();
```

### Funções

```javascript
// ✅ Bom - Pequenas e focadas
function calculateProgress(current, target) {
  if (!target) return 0;
  return Math.min(100, (current / target) * 100);
}

// ❌ Evitar - Muito grande
function processData(data) {
  // 100 linhas de código...
}
```

---

## 📝 Documentação

### Docstrings

```javascript
/**
 * Calcula porcentagem de progresso
 * @param {number} current - Valor atual
 * @param {number} target - Valor alvo
 * @returns {number} Porcentagem (0-100)
 */
function calculateProgress(current, target) {
  // ...
}
```

### README

Ao adicionar feature, atualize:
- README.md (se afeta uso geral)
- CHANGELOG.md (sempre)
- API.md (se afeta API)

---

## 🧪 Testes

Atualmente não temos testes automatizados, mas você pode:

### Checklist Manual

- [ ] Testa em desktop
- [ ] Testa em mobile (ou DevTools)
- [ ] Testa dark mode
- [ ] Testa light mode
- [ ] Testa com dados vazios
- [ ] Testa com muitos dados
- [ ] Verifica console (sem erros)
- [ ] Build passa sem warnings

---

## ❓ Dúvidas?

- 📧 Email: suporte@exemplo.com
- 💬 Discord: [Link do servidor]
- 🐛 Issues: [GitHub Issues](https://github.com/usuario/repo/issues)

---

## 🙏 Agradecimentos

Toda contribuição é valiosa! Desde reportar um bug até implementar uma feature complexa.

**Obrigado por tornar o KPI Dashboard melhor!** 💙

---

**Guia baseado em:**
- [Contributor Covenant](https://www.contributor-covenant.org/)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Conventional Commits](https://www.conventionalcommits.org/)
