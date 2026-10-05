const CART_KEY = 'deckshop-cart';

// cart = { [id]: { id, title, price, quantity } } — объект по id товара
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch (error) {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getTotalCount() {
  return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}

function getTotalSum() {
  return Object.values(cart).reduce((sum, item) => sum + item.quantity * item.price, 0);
}

const badge = document.querySelector('.cart-badge');
const cartModal = document.getElementById('cartModal');
const orderModal = document.getElementById('orderModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCheckout = document.getElementById('cartCheckout');
const form = document.getElementById('orderForm');
const success = document.getElementById('orderSuccess');

function addToCart(id, title, price) {
  if (cart[id]) {
    cart[id].quantity += 1;
  } else {
    cart[id] = { id, title, price, quantity: 1 };
  }
  saveCart();
  renderCart();
}

function changeQuantity(id, delta) {
  const item = cart[id];
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    delete cart[id];
  }
  saveCart();
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  saveCart();
  renderCart();
}

function renderCart() {
  const count = getTotalCount();
  if (count > 0) {
    badge.textContent = count;
    badge.hidden = false;
  } else {
    badge.hidden = true;
  }

  const items = Object.values(cart);

  if (items.length === 0) {
    cartItems.innerHTML = cartEmptyTemplate();
  } else {
    cartItems.innerHTML = items.map(cartItemTemplate).join('');
  }

  cartTotal.textContent = 'Итого: ' + getTotalSum() + ' ₽';
  cartCheckout.hidden = items.length === 0;
}

cartItems.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-action]');
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  if (action === 'plus') changeQuantity(id, 1);
  else if (action === 'minus') changeQuantity(id, -1);
  else if (action === 'remove') removeItem(id);
});

document.querySelectorAll('.btn--cart').forEach((btn) => {
  btn.addEventListener('click', () => {
    addToCart(btn.dataset.id, btn.dataset.title, Number(btn.dataset.price));
  });
});

function openModal(modal) {
  modal.classList.add('modal--open');
}

function closeModal(modal) {
  modal.classList.remove('modal--open');
}

document.querySelector('.icon-btn--cart').addEventListener('click', () => {
  openModal(cartModal);
});

[cartModal, orderModal].forEach((modal) => {
  modal.querySelector('[data-close]').addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

cartCheckout.addEventListener('click', () => {
  closeModal(cartModal);
  form.hidden = false;
  success.hidden = true;
  form.reset();
  openModal(orderModal);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  form.hidden = true;
  success.hidden = false;
  cart = {};
  saveCart();
  renderCart();
});

renderCart();
