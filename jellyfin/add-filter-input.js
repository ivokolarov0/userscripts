// ==UserScript==
// @name         JellyFin Tag Filter Input
// @namespace    http://tampermonkey.net/
// @version      2025-11-08
// @description  try to take over the world!
// @author       You
// @match        http://localhost:8096/web/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	const addInput = () => {
		if(document.getElementById('tagFilterInput')) {
			return document.getElementById('tagFilterInput');
		}
		const filterOptions = document.querySelector('.tagFilters .filterOptions .checkboxList');
		const input = document.createElement('input');
		input.type = 'text';
		input.id = 'tagFilterInput';
		input.placeholder = 'Filter tags...';
		filterOptions.prepend(input);
		return input;
	}

	const getCheckedInputs = () => {
		return document.querySelectorAll('.emby-checkbox-label input:checked');
	}

	const createSelectedTagsString = () => {
		const checkedInputs = getCheckedInputs();
		if(document.getElementById('selectedTagsContainer')) {
			document.getElementById('selectedTagsContainer').remove();
		}
		if(checkedInputs.length === 0) return '';

		const filterOptions = document.querySelector('.tagFilters .filterOptions .checkboxList');

		const selectedTagsContainer = document.createElement('div');
		selectedTagsContainer.id = 'selectedTagsContainer';

		const buttonContainer = document.createElement('div');
		buttonContainer.classList.add('selected-tags');

		checkedInputs.forEach(input => {
			const button = document.createElement('button');
			button.textContent = input.nextElementSibling.textContent.trim();
			button.addEventListener('click', () => {
				button.remove();
				input.click();
			})
			selectedTagsContainer.appendChild(button);
		})

		filterOptions.prepend(selectedTagsContainer);
	}

	const init = () => {
		const input = addInput();

		input.addEventListener('input', function() {
			const filter = input.value.toLowerCase();
			const checkboxes = document.querySelectorAll('.tagFilters .filterOptions .emby-checkbox-label');
			checkboxes.forEach(label => {
				const tagText = label.querySelector('.checkboxLabel').textContent.toLowerCase();
				label.style.display = tagText.includes(filter) ? '' : 'none';
			});
		});

		createSelectedTagsString();
	}

	document.addEventListener('click', function(event) {
		if (event.target && event.target.closest('.tagFilters')) {
			init();
		}
	});

})();