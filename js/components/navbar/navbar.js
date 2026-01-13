/**
 * @fileoverview Navigation bar component for the portfolio website
 * @author ValentimSts
 * @since 0.0.0
 */

import { ROUTER_TYPE } from '../../routing/index.js'; 
import { HTML_ELEMENTS } from '../../constants/elements.js';
import { HASH_NAVIGATION_ROUTES } from '../../routing/hash-router.js';
import { HISTORY_NAVIGATION_ROUTES } from '../../routing/history-router.js';

/**
 * Creates a navigation bar element with links
 * @function createNavbar
 * @param {Array<Object>} navigationRoutes List of route configurations
 * @description Generates a semantic HTML navigation structure with unordered
 * list and anchor elements based on the routes configuration
 * @returns {HTMLElement} A nav element containing an unordered list of
 * navigation links
 * @example
 * // Create and append navbar to header
 * const navbar = createNavbar();
 * document.getElementById('navbar').appendChild(navbar);
 * 
 * // Generated HTML structure:
 * // <nav>
 * //   <ul>
 * //     <li><a href="#home">Home</a></li>
 * //     <li><a href="#about-me">About Me</a></li>
 * //     ...
 * //   </ul>
 * // </nav>
 */
export function createNavbar(navigationRoutes) {
  const navBar = document.createElement(HTML_ELEMENTS.NAVIGATION);
  const list = document.createElement(HTML_ELEMENTS.UNORDERED_LIST);

  navigationRoutes.forEach(route => {
    const item = document.createElement(HTML_ELEMENTS.LIST_ITEM);
    const link = document.createElement(HTML_ELEMENTS.LINK);
    link.textContent = route.title;
    link.href = route.href;
    item.appendChild(link);
    list.appendChild(item);
  });

  navBar.appendChild(list);
  return navBar;
}


/**
 * Creates a navigation bar element with links
 * @function createNavbar
 * @param {RouterType} type - The type of router (hash or history)
 * @description Generates a semantic HTML navigation structure with unordered
 * list and anchor elements based on the routes configuration
 * @returns {HTMLElement} A nav element containing an unordered list of
 * navigation links
 * @example
 * import { createNavbar } from './components/navbar/navbar.js';
 * import { ROUTER_TYPE } from './routing/index.js';
 * 
 * // Create a navbar for hash routing
 * const hashNavbar = createNavbar(ROUTER_TYPE.HASH);
 * 
 * // Create a navbar for history routing
 * const historyNavbar = createNavbar(ROUTER_TYPE.HISTORY);
 * 
 * // Generated HTML structure:
 * // <nav>
 * //   <ul>
 * //     <li><a href="#home">Home</a></li>
 * //     <li><a href="#about-me">About Me</a></li>
 * //     ...
 * //   </ul>
 * // </nav>
 */
export function createNavbarFromType(type) {
  const navigationRoutes = type === ROUTER_TYPE.HASH
    ? HASH_NAVIGATION_ROUTES
    : HISTORY_NAVIGATION_ROUTES;

  const navBar = document.createElement(HTML_ELEMENTS.NAVIGATION);
  const list = document.createElement(HTML_ELEMENTS.UNORDERED_LIST);

  navigationRoutes.forEach(route => {
    const item = document.createElement(HTML_ELEMENTS.LIST_ITEM);
    const link = document.createElement(HTML_ELEMENTS.LINK);
    link.textContent = route.title;
    link.href = route.href;
    item.appendChild(link);
    list.appendChild(item);
  });

  navBar.appendChild(list);
  return navBar;
}