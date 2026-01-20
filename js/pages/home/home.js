/**
 * @fileoverview Home page component
 * @author ValentimSts
 * @since 0.0.0
 */

import { getStrings } from '../../locales/index.js';

/**
 * Creates the home page component
 * @function createHomePage
 * @returns {HTMLElement} The home page element
 * @example
 * const homePage = createHomePage();
 * document.getElementById('app').appendChild(homePage);
 */
export function createHomePage() {
  const strings = getStrings();
  const page = document.createElement('div');
  page.className = 'page home-page';
  
  const hero = document.createElement('section');
  hero.className = 'hero';
  
  const welcomeText = document.createElement('p');
  welcomeText.className = 'welcome-text';
  welcomeText.textContent = strings.home.welcomeText;
  
  const name = document.createElement('h1');
  name.className = 'name';
  name.textContent = strings.home.name;
  
  hero.appendChild(welcomeText);
  hero.appendChild(name);
  page.appendChild(hero);
  
  return page;
}
