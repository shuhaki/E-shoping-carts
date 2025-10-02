let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function loadProducts() {
  const res = await fetch('/products');
  products = await res.json();
  renderProducts(products);
}

function renderProducts(products) {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  // Show feedback to user
  showCartFeedback('Item added to cart!');
}

function updateQuantity(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += change;
    
    // Remove item if quantity becomes 0 or less
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    
    saveCart();
    renderCart(); // Refresh cart display
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart(); // Refresh cart display
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const itemsDiv = document.getElementById('cart-items');
  const totalDiv = document.getElementById('cart-total');
  itemsDiv.innerHTML = '';
  let total = 0;
  
  if (cart.length === 0) {
    itemsDiv.innerHTML = '<p>Your cart is empty</p>';
    totalDiv.innerHTML = `<strong>Total: $0.00</strong>`;
    return;
  }
  
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-info">
        <h4>${product.name}</h4>
        <p>$${product.price} each</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        <span class="qty-display">${item.qty}</span>
        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
      <div class="cart-item-total">
        $${(product.price * item.qty).toFixed(2)}
      </div>
    `;
    itemsDiv.appendChild(div);
    total += product.price * item.qty;
  });
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

function showCartFeedback(message) {
  // Create feedback element if it doesn't exist
  let feedback = document.getElementById('cart-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.id = 'cart-feedback';
    document.body.appendChild(feedback);
  }
  
  feedback.textContent = message;
  feedback.style.display = 'block';
  
  // Hide after 2 seconds
  setTimeout(() => {
    feedback.style.display = 'none';
  }, 2000);
}

// Modal logic
const modal = document.getElementById('cart-modal');
const btn = document.getElementById('cart-btn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = () => {
  renderCart();
  modal.style.display = 'block';
};

span.onclick = () => modal.style.display = 'none';

window.onclick = (event) => {
  if (event.target == modal) modal.style.display = 'none';
};

// Checkout
document.getElementById('checkout-btn').onclick = async () => {
  if (cart.length === 0) return alert('Cart is empty');
  const res = await fetch('/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  });
  const data = await res.json();
  alert(data.message);
  cart = [];
  saveCart();
  modal.style.display = 'none';
  renderCart(); // Update cart display
};

loadProducts();