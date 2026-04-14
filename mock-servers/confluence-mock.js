#!/usr/bin/env node

/**
 * Mock Confluence API Server
 * Simula endpoints Confluence sem precisar de token
 * Perfeito para apresentações e testes
 */

const http = require('http');
const url = require('url');

// Dados simulados
const mockData = {
  spaces: {
    SQUAD: {
      id: "1",
      key: "SQUAD",
      name: "Squad Framework",
      type: "open",
      homepage: {
        id: "100",
        type: "page",
        title: "Overview"
      }
    }
  },
  pages: {
    "100": {
      id: "100",
      type: "page",
      title: "Overview",
      space: { key: "SQUAD" },
      body: {
        storage: {
          value: "<p>Squad Framework Training Environment</p><ul><li>CONCEITOS_BASICOS</li><li>SQUAD_FRAMEWORK</li><li>TRAINING_AGENDA</li><li>SETUP_GUIDE</li><li>TROUBLESHOOTING</li></ul>"
        }
      },
      version: { number: 1 },
      links: {
        self: "http://localhost:8002/rest/api/3/pages/100",
        webui: "/wiki/spaces/SQUAD/pages/100/Overview"
      }
    },
    "101": {
      id: "101",
      type: "page",
      title: "CONCEITOS_BASICOS",
      space: { key: "SQUAD" },
      body: {
        storage: {
          value: "<h1>Conceitos Básicos</h1><p>Os 4 Pilares: Instructions, Prompts, Agents, Workflows</p>"
        }
      },
      version: { number: 1 },
      links: {
        self: "http://localhost:8002/rest/api/3/pages/101",
        webui: "/wiki/spaces/SQUAD/pages/101/CONCEITOS_BASICOS"
      }
    },
    "102": {
      id: "102",
      type: "page",
      title: "SQUAD_FRAMEWORK",
      space: { key: "SQUAD" },
      body: {
        storage: {
          value: "<h1>Squad Framework</h1><p>Arquitetura completa com 5 agentes, 5 instruções, 6 prompts, 5 workflows</p>"
        }
      },
      version: { number: 1 },
      links: {
        self: "http://localhost:8002/rest/api/3/pages/102",
        webui: "/wiki/spaces/SQUAD/pages/102/SQUAD_FRAMEWORK"
      }
    },
    "103": {
      id: "103",
      type: "page",
      title: "TRAINING_AGENDA",
      space: { key: "SQUAD" },
      body: {
        storage: {
          value: "<h1>Agenda de Treinamento</h1><ul><li>Dia 1: Fundações</li><li>Dia 2: Rules &amp; Standards</li><li>Dia 3: Workflows &amp; Agents</li><li>Dia 4: Hands-on Project</li></ul>"
        }
      },
      version: { number: 1 },
      links: {
        self: "http://localhost:8002/rest/api/3/pages/103",
        webui: "/wiki/spaces/SQUAD/pages/103/TRAINING_AGENDA"
      }
    },
    "104": {
      id: "104",
      type: "page",
      title: "SETUP_GUIDE",
      space: { key: "SQUAD" },
      body: {
        storage: {
          value: "<h1>Guia de Setup</h1><p>Passo-a-passo para configurar o ambiente</p>"
        }
      },
      version: { number: 1 },
      links: {
        self: "http://localhost:8002/rest/api/3/pages/104",
        webui: "/wiki/spaces/SQUAD/pages/104/SETUP_GUIDE"
      }
    }
  }
};

// Rotas disponíveis
const routes = {
  "/rest/api/3/spaces/SQUAD": (req, res) => {
    returnJson(res, 200, mockData.spaces.SQUAD);
  },
  
  "/rest/api/3/spaces/SQUAD/pages": (req, res) => {
    returnJson(res, 200, {
      results: [
        mockData.pages["100"],
        mockData.pages["101"],
        mockData.pages["102"],
        mockData.pages["103"],
        mockData.pages["104"]
      ],
      size: 5,
      start: 0,
      limit: 25,
      isLastPage: true
    });
  },
  
  "/rest/api/3/pages/100": (req, res) => {
    returnJson(res, 200, mockData.pages["100"]);
  },
  
  "/rest/api/3/pages/101": (req, res) => {
    returnJson(res, 200, mockData.pages["101"]);
  },
  
  "/rest/api/3/pages/102": (req, res) => {
    returnJson(res, 200, mockData.pages["102"]);
  },
  
  "/rest/api/3/pages/103": (req, res) => {
    returnJson(res, 200, mockData.pages["103"]);
  },
  
  "/rest/api/3/pages/104": (req, res) => {
    returnJson(res, 200, mockData.pages["104"]);
  },

  "/rest/api/3/user/current": (req, res) => {
    returnJson(res, 200, {
      accountId: "XXXXXXXXXXXXXXXX",
      email: "demo@squad.local",
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
    statusCode: 404,
    data: {
      authorized: false,
      valid: false,
      errors: [{ message: "Endpoint not found" }]
    }
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

const PORT = 8002;
server.listen(PORT, () => {
  console.log('');
  console.log('🎉 Mock Confluence Server rodando!');
  console.log(`📍 http://localhost:${PORT}`);
  console.log('');
  console.log('📋 Endpoints disponíveis:');
  Object.keys(routes).forEach(route => {
    console.log(`   GET ${route}`);
  });
  console.log('');
  console.log('💡 Teste com: curl http://localhost:8002/rest/api/3/spaces/SQUAD');
  console.log('');
  console.log('Pressione Ctrl+C para parar');
  console.log('');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Porta ${PORT} já está em uso!`);
    console.error('   Use outra porta: PORT=8004 node confluence-mock.js');
    process.exit(1);
  }
});
