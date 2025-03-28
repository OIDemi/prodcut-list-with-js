# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

Product catalog webiste

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![Desktop](<./design/127.0.0.1_5500_(Nest%20Hub%20Max).png>)

### Links

- Solution URL: [Live Site](https://od-product-catalog.netlify.app/)
- Live Site URL: [Github Repo](https://github.com/OIDemi/prodcut-list-with-js)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

-Adding HTML elements dynamically using JavaScript

```js
const cartElement = document.createElement("section");
cartElement.setAttribute("class", "cart-list");
cartElement.innerHTML = `
        <div>
        <p class='name'>${item.name}</p>
        <div class='cart-items-info'>
          <p class='quantity'>${item.quantity}x</p>
          <p class='price'>@${item.price}</p>
          <p class='amount'>${calculateItemAmount}</p>
        </div>
        </div>
        <img src='./assets/images/icon-remove-item.svg' class='remove-btn'>
      `;

cartCatalog.insertAdjacentElement("afterbegin", cartElement);
```

### Continued development

-Upskill in JavaScript

## Author

- Website - [OJ](https://od-portfolio.netlify.app/)
- Frontend Mentor - [@OIDemi](https://www.frontendmentor.io/profile/OIDemi)
- Twitter - [@i_amoj](https://www.x.com/i_amoj)
