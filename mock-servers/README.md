# 🎭 Mock Servers - Jira & Confluence Locais

Simule Jira e Confluence **sem precisar de tokens de API** para apresentações e testes locais.

---

## 📋 O que é

Mock servers que simulam as APIs de Jira e Confluence 100% localmente:

```
✅ Não precisa de tokens
✅ Não precisa de internet
✅ Roda em localhost
✅ Perfeito para demonstração
✅ Respostas realistas (same format das APIs reais)
```

---

## 🚀 Início Rápido

### Pré-requisito: Node.js

```bash
# Verificar se tem Node.js
node --version

# Se não tem, instale de: https://nodejs.org/
```

### Opção 1: Linux / macOS (Bash)

```bash
# Tornar script executável
chmod +x start-mocks.sh

# Iniciar
./start-mocks.sh

# Saída esperada:
# ✅ Ambos servidores rodando!
# 🔗 URLs:
#    Jira Mock:       http://localhost:8001
#    Confluence Mock: http://localhost:8002
```

### Opção 2: Windows (PowerShell)

```powershell
# Permitir execução de scripts (se necessário)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Iniciar
.\start-mocks.ps1

# Saída esperada:
# ✅ Ambos servidores rodando!
# 🔗 URLs:
#    Jira Mock:       http://localhost:8001
#    Confluence Mock: http://localhost:8002
```

### Opção 3: Iniciar Manualmente

```bash
# Terminal 1 - Jira Mock
node jira-mock.js

# Terminal 2 - Confluence Mock
node confluence-mock.js
```

---

## ✅ Testar Conexão

### Com curl

```bash
# Testar Jira
curl http://localhost:8001/rest/api/3/projects/SQUAD

# Testar Confluence
curl http://localhost:8002/rest/api/3/spaces/SQUAD
```

### Com PowerShell

```powershell
# Testar Jira
Invoke-WebRequest http://localhost:8001/rest/api/3/projects/SQUAD

# Testar Confluence
Invoke-WebRequest http://localhost:8002/rest/api/3/spaces/SQUAD
```

### Resultado esperado

```json
{
  "key": "SQUAD",
  "name": "Squad Framework Demo",
  ...
}
```

---

## 📍 Endpoints Disponíveis

### Jira Mock (porta 8001)

```
GET /rest/api/3/projects/SQUAD
   → Retorna projeto SQUAD

GET /rest/api/3/projects/SQUAD/issues
   → Lista todas as issues (SQUAD-1, SQUAD-2, SQUAD-3)

GET /rest/api/3/issues/SQUAD-1
GET /rest/api/3/issues/SQUAD-2
GET /rest/api/3/issues/SQUAD-3
   → Retorna issue específica

GET /rest/api/3/boards
   → Lista boards

GET /rest/api/3/sprints
   → Lista sprints

GET /rest/api/3/user/myself
   → Retorna usuário autenticado (fake)
```

### Confluence Mock (porta 8002)

```
GET /rest/api/3/spaces/SQUAD
   → Retorna space SQUAD

GET /rest/api/3/spaces/SQUAD/pages
   → Lista todas as páginas do space

GET /rest/api/3/pages/100
GET /rest/api/3/pages/101
GET /rest/api/3/pages/102
GET /rest/api/3/pages/103
GET /rest/api/3/pages/104
   → Retorna página específica (Overview, Conceitos, Framework, etc)

GET /rest/api/3/user/current
   → Retorna usuário autenticado (fake)
```

---

## 🔧 Configuração do `.env`

Para usar os mock servers no seu projeto:

```bash
# Jira Mock
JIRA_HOST=http://localhost:8001
JIRA_EMAIL=demo@squad.local
JIRA_API_TOKEN=mock-token-local

# Confluence Mock
CONFLUENCE_HOST=http://localhost:8002/wiki
CONFLUENCE_EMAIL=demo@squad.local
CONFLUENCE_API_TOKEN=mock-token-local

# GitHub (ainda precisa de token real)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=seu-user
GITHUB_REPO=squad-framework-demo
```

---

## 📊 Dados Simulados

### Issues Jira

```
SQUAD-1: Setup Python environment
         Status: To Do
         Priority: High
         Assignee: Developer Squad

SQUAD-2: Configure GCP credentials
         Status: To Do
         Priority: High
         Assignee: DevOps Squad

SQUAD-3: Test MCP connections
         Status: To Do
         Priority: Medium
         Assignee: QA Squad
```

### Páginas Confluence

```
Overview
├─ CONCEITOS_BASICOS
├─ SQUAD_FRAMEWORK
├─ TRAINING_AGENDA
├─ SETUP_GUIDE
└─ TROUBLESHOOTING
```

---

## ⚠️ Portas em Uso

Se as portas padrão já estão sendo usadas:

### Linux / macOS

```bash
# Listar o que está usando a porta
lsof -i :8001

# Usar porta diferente
PORT=8003 node jira-mock.js
PORT=8004 node confluence-mock.js
```

### Windows

```powershell
# Listar o que está usando a porta
Get-NetTCPConnection -LocalPort 8001

# Usar porta diferente
$env:PORT=8003; node jira-mock.js
$env:PORT=8004; node confluence-mock.js
```

---

## 🛑 Parar os Servidores

### Com script bash

```bash
# Ctrl+C na terminal onde está rodando
# ou
./stop-mocks.sh  # (se implementado)
```

### Com PowerShell

```powershell
# Ctrl+C na janela
# ou
Get-Process node | Stop-Process
```

---

## 🔄 Adicionar Mais Dados

Para adicionar mais issues ou páginas, edite os arquivos:

### Para Jira (`jira-mock.js`)

Edite o objeto `mockData.issues`:

```javascript
"SQUAD-4": {
  key: "SQUAD-4",
  id: "10004",
  fields: {
    summary: "Build User API",
    description: "Criar endpoint de usuários",
    status: { name: "In Progress", id: "10001" },
    priority: { name: "High" },
    assignee: { displayName: "Developer Squad" },
    created: "2026-04-13T10:00:00.000+0000"
  }
}
```

### Para Confluence (`confluence-mock.js`)

Edite o objeto `mockData.pages`:

```javascript
"105": {
  id: "105",
  type: "page",
  title: "Nova Página",
  space: { key: "SQUAD" },
  body: {
    storage: {
      value: "<h1>Título</h1><p>Conteúdo aqui</p>"
    }
  }
}
```

Depois adicione a rota em `routes`:

```javascript
"/rest/api/3/pages/105": (req, res) => {
  returnJson(res, 200, mockData.pages["105"]);
}
```

---

## 💡 Use Cases

### Apresentação

```
Seu chefe quer ver demonstração ainda hoje?
✅ Inicia mocks sem precisar de tokens
✅ Mostra Jira + Confluence funcionando
✅ Roda agents normalmente
✅ GitHub Actions com token real
= Apresentação impressionante em 5 min!
```

### Desenvolvimento

```
Quer testar agentes sem tokens?
✅ Inicia mocks no dev
✅ Debugga agentes localmente
✅ Sem depender de credenciais externas
✅ Testes reproducíveis
```

### CI/CD

```
Quer testar pipeline sem credenciais?
✅ Deploy mocks em container
✅ Testa integração de ponta a ponta
✅ Sem vazamento de secrets
```

---

## 🐛 Troubleshooting

### Porta já em uso

```
Erro: EADDRINUSE: address already in use
Solução: Use PORT=8003 node jira-mock.js
```

### Node.js não encontrado

```
Erro: command not found: node
Solução: Instale Node.js de https://nodejs.org/
```

### Permissão negada (Linux/Mac)

```
Erro: Permission denied
Solução: chmod +x start-mocks.sh
```

### PowerShell não executa scripts

```
Erro: cannot be loaded because running scripts is disabled
Solução: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📚 Documentação Completa

Para setup completo com Jira/Confluence reais (com tokens):
👉 Veja `../SETUP_COMPLETO.md`

Para entender como funciona o framework:
👉 Veja `../CONCEITOS_BASICOS.md`

---

## ✨ Próximos Passos

1. ✅ Inicia mocks com `./start-mocks.sh` ou `.\start-mocks.ps1`
2. ✅ Configura `.env` para usar localhost
3. ✅ Testa `/squad-feature-kickoff` (cria issues no "Jira")
4. ✅ Aproveita para apresentação sem depender de credenciais!

---

## 📞 Suporte

Problemas? Confira:
- Porta está? → `lsof -i :8001` ou `Get-NetTCPConnection -LocalPort 8001`
- Node rodando? → `node --version`
- Firewall bloqueando? → Teste com `curl localhost:8001` ou `Invoke-WebRequest`

---
