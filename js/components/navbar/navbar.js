/**
 * @fileoverview Navigation bar component for the portfolio application
 * @author ValentimSts
 * @since 0.0.0
 */

import { ROUTES } from '../../constants/routes.js';

/**
 * Creates a navigation bar element with links
 * @function createNavbar
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
export function createNavbar() {
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  ROUTES.forEach(route => {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.textContent = route.text;
    a.href = route.href;

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  return nav;
}
