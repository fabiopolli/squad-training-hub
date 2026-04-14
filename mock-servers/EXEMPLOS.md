# Exemplos de Uso - Mock Servers

Este arquivo contém exemplos práticos de como usar os mock servers.

---

## 🚀 Início Rápido

### 1. Iniciar os mocks

**Linux/Mac:**
```bash
chmod +x start-mocks.sh
./start-mocks.sh
```

**Windows:**
```powershell
.\start-mocks.ps1
```

### 2. Testar em outra terminal

---

## 📝 Exemplos com curl

### Jira - Listar projeto

```bash
curl http://localhost:8001/rest/api/3/projects/SQUAD
```

### Jira - Listar todas as issues

```bash
curl http://localhost:8001/rest/api/3/projects/SQUAD/issues
```

### Jira - Pegar issue específica

```bash
curl http://localhost:8001/rest/api/3/issues/SQUAD-1
curl http://localhost:8001/rest/api/3/issues/SQUAD-2
curl http://localhost:8001/rest/api/3/issues/SQUAD-3
```

### Jira - Listar boards

```bash
curl http://localhost:8001/rest/api/3/boards
```

### Jira - Listar sprints

```bash
curl http://localhost:8001/rest/api/3/sprints
```

### Confluence - Listar space

```bash
curl http://localhost:8002/rest/api/3/spaces/SQUAD
```

### Confluence - Listar páginas

```bash
curl http://localhost:8002/rest/api/3/spaces/SQUAD/pages
```

### Confluence - Pegar página específica

```bash
curl http://localhost:8002/rest/api/3/pages/100  # Overview
curl http://localhost:8002/rest/api/3/pages/101  # CONCEITOS_BASICOS
curl http://localhost:8002/rest/api/3/pages/102  # SQUAD_FRAMEWORK
curl http://localhost:8002/rest/api/3/pages/103  # TRAINING_AGENDA
curl http://localhost:8002/rest/api/3/pages/104  # SETUP_GUIDE
```

---

## 📝 Exemplos com PowerShell

### Jira - Listar projeto

```powershell
Invoke-WebRequest http://localhost:8001/rest/api/3/projects/SQUAD | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-Table
```

### Jira - Listar todas as issues

```powershell
(Invoke-WebRequest http://localhost:8001/rest/api/3/projects/SQUAD/issues).Content | ConvertFrom-Json | Select-Object -ExpandProperty issues | Format-Table key, summary
```

### Jira - Pegar issue específica

```powershell
(Invoke-WebRequest http://localhost:8001/rest/api/3/issues/SQUAD-1).Content | ConvertFrom-Json | Select-Object key, @{Name="Summary";Expression={$_.fields.summary}}
```

### Confluence - Listar space

```powershell
Invoke-WebRequest http://localhost:8002/rest/api/3/spaces/SQUAD | Select-Object -ExpandProperty Content | ConvertFrom-Json | Format-Table key, name
```

### Confluence - Listar páginas

```powershell
(Invoke-WebRequest http://localhost:8002/rest/api/3/spaces/SQUAD/pages).Content | ConvertFrom-Json | Select-Object -ExpandProperty results | Select-Object id, title
```

---

## 🔄 Exemplos com Python

### Verificar conexão

```python
import requests

# Jira
try:
    resp = requests.get('http://localhost:8001/rest/api/3/projects/SQUAD')
    print(f"✅ Jira OK: {resp.json()['name']}")
except Exception as e:
    print(f"❌ Jira FAIL: {e}")

# Confluence
try:
    resp = requests.get('http://localhost:8002/rest/api/3/spaces/SQUAD')
    print(f"✅ Confluence OK: {resp.json()['name']}")
except Exception as e:
    print(f"❌ Confluence FAIL: {e}")
```

### Listar issues Jira

```python
import requests
import json

resp = requests.get('http://localhost:8001/rest/api/3/projects/SQUAD/issues')
issues = resp.json()['issues']

for issue in issues:
    print(f"- {issue['key']}: {issue['fields']['summary']}")
```

### Listar páginas Confluence

```python
import requests

resp = requests.get('http://localhost:8002/rest/api/3/spaces/SQUAD/pages')
pages = resp.json()['results']

for page in pages:
    print(f"- {page['id']}: {page['title']}")
```

---

## 🧪 Script de Teste Completo

### Teste em bash

```bash
#!/bin/bash

echo "🧪 Testando Mock Servers"
echo ""

# Jira
echo "📌 Jira Mock..."
JIRA_RESPONSE=$(curl -s http://localhost:8001/rest/api/3/projects/SQUAD)
if echo "$JIRA_RESPONSE" | grep -q "Squad Framework"; then
    echo "✅ Jira OK"
else
    echo "❌ Jira FAIL"
fi

# Confluence
echo "📌 Confluence Mock..."
CONFLUENCE_RESPONSE=$(curl -s http://localhost:8002/rest/api/3/spaces/SQUAD)
if echo "$CONFLUENCE_RESPONSE" | grep -q "Squad Framework"; then
    echo "✅ Confluence OK"
else
    echo "❌ Confluence FAIL"
fi

echo ""
echo "🎉 Testes completos!"
```

### Teste em PowerShell

```powershell
Write-Host "🧪 Testando Mock Servers" -ForegroundColor Green
Write-Host ""

# Jira
Write-Host "📌 Jira Mock..." -ForegroundColor Cyan
try {
    $jira = (Invoke-WebRequest http://localhost:8001/rest/api/3/projects/SQUAD -UseBasicParsing).Content
    if ($jira -match "Squad Framework") {
        Write-Host "✅ Jira OK" -ForegroundColor Green
    } else {
        Write-Host "❌ Jira FAIL" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Jira FAIL: $_" -ForegroundColor Red
}

# Confluence
Write-Host "📌 Confluence Mock..." -ForegroundColor Cyan
try {
    $confluence = (Invoke-WebRequest http://localhost:8002/rest/api/3/spaces/SQUAD -UseBasicParsing).Content
    if ($confluence -match "Squad Framework") {
        Write-Host "✅ Confluence OK" -ForegroundColor Green
    } else {
        Write-Host "❌ Confluence FAIL" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Confluence FAIL: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Testes completos!" -ForegroundColor Green
```

---

## 🔗 Usando em Agentes/Prompts

### Seu `.env` com mocks

```bash
# Mock Servers
JIRA_HOST=http://localhost:8001
JIRA_EMAIL=demo@squad.local
JIRA_API_TOKEN=mock-local

CONFLUENCE_HOST=http://localhost:8002/wiki
CONFLUENCE_EMAIL=demo@squad.local
CONFLUENCE_API_TOKEN=mock-local

# GitHub real
GITHUB_TOKEN=ghp_your_real_token
```

### Use nos prompts

```
/squad-feature-kickoff
  → Agente usa JIRA_HOST local (sem token real necessário)

/squad-qa-validation
  → Agente usa dados locais do mock

/squad-deployment-checklist
  → Agente usa dados locais do mock
```

---

## ✨ Vantagens desse Setup

```
✅ Sem Internet necessária
✅ Sem tokens reais
✅ Super rápido
✅ Respostas realistas
✅ Perfeito para demo
✅ Seguro (sem credenciais vazadas)
```

---

## 📚 Próximos Passos

1. **Teste os mocks** com exemplos acima
2. **Configure `.env`** com dados do mock
3. **Execute `/squad-feature-kickoff`** no chat
4. **Veja a magia acontecer!** ✨

---
