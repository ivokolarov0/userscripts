// ==UserScript==
// @name         Price per kg
// @namespace    http://tampermonkey.net/
// @version      2024-08-10
// @description  try to take over the world!
// @author       You
// @match        https://bulmag.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bulmag.org
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const handleItem = item => {
    if(!item.textContent.match(/\d+\s?гр?/)) {
      return
    }

    const card = item.closest('.product-card');
    if(card.classList.contains('is-modified')) {
      return;
    }
    let price;
    let grams;

    if(item.textContent.match(/(\d+)х(\d+)\s?гр?/)) {
      const match = item.textContent.match(/(\d+)х(\d+)\s?гр?/);
      grams = parseInt(match[1]) * parseInt(match[2]);
    } else {
      grams = item.textContent.match(/(\d+)\s?гр?/)[1]
    }

    const priceComponent = card.querySelector('.product-price-component');
    const promo = priceComponent.querySelector('.product-promo-price');

    if(promo) {
      price = parseFloat(promo.childNodes[1].childNodes[1].textContent.match(/[0-9.]+/)[0]);
    } else {
      price = parseFloat(priceComponent?.querySelector('.product-price').childNodes[1].textContent);
    }

    const pricePer1kg = (1000 * (price / grams)).toFixed(2);

    priceComponent.insertAdjacentHTML('afterend', `
      <code>1kg: ${pricePer1kg}лв</code>
    `);

    card.classList.add('is-modified')
  }

  document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key.toLowerCase() === 'h') {
      document.querySelectorAll('.product-name').forEach(handleItem)

      const mutation = new MutationObserver(() => {
        document.querySelectorAll('.product-name').forEach(handleItem)
      })
      const productContianer = document.querySelector('#products');
      mutation.observe(productContianer, {
        childList: true
      })
    }
  });
})();