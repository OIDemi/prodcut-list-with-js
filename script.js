"use strict";

const dessertsCatalog = document.querySelector(".desserts-product-container");
const cartCatalog = document.querySelector(".cart-section");
const amountOfItemsInCart = document.querySelector(".cart-quantity");

let cartList = [];
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    fetchProducts(data);
    addToCart(data);
  });

//FUNCTIONS
function fetchProducts(data) {
  data.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.setAttribute("class", "products-wrapper");

    productElement.innerHTML = `
    <picture class='img-wrapper'>
    <source srcset='${product.image.mobile}' media='(max-width: 768px)' class='product-img'>
    <source srcset='${product.image.tablet}' media='(max-width: 1024px)' class='product-img'>
      <img src='${product.image.desktop}' alt = '${product.name}' class='product-img'>
    </picture>
    <button class='product-btn'>Add to Cart</button>
      <div class='product-content'>
      <p class='product-category'>${product.category}</p>
      <p class='product-name'>${product.name}</p>
      <p class='product-price'>$${product.price}</p>
      </div>
      `;
    dessertsCatalog.insertAdjacentElement("afterbegin", productElement);
  });
}

function addToCart(data) {
  const addToCartBtn = document.querySelectorAll(".product-btn");

  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentElement = btn.parentElement;
      const productName =
        parentElement.querySelector(".product-name").textContent;

      const isInCart = cartList.find((item) => item.name === productName);

      if (isInCart) {
        cartList = cartList.map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log(cartList);
      } else {
        const addNewProduct = data.find((item) => item.name === productName);
        cartList.push({ ...addNewProduct, quantity: 1 });
        console.log(cartList);
      }
      updateCartUI(cartList);
    });
  });
}

function updateCartUI(cart) {
  if (cart.length > 0) {
    amountOfItemsInCart.textContent = cart.length;
    cartCatalog.innerHTML = "";
    cart.forEach((item) => {
      const amount = item.price * item.quantity;
      const itemElement = document.createElement("section");
      itemElement.setAttribute("class", "cart-list");
      itemElement.innerHTML = `
        <div>
        <p>${item.name}</p>
        <div class='cart-items-info'>
          <p class='quantity'>${item.quantity}x</p>
          <p class='price'>@${item.price}</p>
          <p class='amount'>${amount}</p>
        </div>
        </div>
        <img src='./assets/images/icon-remove-item.svg'>
      `;

      cartCatalog.insertAdjacentElement("afterbegin", itemElement);
    });
  }
}
