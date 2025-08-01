import { categoryImages, menuData, deliveryCost } from './scripts/db.js';
import { templatesHTML } from './scripts/template.js';

function formatEuro(value) {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €';
}

function renderMenu(menuData, addToCart) {
  const container = document.getElementById('menuSections');
  container.innerHTML = '';
  const categoryTemplate = document.getElementById('categoryTemplate');
  const dishTemplate = document.getElementById('dishTemplate');

  menuData.forEach(section => {
    const categoryClone = categoryTemplate.content.cloneNode(true);
    const categoryElement = categoryClone.querySelector('.menu-category');
    categoryElement.id = `menu-${section.category.toLowerCase()}`;
    categoryElement.querySelector('.category-title').textContent = section.category;
    const categoryImage = categoryElement.querySelector('.category-image');
    categoryImage.src = categoryImages[section.category] || 'images/placeholder.jpg';
    categoryImage.alt = section.category;

    section.dishes.forEach(dish => {
      const dishClone = dishTemplate.content.cloneNode(true);
      dishClone.querySelector('.dish-img').src = dish.img;
      dishClone.querySelector('.dish-img').alt = dish.name;
      dishClone.querySelector('.dish-name').textContent = dish.name;
      dishClone.querySelector('.dish-price').textContent = formatEuro(dish.price);
      const handler = () => addToCart(section.category, dish.name);
      dishClone.querySelector('.dish-img').addEventListener('click', handler);
      dishClone.querySelector('.add-to-cart-btn').addEventListener('click', handler);
      categoryElement.appendChild(dishClone);
    });

    container.appendChild(categoryElement);
  });
}

function renderCategories(menuData) {
  const navigation = document.getElementById('categoryNav');
  navigation.innerHTML = '';
  menuData.forEach(section => {
    const button = document.createElement('button');
    button.textContent = section.category;
    button.onclick = () => {
      const categoryElement = document.getElementById(`menu-${section.category.toLowerCase()}`);
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    navigation.appendChild(button);
  });
}

function renderCart(cartData, changeQuantity, removeFromCart) {
  const list = document.getElementById('cartItems');
  const subtotalElements = document.querySelectorAll('#cartSubtotal, #cartSubtotalSummary');
  const deliveryElement = document.getElementById('deliveryCost');
  const grandTotalElement = document.getElementById('grandTotal');
  const mobileButton = document.getElementById('mobileCartBtn');
  const cartItemTemplate = document.getElementById('cartItemTemplate');
  list.innerHTML = '';
  let total = 0;

  cartData.forEach(item => {
    total += item.price * item.quantity;
    const clone = cartItemTemplate.content.cloneNode(true);
    clone.querySelector('.item-title').textContent = item.name;
    clone.querySelector('.item-total-line').textContent = `${formatEuro(item.price)} × ${item.quantity} = ${formatEuro(item.price * item.quantity)}`;
    clone.querySelector('.plus-btn').onclick = () => changeQuantity(item.name, 1);
    clone.querySelector('.minus-btn').onclick = () => changeQuantity(item.name, -1);
    clone.querySelector('.remove-btn').onclick = () => removeFromCart(item.name);
    list.appendChild(clone);
  });

  subtotalElements.forEach(el => el.textContent = formatEuro(total));
  const hasItems = cartData.length > 0;
  deliveryElement.textContent = formatEuro(hasItems ? deliveryCost : 0);
  grandTotalElement.textContent = formatEuro(hasItems ? total + deliveryCost : 0);
  mobileButton.textContent = `🛒 ${formatEuro(hasItems ? total + deliveryCost : 0)}`;
}

function renderDeliveryInfo(name, address, phone) {
  const container = document.getElementById('deliveryInfo');
  container.innerHTML = '';
  const template = document.getElementById('deliveryTemplate');
  const clone = template.content.cloneNode(true);

  clone.querySelector('.delivery-name').textContent = name;
  clone.querySelector('.delivery-address').textContent = address;
  clone.querySelector('.delivery-phone').textContent = phone;

  container.appendChild(clone);
}

let cartData = JSON.parse(localStorage.getItem('cart')) || [];
let paymentModal;

function sendMail(event) {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const subject = encodeURIComponent(`Kontaktanfrage von ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nNachricht:\n${message}`);
  window.location.href = `mailto:markus.grund@bestellapp.de?subject=${subject}&body=${body}`;
}

function saveAndRenderCart() {
  localStorage.setItem('cart', JSON.stringify(cartData));
  renderCart(cartData, changeQuantity, removeFromCart);
  updateMobileCartButton();
  updateSummary();
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
  if (item.quantity < 1) cartData = cartData.filter(i => i.name !== name);

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
  cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
}

function updateMobileCartButton() {
  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = cartData.length > 0 ? subtotal + deliveryCost : 0;
  document.getElementById('mobileCartBtn').textContent = `🛒 ${formatEuro(total)}`;
}

function updateSummary() {
  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cartData.length > 0 ? deliveryCost : 0;
  const grand = subtotal + delivery;

  document.getElementById('cartSubtotal').textContent = formatEuro(subtotal);
  document.getElementById('cartSubtotalSummary').textContent = formatEuro(subtotal);
  document.getElementById('deliveryCost').textContent = formatEuro(delivery);
  document.getElementById('grandTotal').textContent = formatEuro(grand);
}

function checkout() {
  if (cartData.length === 0) return ('Dein Warenkorb ist leer!');
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
  cartData = [];
  saveAndRenderCart();
  closePaymentModal();
  document.getElementById('checkoutFormContainer').style.display = 'none';
  document.getElementById('deliveryInfo').innerHTML = '';
  const confirmation = document.getElementById('orderConfirmation');
  confirmation.style.display = 'block';
  setTimeout(() => (confirmation.style.display = 'none'), 10000);
}

document.addEventListener('DOMContentLoaded', () => {

  document.body.insertAdjacentHTML('beforeend', templatesHTML);

  paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
  document.getElementById('checkoutBtn')?.addEventListener('click', checkout);

  document.getElementById('checkoutForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    if (!name || !address || !phone) return ('Bitte alle Felder ausfüllen.');

    renderDeliveryInfo(name, address, phone);
    openPaymentModal();
    document.getElementById('checkoutFormContainer').style.display = 'none';
  });

  window.toggleMenu = toggleMenu;
  window.finishOrder = finishOrder;
  window.showContact = showContact;
  window.showMenu = showMenu;
  window.toggleCart = toggleCart;
  window.sendMail = sendMail;

  renderMenu(menuData, addToCart);
  renderCategories(menuData);
  saveAndRenderCart();
});
