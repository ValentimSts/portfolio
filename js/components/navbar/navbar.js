/**
 * @fileoverview Navigation bar component for the portfolio website
 * @author ValentimSts
 * @since 0.0.0
 */

import { ROUTER_TYPE } from '../../routing/index.js'; 
import { HTML_ELEMENTS } from '../../constants/elements.js';
import { HASH_NAVIGATION_ROUTES } from '../../routing/hash-router.js';
import { HISTORY_NAVIGATION_ROUTES } from '../../routing/history-router.js';
import { CLASSES } from '../../constants/classes.js';

/**
 * Configuration for the navbar circle indicator
 * @constant {Object} CIRCLE_CONFIG
 * @property {number} radius - The radius of the circle in pixels
 * @property {number} thickness - The stroke thickness of the circle in pixels
 */
const CIRCLE_CONFIG = {
  radius: 150,
  thickness: 3
};

/**
 * Creates an SVG circle indicator element
 * @function createCircleIndicator
 * @returns {SVGElement} An SVG element containing the circle indicator
 */
function createCircleIndicator() {
  const { radius, thickness } = CIRCLE_CONFIG;
  const size = (radius + thickness) * 2;
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'navbar-circle-indicator');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', size / 2);
  circle.setAttribute('cy', size / 2);
  circle.setAttribute('r', radius);
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', 'var(--color-bg)');
  circle.setAttribute('stroke-width', thickness);
  
  svg.appendChild(circle);
  return svg;
}

/**
 * Moves the circle indicator to center on the given link element
 * @function moveCircleToLink
 * @param {SVGElement} circle - The circle indicator SVG element
 * @param {HTMLElement} link - The link element to center on
 * @param {HTMLElement} navBar - The navbar container element
 */
function moveCircleToLink(circle, link, navBar) {
  const linkRect = link.getBoundingClientRect();
  const navRect = navBar.getBoundingClientRect();
  
  const { radius, thickness } = CIRCLE_CONFIG;
  const circleSize = (radius + thickness) * 2;
  
  // Calculate center position of the link relative to the navbar
  const centerX = linkRect.left - navRect.left + linkRect.width / 2;
  const centerY = linkRect.top - navRect.top + linkRect.height / 2;
  
  // Position circle so its center aligns with link center
  circle.style.left = `${centerX - circleSize / 2}px`;
  circle.style.top = `${centerY - circleSize / 2}px`;
}

/**
 * Gets the currently active link based on the URL
 * @function getActiveLink
 * @param {NodeList} links - All navigation links
 * @returns {HTMLElement|null} The active link element or null
 */
function getActiveLink(links) {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  for (const link of links) {
    const href = link.getAttribute('href');
    // Check for both history and hash routing just in case
    if (href === currentPath || href === currentHash || 
        (currentPath === '/' && (href === '/' || href === '#home' || href === '#'))) {
      return link;
    }
  }
  return links[0] || null;
}

/**
 * Sets up the circle indicator and its event listeners
 * @function setupCircleIndicator
 * @param {HTMLElement} navBar - The navbar element
 * @param {NodeListOf<HTMLElement>} links - All navigation link elements
 */
function setupCircleIndicator(navBar, links) {
  const circle = createCircleIndicator();
  navBar.style.position = 'relative';
  navBar.appendChild(circle);
  
  // Function to update circle position
  const updateCirclePosition = () => {
    const activeLink = getActiveLink(links);
    if (activeLink) {
      moveCircleToLink(circle, activeLink, navBar);
    }
  };
  
  // Initial positioning after a brief delay to ensure layout is complete
  requestAnimationFrame(() => {
    requestAnimationFrame(updateCirclePosition);
  });
  
  // Update on click
  links.forEach(link => {
    link.addEventListener('click', () => {
      moveCircleToLink(circle, link, navBar);
    });
  });
  
  // Update on navigation events (for browser back/forward)
  window.addEventListener('popstate', updateCirclePosition);
  
  // Update on programmatic navigation (e.g., buttons, links outside navbar)
  window.addEventListener('pagechange', updateCirclePosition);
  
  // Update on resize
  window.addEventListener('resize', updateCirclePosition);
}

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

  // Section used for the links - left side of the navbar.
  // const listSection = document.createElement(HTML_ELEMENTS.SECTION);
  // listSection.className = CLASSES.NAVBAR_LINK_SECTION;

  // listSection.appendChild(list);

  // Section used for the buttons (currently only settings) - right side of the navbar.
  // const buttonSection = document.createElement(HTML_ELEMENTS.SECTION);
  // buttonSection.className = CLASSES.NAVBAR_BUTTON_SECTION;

  navBar.appendChild(list);
  // navBar.appendChild(buttonSection);
  
  // Setup circle indicator after navbar is created
  requestAnimationFrame(() => {
    const links = navBar.querySelectorAll(HTML_ELEMENTS.LINK);
    setupCircleIndicator(navBar, links);
  });
  
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
  
  // Setup circle indicator after navbar is created
  requestAnimationFrame(() => {
    const links = navBar.querySelectorAll(HTML_ELEMENTS.LINK);
    setupCircleIndicator(navBar, links);
  });
  
  return navBar;
}

/**
 * Updates the circle indicator configuration
 * @function setCircleConfig
 * @param {Object} config - Configuration object
 * @param {number} [config.radius] - The radius of the circle in pixels
 * @param {number} [config.thickness] - The stroke thickness in pixels
 */
export function setCircleConfig({ radius, thickness }) {
  if (radius !== undefined) CIRCLE_CONFIG.radius = radius;
  if (thickness !== undefined) CIRCLE_CONFIG.thickness = thickness;
}