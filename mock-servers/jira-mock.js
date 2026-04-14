#!/usr/bin/env node

/**
 * Mock Jira API Server
 * Simula endpoints Jira sem precisar de token
 * Perfeito para apresentações e testes
 */

const http = require('http');
const url = require('url');

// Dados simulados
const mockData = {
  projects: {
    SQUAD: {
      key: "SQUAD",
      id: "10000",
      name: "Squad Framework Demo",
      projectTypeKey: "software",
      lead: {
        displayName: "Squad Team",
        emailAddress: "squad@demo.local"
      }
    }
  },
  issues: {
    "SQUAD-1": {
      key: "SQUAD-1",
      id: "10001",
      fields: {
        summary: "Setup Python environment",
        description: "Configure Python 3.11+ with virtual environment",
        status: { name: "To Do", id: "10000" },
        priority: { name: "High" },
        assignee: { displayName: "Developer Squad", emailAddress: "dev@demo.local" },
        created: "2026-04-13T09:00:00.000+0000",
        updated: "2026-04-13T09:00:00.000+0000"
      }
    },
    "SQUAD-2": {
      key: "SQUAD-2",
      id: "10002",
      fields: {
        summary: "Configure GCP credentials",
        description: "Setup service account and authentication",
        status: { name: "To Do", id: "10000" },
        priority: { name: "High" },
        assignee: { displayName: "DevOps Squad", emailAddress: "devops@demo.local" },
        created: "2026-04-13T09:15:00.000+0000",
        updated: "2026-04-13T09:15:00.000+0000"
      }
    },
    "SQUAD-3": {
      key: "SQUAD-3",
      id: "10003",
      fields: {
        summary: "Test MCP connections",
        description: "Validate GitHub, Jira, and Confluence MCPs",
        status: { name: "To Do", id: "10000" },
        priority: { name: "Medium" },
        assignee: { displayName: "QA Squad", emailAddress: "qa@demo.local" },
        created: "2026-04-13T09:30:00.000+0000",
        updated: "2026-04-13T09:30:00.000+0000"
      }
    }
  },
  sprints: {
    1: {
      id: "1",
      name: "Sprint 1 - Foundation",
      state: "active",
      startDate: "2026-04-07T00:00:00.000+0000",
      endDate: "2026-04-21T23:59:59.000+0000"
    }
  }
};

// Rotas disponíveis
const routes = {
  "/rest/api/3/projects/SQUAD": (req, res) => {
    returnJson(res, 200, mockData.projects.SQUAD);
  },
  
  "/rest/api/3/projects/SQUAD/issues": (req, res) => {
    returnJson(res, 200, {
      issues: Object.values(mockData.issues),
      total: Object.keys(mockData.issues).length
    });
  },
  
  "/rest/api/3/issues/SQUAD-1": (req, res) => {
    returnJson(res, 200, mockData.issues["SQUAD-1"]);
  },
  
  "/rest/api/3/issues/SQUAD-2": (req, res) => {
    returnJson(res, 200, mockData.issues["SQUAD-2"]);
  },
  
  "/rest/api/3/issues/SQUAD-3": (req, res) => {
    returnJson(res, 200, mockData.issues["SQUAD-3"]);
  },
  
  "/rest/api/3/boards": (req, res) => {
    returnJson(res, 200, {
      values: [{
        id: "1",
        name: "Squad Framework Board",
        type: "scrum",
        projectKey: "SQUAD"
      }]
    });
  },
  
  "/rest/api/3/sprints": (req, res) => {
    returnJson(res, 200, {
      values: Object.values(mockData.sprints)
    });
  },

  "/rest/api/3/user/myself": (req, res) => {
    returnJson(res, 200, {
      accountId: "XXXXXXXXXXXXXXXX",
      emailAddress: "demo@squad.local",
      displayName: "Squad Framework Demo",
      active: true
    });
  }
};

// Helper para retornar JSON
function returnJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

// Helper para 404
function notFound(res) {
  returnJson(res, 404, {
    errorMessages: ["Endpoint not found"],
    statusCode: 404
  });
}

// Criar servidor
const server = http.createServer((req, res) => {
  const urlPath = url.parse(req.url).pathname;
  
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Log request
  console.log(`📌 [${new Date().toISOString()}] ${req.method} ${urlPath}`);
  
  // Encontrar rota
  if (routes[urlPath]) {
    routes[urlPath](req, res);
  } else {
    notFound(res);
  }
});

const PORT = 8001;
server.listen(PORT, () => {
  console.log('');
  console.log('🎉 Mock Jira Server rodando!');
  console.log(`📍 http://localhost:${PORT}`);
  console.log('');
  console.log('📋 Endpoints disponíveis:');
  Object.keys(routes).forEach(route => {
    console.log(`   GET ${route}`);
  });
  console.log('');
  console.log('💡 Teste com: curl http://localhost:8001/rest/api/3/projects/SQUAD');
  console.log('');
  console.log('Pressione Ctrl+C para parar');
  console.log('');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Porta ${PORT} já está em uso!`);
    console.error('   Use outra porta: PORT=8003 node jira-mock.js');
    process.exit(1);
  }
});
