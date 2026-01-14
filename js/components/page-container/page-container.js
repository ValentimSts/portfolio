/**
 * @fileoverview Page container component for consistent layout and padding
 * @author ValentimSts
 * @since 0.0.0
 */

import { HTML_ELEMENTS } from '../../constants/elements.js';

/**
 * CSS class names for the page container
 * @constant {Object} CONTAINER_CLASSES
 */
const CONTAINER_CLASSES = {
  CONTAINER: 'page-container'
};

/**
 * Creates a page container element with consistent padding and border
 * @function createPageContainer
 * @param {HTMLElement|HTMLElement[]} [children] - Optional child element(s) to append
 * @returns {HTMLElement} A div element with page container styling
 * @example
 * // Create empty container
 * const container = createPageContainer();
 * 
 * // Create container with single child
 * const page = document.createElement('div');
 * const container = createPageContainer(page);
 * 
 * // Create container with multiple children
 * const header = document.createElement('h1');
 * const content = document.createElement('div');
 * const container = createPageContainer([header, content]);
 */
export function createPageContainer(children) {
  const container = document.createElement(HTML_ELEMENTS.CONTAINER);
  container.className = CONTAINER_CLASSES.CONTAINER;

  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => container.appendChild(child));
    } else {
      container.appendChild(children);
    }
  }

  return container;
}

/**
 * Wraps an existing page element with the page container
 * @function wrapWithContainer
 * @param {HTMLElement} pageElement - The page element to wrap
 * @returns {HTMLElement} The page container with the page element inside
 * @example
 * const page = createHomePage();
 * const wrappedPage = wrapWithContainer(page);
 */
export function wrapWithContainer(pageElement) {
  return createPageContainer(pageElement);
}
