// ===== GERENCIAMENTO DE ESTOQUE DO BARBEIRO =====
console.log('📦 Arquivo estoque.js carregado');

let estoqueState = {
    products: [],
    loading: false,
    editingId: null
};

// ===== INICIALIZAÇÃO =====
async function initEstoque() {
    console.log('📦 Inicializando gerenciamento de estoque');
    await loadProducts();
}

// ===== CARREGAR PRODUTOS =====
async function loadProducts() {
    try {
        estoqueState.loading = true;
        showLoadingState();
        
        const response = await fetch('/api/inventory');
        const result = await response.json();
        
        if (result.success) {
            estoqueState.products = result.data || [];
            console.log('✅ Produtos carregados:', estoqueState.products.length);
            renderProducts();
        } else {
            showErrorState(result.message);
        }
    } catch (error) {
        console.error('❌ Erro ao carregar produtos:', error);
        showErrorState('Erro ao carregar produtos');
    } finally {
        estoqueState.loading = false;
    }
}

// ===== RENDERIZAR PRODUTOS =====
function renderProducts() {
    const container = document.getElementById('products-list');
    if (!container) return;
    
    if (estoqueState.products.length === 0) {
        container.innerHTML = `
            <div class="empty-state-modern">
                <div class="empty-state-icon">
                    <i class="fas fa-box-open"></i>
                </div>
                <div class="empty-state-title">Nenhum produto cadastrado</div>
                <div class="empty-state-text">Adicione produtos para controlar seu estoque</div>
            </div>
        `;
        return;
    }
    
    // Calcular valor total do estoque
    const totalValue = estoqueState.products.reduce((sum, p) => {
        return sum + (p.quantidade * p.preco_custo);
    }, 0);
    
    container.innerHTML = `
        <div class="estoque-summary">
            <div class="estoque-summary-item">
                <div class="estoque-summary-label">Total de Produtos</div>
                <div class="estoque-summary-value">${estoqueState.products.length}</div>
            </div>
            <div class="estoque-summary-item">
                <div class="estoque-summary-label">Itens em Estoque</div>
                <div class="estoque-summary-value">${estoqueState.products.reduce((sum, p) => sum + p.quantidade, 0)}</div>
            </div>
            <div class="estoque-summary-item">
                <div class="estoque-summary-label">Valor Total</div>
                <div class="estoque-summary-value">R$ ${totalValue.toFixed(2).replace('.', ',')}</div>
            </div>
        </div>
        
        <div class="products-grid">
            ${estoqueState.products.map(product => renderProductCard(product)).join('')}
        </div>
    `;
}

// ===== RENDERIZAR CARD DE PRODUTO =====
function renderProductCard(product) {
    const { id, produto, quantidade, preco_custo, fornecedor, categoria, descricao } = product;
    const valorTotal = quantidade * preco_custo;
    const isLowStock = quantidade < 5;
    
    return `
        <div class="product-card ${isLowStock ? 'low-stock' : ''}">
            <div class="product-card-header">
                <div class="product-card-title">${produto}</div>
                ${isLowStock ? '<div class="product-badge low-stock"><i class="fas fa-exclamation-triangle"></i> Estoque Baixo</div>' : ''}
            </div>
            
            <div class="product-card-body">
                <div class="product-info-row">
                    <div class="product-info-item">
                        <div class="product-info-label">Quantidade</div>
                        <div class="product-info-value ${isLowStock ? 'text-warning' : ''}">${quantidade} un</div>
                    </div>
                    <div class="product-info-item">
                        <div class="product-info-label">Preço Unitário</div>
                        <div class="product-info-value">R$ ${preco_custo.toFixed(2).replace('.', ',')}</div>
                    </div>
                </div>
                
                <div class="product-info-row">
                    <div class="product-info-item">
                        <div class="product-info-label">Valor Total</div>
                        <div class="product-info-value product-total">R$ ${valorTotal.toFixed(2).replace('.', ',')}</div>
                    </div>
                </div>
                
                ${fornecedor ? `
                    <div class="product-info-row">
                        <div class="product-info-item full-width">
                            <div class="product-info-label">Fornecedor</div>
                            <div class="product-info-value">${fornecedor}</div>
                        </div>
                    </div>
                ` : ''}
                
                ${descricao ? `
                    <div class="product-description">${descricao}</div>
                ` : ''}
            </div>
            
            <div class="product-card-actions">
                <button class="product-btn product-btn-edit" onclick="editProduct(${id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="product-btn product-btn-delete" onclick="deleteProduct(${id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `;
}

// ===== ADICIONAR/EDITAR PRODUTO =====
async function handleProductSubmit(event) {
    event.preventDefault();
    
    if (estoqueState.loading) return;
    
    const name = document.getElementById('prod-name').value.trim();
    const quantity = parseInt(document.getElementById('prod-qty').value);
    const price = parseFloat(document.getElementById('prod-price').value);
    
    if (!name || quantity < 0 || price < 0) {
        showNotification('Preencha todos os campos corretamente', 'error');
        return;
    }
    
    estoqueState.loading = true;
    
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    
    try {
        const data = {
            name,
            quantity,
            price,
            supplier: '',
            category: '',
            description: ''
        };
        
        const response = await fetch('/api/inventory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Produto adicionado com sucesso!', 'success');
            
            // Limpar formulário
            document.getElementById('product-form').reset();
            
            // Recarregar lista
            await loadProducts();
        } else {
            showNotification(result.message || 'Erro ao adicionar produto', 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao salvar produto:', error);
        showNotification('Erro ao salvar produto', 'error');
    } finally {
        estoqueState.loading = false;
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

// ===== EDITAR PRODUTO =====
async function editProduct(id) {
    const product = estoqueState.products.find(p => p.id === id);
    if (!product) return;
    
    // Preencher formulário
    document.getElementById('prod-name').value = product.produto;
    document.getElementById('prod-qty').value = product.quantidade;
    document.getElementById('prod-price').value = product.preco_custo;
    
    // Scroll para o formulário
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
    
    // Focar no primeiro campo
    document.getElementById('prod-name').focus();
    
    showNotification('Edite os dados e salve novamente', 'info');
}

// ===== EXCLUIR PRODUTO =====
async function deleteProduct(id) {
    const product = estoqueState.products.find(p => p.id === id);
    if (!product) return;
    
    if (!confirm(`Deseja realmente excluir "${product.produto}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/inventory/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Produto excluído com sucesso!', 'success');
            await loadProducts();
        } else {
            showNotification(result.message || 'Erro ao excluir produto', 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao excluir produto:', error);
        showNotification('Erro ao excluir produto', 'error');
    }
}

// ===== ESTADOS DE LOADING E ERRO =====
function showLoadingState() {
    const container = document.getElementById('products-list');
    if (!container) return;
    
    container.innerHTML = `
        <div class="empty-state-modern">
            <div class="empty-state-icon">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="empty-state-title">Carregando produtos...</div>
        </div>
    `;
}

function showErrorState(message) {
    const container = document.getElementById('products-list');
    if (!container) return;
    
    container.innerHTML = `
        <div class="empty-state-modern">
            <div class="empty-state-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="empty-state-title">Erro ao carregar produtos</div>
            <div class="empty-state-text">${message}</div>
            <button class="btn btn--primary" onclick="loadProducts()">
                <i class="fas fa-sync"></i> Tentar Novamente
            </button>
        </div>
    `;
}

// ===== NOTIFICAÇÃO =====
function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== EXPORTAR FUNÇÕES =====
window.initEstoque = initEstoque;
window.handleProductSubmit = handleProductSubmit;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.loadProducts = loadProducts;

console.log('✅ Sistema de estoque pronto');
