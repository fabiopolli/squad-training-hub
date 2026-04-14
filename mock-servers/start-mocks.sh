#!/bin/bash

# Script para iniciar ambos os mock servers
# Uso: ./start-mocks.sh

echo ""
echo "🚀 Iniciando Mock Servers para Squad Framework"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
  echo "❌ Node.js não está instalado!"
  echo "   Instale de https://nodejs.org/"
  exit 1
fi

# Verificar porta 8001 (Jira)
if lsof -Pi :8001 -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "⚠️  Porta 8001 (Jira) já está em uso!"
  echo "   Use: PORT=8003 node jira-mock.js"
  JIRA_PORT=8003
else
  JIRA_PORT=8001
fi

# Verificar porta 8002 (Confluence)
if lsof -Pi :8002 -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "⚠️  Porta 8002 (Confluence) já está em uso!"
  echo "   Use: PORT=8004 node confluence-mock.js"
  CONFLUENCE_PORT=8004
else
  CONFLUENCE_PORT=8002
fi

echo "📌 Iniciando Jira Mock Server na porta $JIRA_PORT..."
PORT=$JIRA_PORT node jira-mock.js &
JIRA_PID=$!

echo "📌 Iniciando Confluence Mock Server na porta $CONFLUENCE_PORT..."
PORT=$CONFLUENCE_PORT node confluence-mock.js &
CONFLUENCE_PID=$!

echo ""
echo "✅ Ambos servidores rodando!"
echo ""
echo "🔗 URLs:"
echo "   Jira Mock:       http://localhost:$JIRA_PORT"
echo "   Confluence Mock: http://localhost:$CONFLUENCE_PORT"
echo ""
echo "📝 Teste com curl:"
echo "   curl http://localhost:$JIRA_PORT/rest/api/3/projects/SQUAD"
echo "   curl http://localhost:$CONFLUENCE_PORT/rest/api/3/spaces/SQUAD"
echo ""
echo "⏹️  Para parar: pressione Ctrl+C"
echo ""

# Aguardar sinais para parar
trap "kill $JIRA_PID $CONFLUENCE_PID; echo ''; echo '🛑 Servidores parados'; exit 0" SIGINT SIGTERM

# Manter o script rodando
wait
