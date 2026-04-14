# Script para iniciar ambos os mock servers (Windows)
# Uso: .\start-mocks.ps1

Write-Host ""
Write-Host "🚀 Iniciando Mock Servers para Squad Framework" -ForegroundColor Green
Write-Host ""

# Verificar se Node.js está instalado
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if ($null -eq $nodeCheck) {
    Write-Host "❌ Node.js não está instalado!" -ForegroundColor Red
    Write-Host "   Instale de https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Node.js encontrado: $(node --version)" -ForegroundColor Green
Write-Host ""

# Função para verificar porta
function Test-Port($port) {
    $portCheck = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    return $null -ne $portCheck
}

# Verificar porta 8001 (Jira)
$jiraPortInUse = Test-Port 8001
if ($jiraPortInUse) {
    Write-Host "⚠️  Porta 8001 (Jira) já está em uso!" -ForegroundColor Yellow
    $JIRA_PORT = 8003
    Write-Host "   Usando porta alternativa: $JIRA_PORT" -ForegroundColor Yellow
} else {
    $JIRA_PORT = 8001
}

# Verificar porta 8002 (Confluence)
$confluencePortInUse = Test-Port 8002
if ($confluencePortInUse) {
    Write-Host "⚠️  Porta 8002 (Confluence) já está em uso!" -ForegroundColor Yellow
    $CONFLUENCE_PORT = 8004
    Write-Host "   Usando porta alternativa: $CONFLUENCE_PORT" -ForegroundColor Yellow
} else {
    $CONFLUENCE_PORT = 8002
}

Write-Host ""
Write-Host "📌 Iniciando Jira Mock Server na porta $JIRA_PORT..." -ForegroundColor Cyan
$env:PORT = $JIRA_PORT
Start-Process -FilePath "node" -ArgumentList "jira-mock.js" -NoNewWindow

Start-Sleep -Seconds 1

Write-Host "📌 Iniciando Confluence Mock Server na porta $CONFLUENCE_PORT..." -ForegroundColor Cyan
$env:PORT = $CONFLUENCE_PORT
Start-Process -FilePath "node" -ArgumentList "confluence-mock.js" -NoNewWindow

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "✅ Ambos servidores rodando!" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 URLs:" -ForegroundColor Yellow
Write-Host "   Jira Mock:       http://localhost:$JIRA_PORT" -ForegroundColor Cyan
Write-Host "   Confluence Mock: http://localhost:$CONFLUENCE_PORT" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Teste com PowerShell:" -ForegroundColor Yellow
Write-Host "   Invoke-WebRequest http://localhost:$JIRA_PORT/rest/api/3/projects/SQUAD -UseBasicParsing | Select -ExpandProperty Content" -ForegroundColor Gray
Write-Host "   Invoke-WebRequest http://localhost:$CONFLUENCE_PORT/rest/api/3/spaces/SQUAD -UseBasicParsing | Select -ExpandProperty Content" -ForegroundColor Gray
Write-Host ""
Write-Host "⏹️  Para parar os servidores:" -ForegroundColor Yellow
Write-Host "   Get-Process node | Stop-Process" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Ou deixe as janelas abertas e feche-as quando terminar" -ForegroundColor Yellow
Write-Host ""
