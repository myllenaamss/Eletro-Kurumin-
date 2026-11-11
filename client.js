/**
 * Eletro Kurumin - Loja Online de Componentes Eletrónicos
 * Lógica do Cliente Frontend (Catálogo de Compras, Carrinho & Checkout)
 */

// =============================================================================
// 1. CATÁLOGO INICIAL DE PRODUTOS PARA COMPRA
// =============================================================================
const DEFAULT_PRODUCTS = [
  {
    id: "comp-5",
    sku: "MCU-ESP32-WR32",
    name: "Módulo ESP32-WROOM-32D Dual-Core Wi-Fi & Bluetooth",
    category: "Microcontroladores",
    package: "SMD Module 38-Pin",
    price: 28.50,
    stock: 8,
    supplier: "Espressif Systems",
    description: "Microcontrolador de altíssimo desempenho com Wi-Fi 802.11 b/g/n e Bluetooth v4.2 BR/EDR e BLE integrados. 4MB de memória Flash SPI e clock ajustável até 240MHz. Perfeito para projetos IoT, automação residencial e telemetria."
  },
  {
    id: "comp-6",
    sku: "DEV-NANO-CH340",
    name: "Placa de Prototipagem Nano V3.0 ATmega328P 16MHz USB-C",
    category: "Microcontroladores",
    package: "DIP-30 Module",
    price: 24.90,
    stock: 14,
    supplier: "RoboCore / Arduino Compatível",
    description: "Placa compacta ideal para montagem direta em protoboards. Possui microcontrolador ATmega328P rodando a 16MHz, conector USB Tipo-C moderno e conversor serial CH340G. Compatível 100% com Arduino IDE."
  },
  {
    id: "comp-11",
    sku: "SEN-DHT22-MOD",
    name: "Sensor Digital de Temperatura e Umidade de Precisão DHT22 (AM2302)",
    category: "Sensores & Módulos",
    package: "Módulo 4-Pin",
    price: 19.90,
    stock: 0,
    supplier: "Aosong",
    description: "Sensor digital capacitivo de alta precisão. Mede temperatura de -40°C a +80°C (precisão de ±0.5°C) e umidade relativa de 0 a 100% RH (precisão de ±2%). Saída de sinal digital em pino único calibrado de fábrica."
  },
  {
    id: "comp-12",
    sku: "DSP-OLED-096",
    name: "Display Gráfico OLED 0.96\" 128x64 I2C Branco/Azul SSD1306",
    category: "Sensores & Módulos",
    package: "Módulo 4 Pinos I2C",
    price: 18.50,
    stock: 12,
    supplier: "Solomon Systech",
    description: "Display gráfico com excelente contraste e baixo consumo de energia. Resolução de 128x64 pixels com interface I2C de 2 fios (SDA/SCL). Tensão de alimentação versátil entre 3.3V e 5V."
  },
  {
    id: "comp-9",
    sku: "IC-NE555P-DIP8",
    name: "Circuito Integrado Temporizador Linear NE555P de Precisão",
    category: "Circuitos Integrados",
    package: "DIP-8",
    price: 1.80,
    stock: 15,
    supplier: "Texas Instruments",
    description: "O mais clássico e confiável CI temporizador. Opera em modo monoestável ou astável com temporizações de microssegundos a horas. Frequência de operação máxima de 500kHz e compatibilidade TTL."
  },
  {
    id: "comp-10",
    sku: "IC-LM358P-DIP8",
    name: "Amplificador Operacional Duplo LM358P Baixo Consumo",
    category: "Circuitos Integrados",
    package: "DIP-8",
    price: 2.10,
    stock: 42,
    supplier: "Texas Instruments",
    description: "Contém dois amplificadores operacionais independentes de alto ganho com compensação interna de frequência. Projetado para operação com fonte simples de 3V a 32V ou fontes simétricas."
  },
  {
    id: "comp-13",
    sku: "REL-MOD-5V1C",
    name: "Módulo Relé 5V DC 1 Canal 10A com Acionamento Optoacoplado",
    category: "Eletromecânicos",
    package: "Módulo PCB",
    price: 7.50,
    stock: 18,
    supplier: "Songle",
    description: "Permite controlar cargas de alta potência (lâmpadas, motores, eletrodomésticos) através de sinais lógicos de 5V ou 3.3V com total isolamento elétrico através de optoacoplador. Suporta até 250VAC/10A."
  },
  {
    id: "comp-7",
    sku: "DIO-1N4007-DO41",
    name: "Diodo Retificador 1N4007 1000V 1A (Embalagem com 10 un)",
    category: "Semicondutores",
    package: "DO-41 Axial",
    price: 2.50,
    stock: 140,
    supplier: "Vishay",
    description: "Diodo de silício para uso geral em fontes retificadoras, supressão de picos de tensão reversa em bobinas/relés (flyback) e proteção contra inversão acidental de polaridade. Tensão reversa de pico: 1000V."
  },
  {
    id: "comp-8",
    sku: "TRA-2N2222-TO92",
    name: "Transistor NPN Bipolar 2N2222A 40V 800mA (Pacote 5 un)",
    category: "Semicondutores",
    package: "TO-92",
    price: 2.20,
    stock: 95,
    supplier: "ON Semiconductor",
    description: "Transistor NPN de média potência e chaveamento ultrarrápido. Ideal para amplificação de pequenos sinais de áudio, acionamento de transdutores e controle de pequenas cargas indutivas."
  },
  {
    id: "comp-1",
    sku: "RES-10K-0805",
    name: "Resistor SMD 10kΩ 1/8W 5% 0805 (Fita com 50 un)",
    category: "Resistores",
    package: "SMD 0805",
    price: 3.50,
    stock: 450,
    supplier: "Yageo",
    description: "Resistores de precisão em encapsulamento SMD 0805 compacto. Valor nominal de 10k Ohms, excelente para circuitos de pull-up/pull-down em barramentos digitais e divisores de tensão."
  },
  {
    id: "comp-2",
    sku: "RES-220R-PTH",
    name: "Resistor PTH 220Ω 1/4W Filme de Carbono 5% (Kit 20 un)",
    category: "Resistores",
    package: "PTH Axial",
    price: 2.00,
    stock: 25,
    supplier: "Farnell",
    description: "Resistores axiais tradicionais com terminais para inserção direta em protoboards ou placas de circuito impresso com furo passante. O resistor padrão para limitação de corrente em LEDs de 5V."
  },
  {
    id: "comp-3",
    sku: "CAP-100U-25V",
    name: "Capacitor Eletrolítico 100µF 25V 105°C Radial (Kit 5 un)",
    category: "Capacitores",
    package: "Radial 6.3x11mm",
    price: 2.80,
    stock: 80,
    supplier: "Nichicon",
    description: "Capacitores eletrolíticos de alta temperatura de operação (105°C) e baixa impedância. Indispensáveis para desacoplamento e filtragem de ripple em fontes de alimentação lineares e chaveadas."
  },
  {
    id: "comp-4",
    sku: "CAP-100N-0805",
    name: "Capacitor Cerâmico Multicamada 100nF (0.1µF) 50V X7R (Fita 50 un)",
    category: "Capacitores",
    package: "SMD 0805",
    price: 4.20,
    stock: 620,
    supplier: "Murata",
    description: "Capacitores de bypass essenciais para colocar junto aos pinos de alimentação VCC/GND de qualquer microcontrolador ou circuito integrado para supressão de ruídos de alta frequência."
  },
  {
    id: "comp-14",
    sku: "CON-BARRA-40F",
    name: "Barra de Pinos Fêmea 40 Vias Passo 2.54mm 1x40 (Pacote 2 un)",
    category: "Conectores",
    package: "Strip 2.54mm",
    price: 3.20,
    stock: 75,
    supplier: "Wurth Elektronik",
    description: "Conector fêmea com passo padrão de 2.54mm. Facilmente seccionável para a quantidade de pinos desejada. Ideal para encaixe de módulos e shields sem solda definitiva."
  }
];

// =============================================================================
// 2. ESTADO DA LOJA
// =============================================================================
const CART_STORAGE_KEY = "eletro_kurumin_customer_cart_v1";

let products = [];
let cart = [];
let activeCategory = "";
let searchTerm = "";
let availabilityFilter = "in_stock";
let sortOrder = "featured";
let appliedCoupon = null; // { code: 'KURUMIN5', discountPct: 0.05 }

// Produto selecionado no modal de detalhes
let activeModalProduct = null;

// =============================================================================
// 3. INICIALIZAÇÃO
// =============================================================================
async function initStore() {
  loadCartFromStorage();
  await loadProducts();
  setupEventListeners();
  renderProducts();
  updateCartUI();
  if (window.lucide) lucide.createIcons();
}

async function loadProducts() {
  // Se o servidor HTTP estiver respondendo, tenta puxar produtos
  if (window.location.protocol.startsWith("http")) {
    try {
      const res = await fetch("/api/data");
      if (res.ok) {
        const data = await res.json();
        if (data.components && data.components.length > 0) {
          products = data.components.map(c => ({
            id: c.id,
            sku: c.sku,
            name: c.name,
            category: c.category,
            package: c.package || "Padrão",
            price: Number(c.price) || 1.00,
            stock: Number(c.quantity) || 0,
            supplier: c.supplier || "Eletro Kurumin",
            description: c.notes || "Componente eletrónico de alta confiabilidade para engenharia e prototipagem."
          }));
          return;
        }
      }
    } catch (e) {
      console.warn("API de produtos offline, utilizando catálogo padrão embutido.");
    }
  }

  // Fallback padrão
  products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    cart = saved ? JSON.parse(saved) : [];
  } catch (e) {
    cart = [];
  }
}

function saveCartToStorage() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartUI();
}

// =============================================================================
// 4. RENDERIZAÇÃO DO CATÁLOGO DE PRODUTOS
// =============================================================================
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const countEl = document.getElementById("resultsCount");
  const titleEl = document.getElementById("catalogTitle");

  if (!grid) return;

  // Atualiza título da categoria ativa
  if (titleEl) {
    titleEl.textContent = activeCategory ? activeCategory : "Todos os Componentes";
  }

  // Filtra produtos
  let filtered = products.filter(p => {
    // Categoria
    if (activeCategory && p.category !== activeCategory) return false;

    // Disponibilidade
    if (availabilityFilter === "in_stock" && p.stock <= 0) return false;

    // Busca textual
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchPkg = p.package.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchCat && !matchPkg) return false;
    }

    return true;
  });

  // Ordenação
  filtered.sort((a, b) => {
    if (sortOrder === "price_asc") return a.price - b.price;
    if (sortOrder === "price_desc") return b.price - a.price;
    if (sortOrder === "name_asc") return a.name.localeCompare(b.name);
    return 0; // featured mantém a ordem natural
  });

  // Contador de resultados
  if (countEl) {
    const total = filtered.length;
    countEl.textContent = `${total} ${total === 1 ? 'componente disponível' : 'componentes disponíveis'}`;
  }

  // Render do HTML
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 12px; border: 1px solid var(--border-color);">
        <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
        <h3 style="font-size: 1.2rem; color: var(--text-main); margin-bottom: 6px;">Nenhum componente encontrado</h3>
        <p class="text-muted text-sm" style="margin-bottom: 16px;">Tente pesquisar por outro termo ou limpe os filtros selecionados.</p>
        <button class="btn btn-outline btn-sm" onclick="resetFilters()">Limpar Filtros de Busca</button>
      </div>
    `;
  } else {
    grid.innerHTML = filtered.map(p => {
      const isAvailable = p.stock > 0;
      const stockStatusHtml = isAvailable
        ? `<div class="product-stock-status in-stock"><span class="stock-indicator-dot"></span> Pronta Entrega (${p.stock} un)</div>`
        : `<div class="product-stock-status out-of-stock"><span class="stock-indicator-dot"></span> Temporariamente Esgotado</div>`;

      return `
        <article class="product-card">
          <div class="product-card-top">
            <div class="product-badges-group">
              <span class="tag-category">${escapeHtml(p.category)}</span>
              <span class="tag-package">${escapeHtml(p.package)}</span>
            </div>
            <button class="btn btn-sm btn-ghost" style="padding: 2px 6px;" title="Ver Ficha Técnica" onclick="openProductDetail('${p.id}')">
              <i data-lucide="info" style="width: 16px; height: 16px;"></i>
            </button>
          </div>

          <div class="product-card-body">
            <span class="product-sku font-mono">${escapeHtml(p.sku)}</span>
            <h3 class="product-name" onclick="openProductDetail('${p.id}')" title="${escapeHtml(p.name)}">
              ${escapeHtml(p.name)}
            </h3>
            <p class="product-notes-snippet">
              ${escapeHtml(p.description)}
            </p>
            ${stockStatusHtml}
          </div>

          <div class="product-card-bottom" style="padding: 14px 20px;">
            <div class="product-price-block">
              <span class="product-price-label">Preço</span>
              <span class="product-price font-mono">${formatBRL(p.price)}</span>
            </div>
            <button 
              class="btn-add-cart" 
              ${!isAvailable ? 'disabled' : ''} 
              onclick="addToCart('${p.id}')"
              title="${isAvailable ? 'Adicionar ao carrinho' : 'Item esgotado no momento'}"
            >
              <i data-lucide="plus"></i>
              <span>${isAvailable ? 'Comprar' : 'Esgotado'}</span>
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  if (window.lucide) lucide.createIcons();
}

// =============================================================================
// 5. OPERAÇÕES DO CARRINHO DE COMPRAS
// =============================================================================
function addToCart(productId, quantity = 1) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  if (prod.stock <= 0) {
    showToast(`O item "${prod.name}" está esgotado no momento.`, "warning");
    return;
  }

  const existing = cart.find(item => item.productId === productId);
  const currentQtyInCart = existing ? existing.quantity : 0;
  const newQty = currentQtyInCart + quantity;

  if (newQty > prod.stock) {
    showToast(`Estoque máximo atingido! Temos apenas ${prod.stock} un. disponíveis deste item.`, "warning");
    return;
  }

  if (existing) {
    existing.quantity = newQty;
  } else {
    cart.push({
      productId: prod.id,
      sku: prod.sku,
      name: prod.name,
      price: prod.price,
      package: prod.package,
      quantity: quantity
    });
  }

  saveCartToStorage();
  showToast(`"${prod.name}" adicionado ao carrinho!`, "success");
}

function updateCartItemQty(productId, delta) {
  const index = cart.findIndex(item => item.productId === productId);
  if (index === -1) return;

  const prod = products.find(p => p.id === productId);
  const current = cart[index];
  const targetQty = current.quantity + delta;

  if (targetQty <= 0) {
    cart.splice(index, 1);
    showToast("Item removido do carrinho.", "info");
  } else {
    if (prod && targetQty > prod.stock) {
      showToast(`Limite de estoque: apenas ${prod.stock} un. disponíveis.`, "warning");
      return;
    }
    current.quantity = targetQty;
  }

  saveCartToStorage();
  renderCartDrawer();
}

function removeCartItem(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveCartToStorage();
  renderCartDrawer();
  showToast("Item removido do carrinho.", "info");
}

function updateCartUI() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  // Atualiza crachás no cabeçalho
  const badgeCount = document.getElementById("cartBadgeCount");
  const badgeTotal = document.getElementById("cartBadgeTotal");
  if (badgeCount) badgeCount.textContent = totalCount;
  if (badgeTotal) badgeTotal.textContent = formatBRL(subtotal);

  renderCartDrawer();
}

function renderCartDrawer() {
  const body = document.getElementById("cartDrawerBody");
  const footer = document.getElementById("cartDrawerFooter");
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty-state">
        <i data-lucide="shopping-bag"></i>
        <h4>Seu carrinho está vazio</h4>
        <p>Explore nosso catálogo e adicione os componentes que precisa para os seus projetos.</p>
        <button class="btn btn-outline btn-sm" onclick="closeCart()">Voltar às Compras</button>
      </div>
    `;
    if (footer) footer.style.display = "none";
    if (window.lucide) lucide.createIcons();
    return;
  }

  if (footer) footer.style.display = "block";

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">
        <i data-lucide="cpu"></i>
      </div>
      <div class="cart-item-info">
        <span class="cart-item-sku font-mono">${escapeHtml(item.sku)}</span>
        <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
        <span class="cart-item-price-unit font-mono">${formatBRL(item.price)} un.</span>
        
        <div class="cart-item-controls">
          <div class="qty-pill">
            <button class="qty-btn" onclick="updateCartItemQty('${item.productId}', -1)">-</button>
            <span class="qty-val font-mono">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQty('${item.productId}', 1)">+</button>
          </div>

          <span class="cart-item-subtotal font-mono">${formatBRL(item.quantity * item.price)}</span>

          <button class="btn-remove-item" onclick="removeCartItem('${item.productId}')" title="Remover item">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  // Cálculo dos totais
  const subtotal = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  let discount = 0;

  if (appliedCoupon) {
    discount = subtotal * appliedCoupon.discountPct;
  }

  const finalTotal = Math.max(0, subtotal - discount);

  document.getElementById("cartSubtotalText").textContent = formatBRL(subtotal);

  const discountRow = document.getElementById("discountRow");
  const discountText = document.getElementById("cartDiscountText");
  if (discount > 0) {
    discountRow.style.display = "flex";
    discountText.textContent = `- ${formatBRL(discount)}`;
  } else {
    discountRow.style.display = "none";
  }

  document.getElementById("cartTotalText").textContent = formatBRL(finalTotal);

  if (window.lucide) lucide.createIcons();
}

function openCart() {
  document.getElementById("cartOverlay").classList.add("open");
  document.getElementById("cartDrawer").classList.add("open");
  renderCartDrawer();
}

function closeCart() {
  document.getElementById("cartOverlay").classList.remove("open");
  document.getElementById("cartDrawer").classList.remove("open");
}

// =============================================================================
// 6. CUPOM DE DESCONTO
// =============================================================================
function handleApplyCoupon() {
  const input = document.getElementById("couponInput");
  const feedback = document.getElementById("couponAppliedMsg");
  const code = input.value.trim().toUpperCase();

  if (!code) {
    appliedCoupon = null;
    feedback.style.display = "none";
    renderCartDrawer();
    return;
  }

  if (code === "KURUMIN5") {
    appliedCoupon = { code: "KURUMIN5", discountPct: 0.05 };
    feedback.className = "coupon-feedback success";
    feedback.textContent = "✓ Cupom KURUMIN5 aplicado: 5% de desconto concedido!";
    feedback.style.display = "block";
    renderCartDrawer();
    showToast("Cupom de 5% OFF ativado!", "success");
  } else if (code === "KURUMIN10") {
    const subtotal = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    if (subtotal >= 50) {
      appliedCoupon = { code: "KURUMIN10", discountPct: 0.10 };
      feedback.className = "coupon-feedback success";
      feedback.textContent = "✓ Cupom KURUMIN10 aplicado: 10% de desconto concedido!";
      feedback.style.display = "block";
      renderCartDrawer();
      showToast("Cupom de 10% OFF ativado!", "success");
    } else {
      feedback.className = "coupon-feedback error";
      feedback.textContent = "O cupom KURUMIN10 é válido apenas para compras acima de R$ 50,00.";
      feedback.style.display = "block";
    }
  } else {
    appliedCoupon = null;
    feedback.className = "coupon-feedback error";
    feedback.textContent = "Cupom inválido ou expirado.";
    feedback.style.display = "block";
    renderCartDrawer();
  }
}

// =============================================================================
// 7. MODAL DE DETALHES TÉCNICOS DO PRODUTO
// =============================================================================
function openProductDetail(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  activeModalProduct = prod;

  document.getElementById("modalCategoryTag").textContent = prod.category;
  document.getElementById("modalProductName").textContent = prod.name;
  document.getElementById("modalProductSku").textContent = `SKU: ${prod.sku}`;
  document.getElementById("modalProductPrice").textContent = formatBRL(prod.price);
  document.getElementById("modalProductPackage").textContent = prod.package;
  document.getElementById("modalProductSupplier").textContent = prod.supplier;
  document.getElementById("modalProductStockQty").textContent = `${prod.stock} unidades disponíveis`;
  document.getElementById("modalProductDescription").textContent = prod.description;

  const stockPill = document.getElementById("modalProductStockPill");
  const addBtn = document.getElementById("btnModalAddToCart");
  const qtyInput = document.getElementById("modalQtyInput");
  qtyInput.value = "1";

  if (prod.stock > 0) {
    stockPill.className = "status-pill normal";
    stockPill.textContent = "Pronta Entrega";
    addBtn.disabled = false;
    addBtn.innerHTML = `<i data-lucide="shopping-cart"></i> <span>Adicionar ao Carrinho</span>`;
  } else {
    stockPill.className = "status-pill out";
    stockPill.textContent = "Temporariamente Esgotado";
    addBtn.disabled = true;
    addBtn.innerHTML = `<span>Esgotado</span>`;
  }

  document.getElementById("productDetailModal").classList.add("open");
  if (window.lucide) lucide.createIcons();
}

function closeProductDetail() {
  document.getElementById("productDetailModal").classList.remove("open");
  activeModalProduct = null;
}

// =============================================================================
// 8. CHECKOUT E FINALIZAÇÃO DE COMPRA
// =============================================================================
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Adicione itens ao carrinho antes de fechar o pedido.", "warning");
    return;
  }

  closeCart();

  const subtotal = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const discount = appliedCoupon ? subtotal * appliedCoupon.discountPct : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  document.getElementById("checkoutFinalAmount").textContent = formatBRL(finalTotal);
  document.getElementById("checkoutModal").classList.add("open");
  if (window.lucide) lucide.createIcons();
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("open");
}

async function handleConfirmOrder(e) {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const email = document.getElementById("custEmail").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const cep = document.getElementById("custCep").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const city = document.getElementById("custCity").value.trim();
  const paymentMethod = document.querySelector('input[name="payMethod"]:checked').value;

  const subtotal = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const discount = appliedCoupon ? subtotal * appliedCoupon.discountPct : 0;
  const total = Math.max(0, subtotal - discount);

  const orderNumber = `EK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const orderData = {
    orderNumber,
    customer: { name, email, phone, cep, address, city },
    paymentMethod,
    items: cart,
    subtotal,
    discount,
    total,
    date: new Date().toISOString()
  };

  // Deduz estoque local e tenta sincronizar
  cart.forEach(item => {
    const p = products.find(prod => prod.id === item.productId);
    if (p) {
      p.stock = Math.max(0, p.stock - item.quantity);
    }
  });

  // Salva pedido se houver backend
  if (window.location.protocol.startsWith("http")) {
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
    } catch (e) {
      console.warn("Não foi possível enviar pedido para API backend.");
    }
  }

  // Limpa carrinho
  cart = [];
  appliedCoupon = null;
  saveCartToStorage();

  // Fecha checkout e exibe sucesso
  closeCheckoutModal();
  renderProducts();

  document.getElementById("successOrderNumber").textContent = `PEDIDO #${orderNumber}`;
  const pixBox = document.getElementById("pixPaymentBox");
  if (pixBox) {
    pixBox.style.display = paymentMethod === "PIX" ? "block" : "none";
  }

  document.getElementById("orderSuccessModal").classList.add("open");
  if (window.lucide) lucide.createIcons();
}

function closeOrderSuccessModal() {
  document.getElementById("orderSuccessModal").classList.remove("open");
}

function copyPixKey() {
  const field = document.getElementById("pixKeyField");
  if (field) {
    field.select();
    navigator.clipboard.writeText(field.value);
    showToast("Chave PIX copiada para a área de transferência!", "success");
  }
}

// =============================================================================
// 9. EVENT LISTENERS E CONTROLES
// =============================================================================
function setupEventListeners() {
  // Carrinho Drawer
  document.getElementById("btnOpenCart").addEventListener("click", openCart);
  document.getElementById("btnCloseCart").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("btnContinueShopping").addEventListener("click", closeCart);

  // Cupom
  document.getElementById("btnApplyCoupon").addEventListener("click", handleApplyCoupon);
  document.getElementById("couponInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApplyCoupon();
    }
  });

  // Checkout
  document.getElementById("btnProceedCheckout").addEventListener("click", openCheckoutModal);
  document.getElementById("btnCloseCheckoutModal").addEventListener("click", closeCheckoutModal);
  document.getElementById("btnCancelCheckout").addEventListener("click", () => {
    closeCheckoutModal();
    openCart();
  });
  document.getElementById("checkoutForm").addEventListener("submit", handleConfirmOrder);

  // Detalhes do Produto Modal
  document.getElementById("btnCloseDetailModal").addEventListener("click", closeProductDetail);
  document.getElementById("btnModalQtyMinus").addEventListener("click", () => {
    const input = document.getElementById("modalQtyInput");
    const val = parseInt(input.value, 10) || 1;
    if (val > 1) input.value = val - 1;
  });
  document.getElementById("btnModalQtyPlus").addEventListener("click", () => {
    const input = document.getElementById("modalQtyInput");
    const val = parseInt(input.value, 10) || 1;
    if (activeModalProduct && val < activeModalProduct.stock) {
      input.value = val + 1;
    }
  });
  document.getElementById("btnModalAddToCart").addEventListener("click", () => {
    if (activeModalProduct) {
      const qty = parseInt(document.getElementById("modalQtyInput").value, 10) || 1;
      addToCart(activeModalProduct.id, qty);
      closeProductDetail();
      openCart();
    }
  });

  // Filtros de Categoria (Pills)
  document.querySelectorAll(".category-nav .cat-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".category-nav .cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.dataset.category;
      renderProducts();
    });
  });

  // Busca
  const searchInput = document.getElementById("storeSearchInput");
  const clearSearchBtn = document.getElementById("btnClearSearch");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchTerm ? "flex" : "none";
      }
      renderProducts();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchTerm = "";
      clearSearchBtn.style.display = "none";
      renderProducts();
    });
  }

  // Filtro de Disponibilidade & Ordenação
  const filterAvail = document.getElementById("filterAvailability");
  if (filterAvail) {
    filterAvail.addEventListener("change", (e) => {
      availabilityFilter = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById("sortOrder");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortOrder = e.target.value;
      renderProducts();
    });
  }

  // Tecla ESC fecha modais e drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeProductDetail();
      closeCheckoutModal();
      closeOrderSuccessModal();
    }
  });
}

function resetFilters() {
  activeCategory = "";
  searchTerm = "";
  availabilityFilter = "in_stock";
  sortOrder = "featured";

  const searchInput = document.getElementById("storeSearchInput");
  if (searchInput) searchInput.value = "";
  const clearBtn = document.getElementById("btnClearSearch");
  if (clearBtn) clearBtn.style.display = "none";

  const filterAvail = document.getElementById("filterAvailability");
  if (filterAvail) filterAvail.value = "in_stock";

  const sortSelect = document.getElementById("sortOrder");
  if (sortSelect) sortSelect.value = "featured";

  document.querySelectorAll(".category-nav .cat-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.category === "");
  });

  renderProducts();
}

// =============================================================================
// 10. UTILITÁRIOS & TOASTS
// =============================================================================
function formatBRL(val) {
  return Number(val || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconName = "info";
  if (type === "success") iconName = "check-circle";
  if (type === "warning") iconName = "alert-triangle";

  toast.innerHTML = `
    <i data-lucide="${iconName}" style="width: 18px; height: 18px; flex-shrink: 0;"></i>
    <span class="toast-message">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 3500);
}

// Funções expostas no escopo global
window.resetFilters = resetFilters;
window.addToCart = addToCart;
window.updateCartItemQty = updateCartItemQty;
window.removeCartItem = removeCartItem;
window.openCart = openCart;
window.closeCart = closeCart;
window.openProductDetail = openProductDetail;
window.closeProductDetail = closeProductDetail;
window.closeOrderSuccessModal = closeOrderSuccessModal;
window.copyPixKey = copyPixKey;

// Inicialização
document.addEventListener("DOMContentLoaded", initStore);
