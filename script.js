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
    <div class='img-wrapper'>
    <picture >
    <source srcset='${product.image.mobile}' media='(max-width: 768px)' class='product-img'>
    <source srcset='${product.image.tablet}' media='(max-width: 1024px)' class='product-img'>
      <img src='${product.image.desktop}' alt = '${product.name}' class='product-img'>
      <button class='product-btn'><img src='./assets/images/icon-add-to-cart.svg' alt='add-to-cart'>Add to Cart</button>
    </picture>
    </div>
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
      const parentElement = btn.parentElement.parentElement;
      console.log(parentElement);
      const productName =
        parentElement.nextElementSibling.querySelector(
          ".product-name"
        ).textContent;

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
      const cartElement = document.createElement("section");
      cartElement.setAttribute("class", "cart-list");
      cartElement.innerHTML = `
        <div>
        <p class='item-name'>${item.name}</p>
        <div class='cart-items-info'>
          <p class='quantity'>${item.quantity}x</p>
          <p class='price'>@${item.price}</p>
          <p class='amount'>${amount}</p>
        </div>
        </div>
        <img src='./assets/images/icon-remove-item.svg' class='remove-btn'>
      `;

      cartCatalog.insertAdjacentElement("afterbegin", cartElement);
    });

    const totalOrder = document.createElement("section");
    const totalAmount = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    totalOrder.setAttribute("class", "total-order-section");
    totalOrder.innerHTML = `
    <div class='total-order'>
    <p>Order total</p>
    <p>$${totalAmount}</p>
    </div>
    <div class='carbon-neutral-section'>
    <img src='./assets/images/icon-carbon-neutral.svg' alt='carbon-neutral'>
    <p>This is a <span>carbon-neutral</span> delivery</p>
    </div>
    <button>Confirm Order</button>
    `;
    cartCatalog.insertAdjacentElement("beforeend", totalOrder);
  }
  removeCartItem(cartList);
}

function removeCartItem(cart) {
  const removeBtn = document.querySelectorAll(".remove-btn");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemName =
        btn.parentElement.querySelector(".item-name").textContent;
      const findItem = cart.findIndex((item) => item.name === itemName);
      cart.splice(findItem, 1);

      if (cart.length === 0) {
        amountOfItemsInCart.textContent = 0;
        cartCatalog.innerHTML = "";
        const emptyContent = document.createElement("div");
        emptyContent.setAttribute("class", "empty-cart-content");
        emptyContent.innerHTML = `
        <img
                src="./assets/images/illustration-empty-cart.svg"
                alt="empty-cart"
              />
              <p>Your added items will appear here</p>
        `;
        cartCatalog.insertAdjacentElement("afterbegin", emptyContent);
      }
      updateCartUI(cartList);
    });
  });
}
