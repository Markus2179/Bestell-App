import { categoryImages, menuData, deliveryCost } from './db.js';

export function renderMenu(menuData, addToCart) {
  const container = document.getElementById('menuSections');
  container.innerHTML = '';

  menuData.forEach(section => {
    const sec = document.createElement('section');
    sec.className = 'menu-category';
    sec.id = `menu-${section.category.toLowerCase()}`;

    const categoryImage = categoryImages[section.category] || 'images/placeholder.jpg';

    sec.innerHTML = `
  <div class="category-header">
    <h3>${section.category}</h3>
    <img src="${categoryImage}" class="category-image" alt="${section.category}">
  </div>
`;


    section.dishes.forEach(dish => {
      const div = document.createElement('div');
      div.className = 'dish';
      div.innerHTML = `
        <img src="${dish.img}" alt="${dish.name}" title="Zum Warenkorb hinzufügen" style="cursor:pointer;" />
        <div>
          <h4>${dish.name}</h4>
          <p>€${dish.price.toFixed(2)}</p>
          <button>+ In den Warenkorb</button>
        </div>
      `;

      div.querySelector('button').addEventListener('click', () => addToCart(section.category, dish.name));
      div.querySelector('img').addEventListener('click', () => addToCart(section.category, dish.name));
      sec.appendChild(div);
    });

    container.appendChild(sec);
  });
}

export function renderCategories(menuData) {
  const nav = document.getElementById('categoryNav');
  nav.innerHTML = '';

  menuData.forEach(section => {
    const btn = document.createElement('button');
    btn.textContent = section.category;
    btn.onclick = () => {
      const el = document.getElementById(`menu-${section.category.toLowerCase()}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    nav.appendChild(btn);
  });
}

export function renderCart(cartData, changeQuantity, removeFromCart) {
  const list = document.getElementById('cartItems');
  const subtotalEls = document.querySelectorAll('#cartSubtotal, #cartSubtotalSummary');
  const deliveryEl = document.getElementById('deliveryCost');
  const grandTotalEl = document.getElementById('grandTotal');
  const mobileBtn = document.getElementById('mobileCartBtn');

  list.innerHTML = '';
  let total = 0;

  cartData.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="item-name">
        <strong>${item.name}</strong><br>
        €${item.price.toFixed(2)} × ${item.quantity} = €${(item.price * item.quantity).toFixed(2)}
      </div>
      <div class="quantity-controls">
        <button>+</button>
        <button>−</button>
      </div>
      <button class="remove-btn">×</button>
    `;

    div.querySelector('.quantity-controls button:first-child').onclick = () => changeQuantity(item.name, 1);
    div.querySelector('.quantity-controls button:last-child').onclick = () => changeQuantity(item.name, -1);
    div.querySelector('.remove-btn').onclick = () => removeFromCart(item.name);

    list.appendChild(div);
  });

  subtotalEls.forEach(el => (el.textContent = total.toFixed(2)));

  if (cartData.length > 0) {
    deliveryEl.textContent = deliveryCost.toFixed(2);
    grandTotalEl.textContent = (total + deliveryCost).toFixed(2);
    mobileBtn.textContent = `🛒 €${(total + deliveryCost).toFixed(2)}`;
  } else {
    deliveryEl.textContent = '0.00';
    grandTotalEl.textContent = '0.00';
    mobileBtn.textContent = '🛒 €0.00';
  }
}

export function renderDeliveryInfo(name, address, phone) {
  const container = document.getElementById('deliveryInfo');
  container.innerHTML = `
    <h4>Lieferinformationen:</h4>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Adresse:</strong> ${address}</p>
    <p><strong>Telefon:</strong> ${phone}</p>
    <p><strong>Voraussichtliche Lieferung:</strong> 30–45 Minuten</p>
  `;
}
