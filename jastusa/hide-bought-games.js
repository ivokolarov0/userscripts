// ==UserScript==
// @name         Hide JASTUSA Bought games
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jastusa.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jastusa.com
// @grant        none
// ==/UserScript==

(function() {
  const button = document.createElement('button');
  button.textContent = 'Remove bought games';
  button.style.position = 'fixed';
  button.style.right = '5px';
  button.style.bottom = '5px';

  function clearItems() {
    const listing = document.querySelector('.section--games');
    if(!listing) {
      return;
    }
    const vueData = listing.__vue__;
    const children = vueData.$children.filter(item => item.$options._componentTag === 'ProductBox');
    children.map(item => {
      if(item._computedWatchers.alreadyBought.value) {
        item.$el.style.display = 'none';
      }
    })
  }
  button.addEventListener('click', (e) => {
    e.preventDefault();
    clearItems();
  })

  document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key.toLowerCase() === 'h') {
      clearItems();
    }
  });
  document.body.appendChild(button);
})();

