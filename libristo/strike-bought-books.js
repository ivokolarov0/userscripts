// ==UserScript==
// @name         Libristo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.libristo.bg/bg/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=libristo.bg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var titles = [

    ];

    const targetNode = document.querySelector('#product-list');
    const config = { childList: true, subtree: true };
    const callback = () => {
        titles.map(item => {
            const headings = document.evaluate(`//a[text()="${item}"]`, document, null, XPathResult.ANY_TYPE, null );
            const thisHeading = headings.iterateNext();
            if(thisHeading) {
                const parent = thisHeading.closest('.c-product-preview');
                if(!parent.classList.contains('have-it')) {
                    parent.classList.add('have-it');
                    parent.style.position = 'relative';
                    parent.style.overflow = 'hidden';
                    parent.insertAdjacentHTML('afterbegin', '<span style="position: absolute; top: 0; left: 0; width: 250%; height: 2px; background: red; rotate: 62.5deg; transform-origin: 0 0; z-index: 10"></span>')
                    parent.insertAdjacentHTML('afterbegin', '<span style="position: absolute; top: 0; right: 0; width: 250%; height: 2px; background: red; rotate: -62.5deg; transform-origin: 100% 0; z-index: 10"></span>')
                }
            }
        })
    };
    const ob = new MutationObserver(callback);
    ob.observe(targetNode, config);
    callback();
})();
