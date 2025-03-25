"use strict";

const dessertsCatalog = document.querySelector(".desserts-product-container");
console.log(dessertsCatalog);
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.setAttribute("class", "products-wrapper");

      productElement.innerHTML = `
      <picture>
      <source srcset='${product.image.mobile}' media='(max-width: 768px)'>
      <source srcset='${product.image.tablet}' media='(max-width: 1024px)'>
        <img src='${product.image.desktop}' alt = '${product.name}' class='product-img'>
      </picture>
        <div class='product-content'>
        <p class='product-category'>${product.category}</p>
        <p class='product-name'>${product.name}</p>
        <p class='product-price'>$${product.price}</p>
        </div>
        `;
      dessertsCatalog.insertAdjacentElement("afterbegin", productElement);
    });
  });
