
// Product Data
const PRODUCTS = [
    // Electronics
    { id: 'E001', name: 'Smartphone Pro', category: 'Electronics', price: 899.99, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop' },
    { id: 'E002', name: 'Wireless Headphones', category: 'Electronics', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    { id: 'E003', name: 'Laptop Ultra', category: 'Electronics', price: 1299.99, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
    { id: 'E004', name: 'Smart Watch', category: 'Electronics', price: 299.99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop' },
    { id: 'E005', name: 'Bluetooth Speaker', category: 'Electronics', price: 89.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop' },
    
    // Clothing
    { id: 'C001', name: 'Designer Jacket', category: 'Clothing', price: 159.99, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop' },
    { id: 'C002', name: 'Premium T-Shirt', category: 'Clothing', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop' },
    { id: 'C003', name: 'Comfortable Jeans', category: 'Clothing', price: 79.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop' },
    { id: 'C004', name: 'Stylish Sneakers', category: 'Clothing', price: 119.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' },
    { id: 'C005', name: 'Elegant Dress', category: 'Clothing', price: 89.99, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=300&fit=crop' },
    
    // Watches
    { id: 'W001', name: 'Classic Timepiece', category: 'Watches', price: 349.99, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop' },
    { id: 'W002', name: 'Sport Watch', category: 'Watches', price: 199.99, image: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=300&fit=crop' },
    { id: 'W003', name: 'Luxury Watch', category: 'Watches', price: 799.99, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=300&fit=crop' },
    { id: 'W004', name: 'Digital Watch', category: 'Watches', price: 129.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' }
];

// Cart Management
let cart = [];

// DOM Elements
const mainContent = document.getElementById('main-content');
const cartCountElement = document.querySelector('.cart-count');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    // Load page content
    switch(pageId) {
        case 'catalog':
            loadCatalog();
            break;
        case 'products':
            loadAllProducts();
            break;
        case 'cart':
            loadCart();
            break;
        case 'checkout':
            loadCheckout();
            break;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation event listeners
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterProducts);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Place order functionality
    document.addEventListener('click', function(e) {
        if (e.target.id === 'place-order-btn') {
            placeOrder();
        }
    });
    
    // Initialize
    updateCartCount();
    showPage('home');
});

// Product Display Functions
function createProductCard(product) {
    const cartItem = cart.find(item => item.id === product.id);
    const inCart = cartItem ? cartItem.quantity : 0;
    
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-id">ID: ${product.id}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-category">${product.category}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart('${product.id}')">
                        ➕ Add to Cart
                    </button>
                    ${inCart > 0 ? `
                        <button class="btn btn-danger" onclick="removeFromCart('${product.id}')">
                            ➖ Remove (${inCart})
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function loadCatalog() {
    const catalogContainer = document.getElementById('catalog-products');
    catalogContainer.innerHTML = PRODUCTS.map(product => createProductCard(product)).join('');
}

function loadAllProducts() {
    filterProducts();
}

function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    
    let filteredProducts = PRODUCTS;
    
    // Filter by category
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Filter by search term (product ID)
    if (searchTerm.trim()) {
        filteredProducts = filteredProducts.filter(product => 
            product.id.toLowerCase().includes(searchTerm)
        );
    }
    
    const container = document.getElementById('filtered-products');
    const noResults = document.getElementById('no-results');
    
    if (filteredProducts.length > 0) {
        container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        container.classList.remove('hidden');
        noResults.classList.add('hidden');
    } else {
        container.classList.add('hidden');
        noResults.classList.remove('hidden');
    }
}

// Cart Functions
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showToast(`${product.name} added to cart!`);
    
    // Refresh current page to update buttons
    const currentPage = document.querySelector('.page.active').id;
    if (currentPage === 'catalog') {
        loadCatalog();
    } else if (currentPage === 'products') {
        filterProducts();
    }
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const product = cart[itemIndex];
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        updateCartCount();
        showToast(`Item removed from cart`);
        
        // Refresh current page
        const currentPage = document.querySelector('.page.active').id;
        if (currentPage === 'catalog') {
            loadCatalog();
        } else if (currentPage === 'products') {
            filterProducts();
        } else if (currentPage === 'cart') {
            loadCart();
        }
    }
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartCount();
        loadCart();
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

function getTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function loadCart() {
    const cartEmpty = document.getElementById('cart-empty');
    const cartItems = document.getElementById('cart-items');
    const cartItemsList = document.querySelector('.cart-items-list');
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartEmpty.classList.remove('hidden');
        cartItems.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        cartItems.classList.remove('hidden');
        
        // Render cart items
        cartItemsList.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">
                        ID: ${item.id} • ${item.category}
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                            ➖
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                            ➕
                        </button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="item-unit-price">$${item.price.toFixed(2)} each</div>
                </div>
            </div>
        `).join('');
        
        // Update totals
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        totalItems.textContent = itemCount;
        totalPrice.textContent = getTotalPrice().toFixed(2);
    }
}

function loadCheckout() {
    const checkoutEmpty = document.getElementById('checkout-empty');
    const checkoutContent = document.getElementById('checkout-content');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const orderTotal = document.getElementById('order-total');
    
    if (cart.length === 0) {
        checkoutEmpty.classList.remove('hidden');
        checkoutContent.classList.add('hidden');
    } else {
        checkoutEmpty.classList.add('hidden');
        checkoutContent.classList.remove('hidden');
        
        // Render checkout items
        checkoutItems.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
                <div class="checkout-item-info">
                    <div class="checkout-item-name">${item.name}</div>
                    <div class="checkout-item-details">
                        Quantity: ${item.quantity} × $${item.price.toFixed(2)}
                    </div>
                </div>
                <div class="checkout-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
        
        // Update totals
        const total = getTotalPrice().toFixed(2);
        checkoutTotal.textContent = total;
        orderTotal.textContent = total;
    }
}

function placeOrder() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const paymentMethodText = paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery';
    
    // Simulate order processing
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.innerHTML = `
        <span style="display: inline-flex; align-items: center;">
            <span style="width: 20px; height: 20px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></span>
            Processing Order...
        </span>
    `;
    placeOrderBtn.disabled = true;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        showToast(`Order Placed Successfully! Payment method: ${paymentMethodText}`);
        cart = [];
        updateCartCount();
        showPage('home');
        
        // Reset button
        placeOrderBtn.innerHTML = `Place Order - $0.00`;
        placeOrderBtn.disabled = false;
        document.head.removeChild(style);
    }, 2000);
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
