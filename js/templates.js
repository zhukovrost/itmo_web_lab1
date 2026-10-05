const cartEmptyTemplate = () => '<p class="cart-empty">Корзина пуста</p>';

const cartItemTemplate = (item) => `
  <div class="cart-item">
    <div class="cart-item__info">
      <div class="cart-item__title">${item.title}</div>
      <div class="cart-item__sum">${item.price * item.quantity}&nbsp;₽</div>
    </div>
    <div class="cart-item__qty">
      <button type="button" class="cart-qty-btn" data-action="minus" data-id="${item.id}" aria-label="Уменьшить количество">−</button>
      <span class="cart-qty-value">${item.quantity}</span>
      <button type="button" class="cart-qty-btn" data-action="plus" data-id="${item.id}" aria-label="Увеличить количество">+</button>
    </div>
    <button type="button" class="cart-item__remove" data-action="remove" data-id="${item.id}">Удалить</button>
  </div>
`;
