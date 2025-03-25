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
        <img src='${product.image.desktop}' alt = '${product.name}' class='product-img'>
        <div class='product-content'>
        <p class='product-category'>${product.category}</p>
        <p class='product-name'>${product.name}</p>
        <p class='product-price'>${product.price}</p>
        </div>
        `;
      dessertsCatalog.insertAdjacentElement("afterbegin", productElement);
    });
  });
