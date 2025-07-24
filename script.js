const categoryImages = {
  'Burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Pasta': 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?q=80&w=1600&auto=format&fit=crop',
  'Salate': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=768&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
};

const menuData = [
  {
    category: 'Burger',
    dishes: [
      {
        name: 'Trüffel Deluxe',
        price: 12.5,
        img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'BBQ Bacon Bomb',
        price: 11.0,
        img: 'https://images.unsplash.com/photo-1593620346079-8d85ce280dcc?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Vegan Avocado Dream',
        price: 10.0,
        img: 'https://images.unsplash.com/photo-1603508102983-99b101395d1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Blue Cheese Beef',
        price: 11.5,
        img: 'https://images.unsplash.com/photo-1637637187692-9736fe7b7973?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Habanero Inferno',
        price: 10.5,
        img: 'https://images.unsplash.com/photo-1637572166930-a649420a465b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ]
  },
  {
    category: 'Pasta',
    dishes: [
      {
        name: 'Carbonara',
        price: 9.0,
        img: 'https://media.istockphoto.com/id/508898476/de/foto/spaghetti-aglio-e-e-olio.webp?a=1&b=1&s=612x612&w=0&k=20&c=SpIq0qt70I3VeZqH78-vmN0zUc_wRq4EQjJMbl5LPqg='
      },
      {
        name: 'Bolognese',
        price: 9.5,
        img: 'https://media.istockphoto.com/id/1005860604/de/foto/hausgemachte-spaghetti-bolognese-essen.webp?a=1&b=1&s=612x612&w=0&k=20&c=AL8173P2ClfroqwbqFls5F5wg6ed8_M44Ca2NSvBa4o='
      },
      {
        name: 'Pesto',
        price: 8.5,
        img: 'https://images.unsplash.com/photo-1616299908398-9af1134ad522?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVzdG98ZW58MHx8MHx8fDA%3D'
      }
    ]
  },
  {
    category: 'Salate',
    dishes: [
      {
        name: 'Caesar',
        price: 7.5,
        img: 'https://plus.unsplash.com/premium_photo-1664392002995-4ee10b7f91e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGMlQzMlQTRzYXIlMjBzYWxhdHxlbnwwfHwwfHx8MA%3D%3D'
      },
      {
        name: 'Greco',
        price: 7.0,
        img: 'https://plus.unsplash.com/premium_photo-1676047258557-de72954cf17c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3JlY28lMjAlMjBzYWxhdHxlbnwwfHwwfHx8MA%3D%3D'
      },
      {
        name: 'Thunfisch',
        price: 8.0,
        img: 'https://images.unsplash.com/photo-1604909052583-bb464043e050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGh1bmZpc2NoJTIwJTIwc2FsYXR8ZW58MHx8MHx8fDA%3D'
      }
    ]
  }
];

const deliveryCost = 3.50;

let cartData = JSON.parse(localStorage.getItem('cart')) || [];
let paymentModal;

function addToCart(category, name) {
  const dish = menuData
    .find(cat => cat.category === category)
    .dishes.find(d => d.name === name);
  if (!dish) return;

  const existing = cartData.find(c => c.name === name);
  if (existing) existing.quantity++;
  else cartData.push({ ...dish, quantity: 1 });

  saveAndRenderCart();
}

function showContact() {
  document.getElementById('menuSections').style.display = 'none';
  document.getElementById('contactSection').style.display = 'block';
}

function showMenu() {
  document.getElementById('contactSection').style.display = 'none';
  document.getElementById('menuSections').style.display = 'block';
}


function toggleNav() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('open');
}

function changeQuantity(name, delta) {
  const item = cartData.find(c => c.name === name);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity < 1) cartData = cartData.filter(i => i.name !== name);

  saveAndRenderCart();
}

function removeFromCart(name) {
  cartData = cartData.filter(item => item.name !== name);
  saveAndRenderCart();
}

function saveAndRenderCart() {
  localStorage.setItem('cart', JSON.stringify(cartData));
  renderCart();
}

function renderMenu() {
  const menuContainer = document.getElementById('menuSections');
  menuContainer.innerHTML = '';

  menuData.forEach(section => {
    const sec = document.createElement('section');
    sec.className = 'menu-category';
    sec.id = `menu-${section.category.toLowerCase()}`;

    const imageUrl = categoryImages[section.category] || '';
    sec.innerHTML = `
  <div class="category-header">
    <img src="${imageUrl}" alt="${section.category} Bild" class="category-image">
    <h3>${section.category}</h3>
  </div>`;

    section.dishes.forEach(dish => {
      const d = document.createElement('div');
      d.className = 'dish';
      d.innerHTML = `
        <img 
          src="${dish.img}" 
          alt="${dish.name}" 
          onclick="addToCart('${section.category}', '${dish.name}')"
          title="Zum Warenkorb hinzufügen"
          style="cursor:pointer;"
        >
        <div>
          <h4>${dish.name}</h4>
          <p>€${dish.price.toFixed(2)}</p>
          <button onclick="addToCart('${section.category}', '${dish.name}')">+ In den Warenkorb</button>
        </div>`;
      sec.appendChild(d);
    });

    menuContainer.appendChild(sec);
  });
}

function renderCategories() {
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

function renderCart() {
  const list = document.getElementById('cartItems');
  const subtotalEls = document.querySelectorAll('#cartSubtotal'); // beide Felder ansprechen
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
        <button onclick="changeQuantity('${item.name}',1)">+</button>
        <button onclick="changeQuantity('${item.name}',-1)">−</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart('${item.name}')">×</button>
    `;
    list.appendChild(div);
  });

  // Beide Subtotal-Anzeigen aktualisieren
  subtotalEls.forEach(el => el.textContent = total.toFixed(2));

  if (cartData.length > 0) {
    deliveryEl.textContent = deliveryCost.toFixed(2);
    grandTotalEl.textContent = (total + deliveryCost).toFixed(2);
    mobileBtn.textContent = `🛒 €${(total + deliveryCost).toFixed(2)}`;
  } else {
    deliveryEl.textContent = '0.00';
    grandTotalEl.textContent = '0.00';
    mobileBtn.textContent = `🛒 €0.00`;
  }
}

function checkout() {
  if (cartData.length === 0) return alert('Dein Warenkorb ist leer!');
  document.getElementById('checkoutFormContainer').style.display = 'block';
  closePaymentModal();
}

function openPaymentModal() {
  paymentModal.show();
}

function closePaymentModal() {
  paymentModal.hide();
}

function finishOrder(method) {
  alert(`Danke für deine Bestellung per ${method}!`);
  cartData = [];
  saveAndRenderCart();
  closePaymentModal();
  document.getElementById('checkoutFormContainer').style.display = 'none';
  document.getElementById('deliveryInfo').innerHTML = '';

  // Bestellbestätigung anzeigen
  const confirmation = document.getElementById('orderConfirmation');
  confirmation.style.display = 'block';

  // Optional: Bestätigung nach 10 Sekunden automatisch ausblenden
  setTimeout(() => {
    confirmation.style.display = 'none';
  }, 10000);
}

function renderDeliveryInfo(name, address, phone) {
  document.getElementById('deliveryInfo').innerHTML = `
    <h4>Lieferinformationen:</h4>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Adresse:</strong> ${address}</p>
    <p><strong>Telefon:</strong> ${phone}</p>
    <p><strong>Voraussichtliche Lieferung:</strong> 30–45 Minuten</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
  paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

  document.getElementById('checkoutBtn')?.addEventListener('click', checkout);

  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    if (!name || !address || !phone) return alert('Bitte alle Felder ausfüllen.');
    renderDeliveryInfo(name, address, phone);
    openPaymentModal();
    document.getElementById('checkoutFormContainer').style.display = 'none';
  });

  window.toggleMenu = function () {
    const nav = document.querySelector('.header-nav');
    nav.classList.toggle('open');
  }

  renderMenu();
  renderCategories();
  renderCart();
});
