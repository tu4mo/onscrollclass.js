/**
 * OnScrollClass.js v0.1.0
 * https://github.com/tu4mo/onscrollclass.js
 *
 * Copyright © 2016 tu4mo
 */

(function(window, document) {

	'use strict';

	var onScrollElements = [];

	function init() {
		onScrollElements = getElements();

		if (onScrollElements.length > 0) {
			// Fire once in case element is already in view
			checkElements();

			// Listen for scrolling
			window.addEventListener('scroll', checkElements);
		}
	}

	function getElements() {
		// Get elements with data-onscrollclass
		var elementsNodeList = document.querySelectorAll('[data-onscrollclass]');
		var elements = [];

		// Convert NodeList to array
		for (var i = elementsNodeList.length; i--; elements.unshift(elementsNodeList[i]));

		return elements;
	}

	function checkElements() {
		var onScrollElementsLength = onScrollElements.length;

		if (onScrollElementsLength > 0) {
			for (var i = onScrollElementsLength - 1; i > -1; i--) {
				var element = onScrollElements[i];
				var className = element.getAttribute('data-onscrollclass');

				if (isElementInView(element)) {
					// Add class to element
					element.classList.add(className);

					// Remove element from array
					onScrollElements.splice(i, 1);
				}
			}
		} else {
			// Remove EventListener if there are no more elements
			window.removeEventListener('scroll', scroll);
		}
	}

	function isElementInView(element) {
		var rect = element.getBoundingClientRect();

		return (
			window.pageYOffset + window.innerHeight >= rect.top + window.pageYOffset
		);
	}

	init();

})(window, document);
