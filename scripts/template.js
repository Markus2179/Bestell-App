export const templatesHTML = `
<template id="categoryTemplate">
  <section class="menu-category">
    <div class="category-header">
      <h3 class="category-title"></h3>
      <img class="category-image" alt="">
    </div>
  </section>
</template>

<template id="dishTemplate">
  <div class="dish">
    <img class="dish-img" title="Zum Warenkorb hinzufügen" style="cursor:pointer;">
    <div>
      <h4 class="dish-name"></h4>
      <p class="dish-price"></p>
      <button class="add-to-cart-btn">+ In den Warenkorb</button>
    </div>
  </div>
</template>

<template id="cartItemTemplate">
  <div class="cart-item">
    <div class="item-name">
      <strong class="item-title"></strong><br>
      <span class="item-total-line"></span>
    </div>
    <div class="quantity-controls">
      <button class="plus-btn">+</button>
      <button class="minus-btn">−</button>
    </div>
    <button class="remove-btn">×</button>
  </div>
</template>

<template id="deliveryTemplate">
  <div class="delivery-info">
    <h4>Lieferinformationen:</h4>
    <p><strong>Name:</strong> <span class="delivery-name"></span></p>
    <p><strong>Adresse:</strong> <span class="delivery-address"></span></p>
    <p><strong>Telefon:</strong> <span class="delivery-phone"></span></p>
    <p><strong>Voraussichtliche Lieferung:</strong> 30–45 Minuten</p>
  </div>
</template>
`;
