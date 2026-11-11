/**
 * Eletro Kurumin - Servidor HTTP Local (Node.js)
 * Sistema de Gestão e Controlo de Estoque de Componentes Eletrónicos
 * 
 * Utiliza apenas módulos nativos do Node.js (sem necessidade de npm install).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// MIME types para entrega correta de arquivos ao navegador
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// =============================================================================
// PERSISTÊNCIA DOS DADOS EM ARQUIVO LOCAL (data.json)
// =============================================================================
function getInitialData() {
  return {
    components: [
      {
        id: "comp-1",
        sku: "RES-10K-0805",
        name: "Resistor SMD 10kΩ 1/8W 5%",
        category: "Resistores",
        package: "SMD 0805",
        location: "Gaveteiro R1 - Gaveta 04",
        quantity: 450,
        minQuantity: 100,
        price: 0.08,
        supplier: "Mouser Electronics",
        notes: "Tolerância: 5%, Tensão máx: 150V. Padrão de uso geral em pull-ups."
      },
      {
        id: "comp-2",
        sku: "RES-220R-PTH",
        name: "Resistor PTH 220Ω 1/4W Filme de Carbono",
        category: "Resistores",
        package: "PTH Axial",
        location: "Gaveteiro R1 - Gaveta 01",
        quantity: 25,
        minQuantity: 50,
        price: 0.12,
        supplier: "Farnell",
        notes: "Ideal para limitação de corrente em LEDs de bancada."
      },
      {
        id: "comp-3",
        sku: "CAP-100U-25V",
        name: "Capacitor Eletrolítico 100µF 25V Radial 105°C",
        category: "Capacitores",
        package: "Radial 6.3x11mm",
        location: "Gaveteiro C2 - Gaveta 08",
        quantity: 80,
        minQuantity: 30,
        price: 0.45,
        supplier: "Nichicon",
        notes: "Filtragem de fontes chaveadas e lineares."
      },
      {
        id: "comp-4",
        sku: "CAP-100N-0805",
        name: "Capacitor Cerâmico Multicamada 100nF (0.1µF) 50V X7R",
        category: "Capacitores",
        package: "SMD 0805",
        location: "Gaveteiro C1 - Carretel #02",
        quantity: 620,
        minQuantity: 150,
        price: 0.09,
        supplier: "Murata",
        notes: "Decoplamento de ruído em linhas VCC de microcontroladores."
      },
      {
        id: "comp-5",
        sku: "MCU-ESP32-WR32",
        name: "Módulo Microcontrolador ESP32-WROOM-32D Dual-Core Wi-Fi/BLE",
        category: "Microcontroladores",
        package: "SMD Module 38-Pin",
        location: "Armário A2 - Caixa Antiestática 03",
        quantity: 8,
        minQuantity: 15,
        price: 28.50,
        supplier: "Espressif Systems",
        notes: "Flash 4MB, antena PCB integrada. Usado nos projetos IoT Kurumin."
      },
      {
        id: "comp-6",
        sku: "DEV-NANO-CH340",
        name: "Placa Prototipagem Nano V3.0 ATmega328P 16MHz USB Tipo-C",
        category: "Microcontroladores",
        package: "DIP-30 Module",
        location: "Armário A2 - Gaveta 01",
        quantity: 14,
        minQuantity: 10,
        price: 22.00,
        supplier: "RoboCore",
        notes: "Compatível com Arduino IDE, bootloader pré-gravado."
      },
      {
        id: "comp-7",
        sku: "DIO-1N4007-DO41",
        name: "Diodo Retificador 1N4007 1000V 1A",
        category: "Semicondutores",
        package: "DO-41",
        location: "Gaveteiro S1 - Gaveta 02",
        quantity: 140,
        minQuantity: 40,
        price: 0.25,
        supplier: "Vishay",
        notes: "Retificação de onda completa e proteção contra inversão de polaridade."
      },
      {
        id: "comp-8",
        sku: "TRA-2N2222-TO92",
        name: "Transistor NPN Bipolar 2N2222A 40V 800mA 300MHz",
        category: "Semicondutores",
        package: "TO-92",
        location: "Gaveteiro S1 - Gaveta 05",
        quantity: 95,
        minQuantity: 30,
        price: 0.38,
        supplier: "ON Semiconductor",
        notes: "Chaveamento rápido e acionamento de relés e cargas indutivas."
      },
      {
        id: "comp-9",
        sku: "IC-NE555P-DIP8",
        name: "Temporizador Linear e Oscilador de Precisão NE555P",
        category: "Circuitos Integrados",
        package: "DIP-8",
        location: "Gaveteiro IC1 - Gaveta 01",
        quantity: 5,
        minQuantity: 20,
        price: 1.80,
        supplier: "Texas Instruments",
        notes: "Gerador de pulso monoestável/astável de até 500kHz."
      },
      {
        id: "comp-10",
        sku: "IC-LM358P-DIP8",
        name: "Amplificador Operacional Duplo LM358P Baixa Potência",
        category: "Circuitos Integrados",
        package: "DIP-8",
        location: "Gaveteiro IC1 - Gaveta 03",
        quantity: 42,
        minQuantity: 15,
        price: 2.10,
        supplier: "Texas Instruments",
        notes: "Alimentação simples 3V a 32V, baixa distorção harmônica."
      },
      {
        id: "comp-11",
        sku: "SEN-DHT22-MOD",
        name: "Sensor Digital de Temperatura e Umidade DHT22 / AM2302",
        category: "Sensores & Módulos",
        package: "Módulo 4-Pin com Resistor",
        location: "Armário B1 - Gaveta 04",
        quantity: 0,
        minQuantity: 8,
        price: 19.90,
        supplier: "Aosong",
        notes: "Faixa temp: -40 a +80°C (±0.5°C), Umidade: 0-100% RH. ESGOTADO!"
      },
      {
        id: "comp-12",
        sku: "DSP-OLED-096",
        name: "Display Gráfico OLED 0.96\" 128x64 I2C Azul/Amarelo SSD1306",
        category: "Sensores & Módulos",
        package: "Módulo 4 Pinos I2C",
        location: "Armário B1 - Gaveta 02",
        quantity: 12,
        minQuantity: 8,
        price: 18.50,
        supplier: "Solomon Systech",
        notes: "Tensão de operação 3.3V-5V. Endereço padrão I2C: 0x3C."
      },
      {
        id: "comp-13",
        sku: "REL-MOD-5V1C",
        name: "Módulo Relé 5V DC 10A 1 Canal com Isolamento Optoacoplado",
        category: "Eletromecânicos",
        package: "PCB Module",
        location: "Armário B2 - Caixa 01",
        quantity: 18,
        minQuantity: 10,
        price: 7.50,
        supplier: "Songle",
        notes: "Capacidade de comutação 250VAC/10A ou 30VDC/10A."
      },
      {
        id: "comp-14",
        sku: "CON-BARRA-40F",
        name: "Barra de Pinos Fêmea 40 Vias Passo 2.54mm Simples 1x40",
        category: "Conectores",
        package: "Strip 2.54mm",
        location: "Gaveteiro CON1 - Gaveta 02",
        quantity: 75,
        minQuantity: 25,
        price: 1.60,
        supplier: "Wurth Elektronik",
        notes: "Conexão de shields e expansão de barramentos em PCBs."
      }
    ],
    movements: [
      {
        id: "mov-1",
        componentId: "comp-5",
        componentSku: "MCU-ESP32-WR32",
        componentName: "ESP32-WROOM-32D Dual-Core",
        type: "OUT",
        quantity: 5,
        date: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
        responsible: "Eng. Lucas Silva",
        reason: "Desenvolvimento do Protótipo Gateway Kurumin v2"
      },
      {
        id: "mov-2",
        componentId: "comp-1",
        componentSku: "RES-10K-0805",
        componentName: "Resistor SMD 10kΩ 1/8W 5%",
        type: "IN",
        quantity: 500,
        date: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
        responsible: "Almoxarife Kurumin",
        reason: "Recebimento NF-e #44890 - Reposição de insumos"
      },
      {
        id: "mov-3",
        componentId: "comp-11",
        componentSku: "SEN-DHT22-MOD",
        componentName: "Sensor Digital DHT22 / AM2302",
        type: "OUT",
        quantity: 6,
        date: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
        responsible: "Téc. Mariana Ramos",
        reason: "Instalação em sensores de campo para estufa climatizada"
      },
      {
        id: "mov-4",
        componentId: "comp-9",
        componentSku: "IC-NE555P-DIP8",
        componentName: "Temporizador NE555P DIP-8",
        type: "OUT",
        quantity: 15,
        date: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
        responsible: "Eng. Lucas Silva",
        reason: "Aulas práticas de eletrônica analógica no laboratório"
      }
    ]
  };
}

function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Erro ao ler data.json:", err.message);
  }
  const initial = getInitialData();
  writeData(initial);
  return initial;
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Erro ao salvar data.json:", err.message);
    return false;
  }
}

// =============================================================================
// SERVIDOR HTTP & ROTAS
// =============================================================================
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // CORS headers para flexibilidade
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- ROTAS DA API REST (/api/...) ---
  if (pathname === '/api/data' && req.method === 'GET') {
    const data = readData();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
    return;
  }

  if (pathname === '/api/data' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (payload.components && payload.movements) {
          writeData(payload);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, message: "Dados atualizados com sucesso!" }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: "Estrutura de dados inválida." }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: "JSON inválido." }));
      }
    });
    return;
  }

  if (pathname === '/api/orders' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const order = JSON.parse(body);
        const data = readData();
        
        // Atualiza estoque dos itens comprados
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(cartItem => {
            const comp = data.components.find(c => c.id === cartItem.productId);
            if (comp) {
              comp.quantity = Math.max(0, comp.quantity - cartItem.quantity);
              data.movements.unshift({
                id: "mov-" + Date.now(),
                componentId: comp.id,
                componentSku: comp.sku,
                componentName: comp.name,
                type: "OUT",
                quantity: cartItem.quantity,
                date: new Date().toISOString(),
                responsible: "Venda Online (Cliente: " + (order.customer ? order.customer.name : "Anônimo") + ")",
                reason: `Pedido #${order.orderNumber}`
              });
            }
          });
        }

        // Salva pedido
        if (!data.orders) data.orders = [];
        data.orders.unshift(order);
        writeData(data);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, message: "Pedido recebido com sucesso!", orderNumber: order.orderNumber }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: "JSON inválido." }));
      }
    });
    return;
  }

  if (pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: "online", system: "Eletro Kurumin Estoque", version: "1.0.0" }));
    return;
  }

  // --- SERVIÇO DE ARQUIVOS ESTÁTICOS ---
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <div style="font-family: sans-serif; text-align: center; padding: 40px;">
          <h2>404 - Arquivo não encontrado</h2>
          <p>O arquivo requisitado <code>${pathname}</code> não existe na Eletro Kurumin.</p>
          <a href="/">Voltar à Página Inicial</a>
        </div>
      `);
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// Tratamento de porta em uso e início do servidor
server.listen(PORT, () => {
  console.log("\n============================================================");
  console.log("⚡ ELETRO KURUMIN - LOJA ONLINE DE COMPONENTES ELETRÓNICOS");
  console.log("   Status: SERVIDO COM SUCESSO!");
  console.log("------------------------------------------------------------");
  console.log(`🌐 Acesse a loja no seu navegador: http://localhost:${PORT}`);
  console.log(`📁 Diretório base:                 ${__dirname}`);
  console.log("🛑 Para encerrar o servidor, pressione: Ctrl + C");
  console.log("============================================================\n");
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n⚠️  Aviso: A porta ${PORT} já está sendo utilizada por outro processo.`);
    console.log(`Tentando iniciar na porta alternativa ${Number(PORT) + 1}...`);
    server.listen(Number(PORT) + 1);
  } else {
    console.error("Erro no servidor:", err);
  }
});

module.exports = server;
