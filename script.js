import { menuData, deliveryCost, categoryImages } from './scripts/db.js';
import { renderMenu, renderCategories, renderCart, renderDeliveryInfo } from './scripts/template.js';

console.log(menuData);         // Prüfen ob Daten geladen werden
console.log(deliveryCost);
console.log(categoryImages);

let cartData = JSON.parse(localStorage.getItem('cart')) || [];
let paymentModal;

function sendMail(event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    alert('Bitte fülle alle Felder aus.');
    return;
  }

  // Betreff und Text für die Mail
  const subject = encodeURIComponent(`Kontaktanfrage von ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`);

  // Email-Adresse hier anpassen
  const mailTo = `markus.grund@bestellapp.de`;

  // Mailto-Link bauen und öffnen
  const mailtoLink = `mailto:${mailTo}?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;
}

function saveAndRenderCart() {
  localStorage.setItem('cart', JSON.stringify(cartData));
  renderCart(cartData, changeQuantity, removeFromCart);
  updateMobileCartButton();
}

function addToCart(category, name) {
  const dish = menuData.find(cat => cat.category === category)?.dishes.find(d => d.name === name);
  if (!dish) return;

  const existing = cartData.find(c => c.name === name);
  if (existing) existing.quantity++;
  else cartData.push({ ...dish, quantity: 1 });

  saveAndRenderCart();
}

function changeQuantity(name, delta) {
  const item = cartData.find(c => c.name === name);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity < 1) {
    cartData = cartData.filter(i => i.name !== name);
  }

  saveAndRenderCart();
}

function removeFromCart(name) {
  cartData = cartData.filter(item => item.name !== name);
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

function toggleMenu() {
  toggleNav();
}

function toggleCart() {
  const cart = document.getElementById('cart');
  if (cart.style.display === 'block') {
    cart.style.display = 'none';
  } else {
    cart.style.display = 'block';
  }
}

function updateMobileCartButton() {
  const mobileBtn = document.getElementById('mobileCartBtn');
  const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  mobileBtn.textContent = `🛒 €${total.toFixed(2)}`;
}

function checkout() {
  if (cartData.length === 0) {
    alert('Dein Warenkorb ist leer!');
    return;
  }
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

  const confirmation = document.getElementById('orderConfirmation');
  confirmation.style.display = 'block';

  setTimeout(() => {
    confirmation.style.display = 'none';
  }, 10000);
}

document.addEventListener('DOMContentLoaded', () => {
  paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

  document.getElementById('checkoutBtn')?.addEventListener('click', checkout);

  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();

    if (!name || !address || !phone) {
      alert('Bitte alle Felder ausfüllen.');
      return;
    }

    renderDeliveryInfo(name, address, phone);
    openPaymentModal();
    document.getElementById('checkoutFormContainer').style.display = 'none';
  });

  // Exportiert Funktionen ins window-Objekt für HTML-Events
  window.toggleMenu = toggleMenu;
  window.finishOrder = finishOrder;
  window.showContact = showContact;
  window.showMenu = showMenu;
  window.toggleCart = toggleCart;

  // Initiale Renderings
  renderMenu(menuData, addToCart);
  renderCategories(menuData);
  saveAndRenderCart();
});

