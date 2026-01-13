/**
 * @fileoverview Home page component
 * @author ValentimSts
 * @since 0.0.0
 */

import { HISTORY_ROUTES } from '../../routing/history-router.js';

/**
 * Creates the home page component
 * @function createHomePage
 * @returns {HTMLElement} The home page element
 * @example
 * const homePage = createHomePage();
 * document.getElementById('app').appendChild(homePage);
 */
export function createHomePage() {
  const page = document.createElement('div');
  page.className = 'page home-page';
  
  const hero = document.createElement('section');
  hero.className = 'hero';
  
  const title = document.createElement('h1');
  title.textContent = 'Welcome to My Portfolio';
  
  const subtitle = document.createElement('p');
  subtitle.textContent = 'I\'m a passionate developer creating amazing digital experiences.';
  
  const cta = document.createElement('a');
  // Use HISTORY_ROUTES configuration for clean URLs
  cta.href = HISTORY_ROUTES.PROJECTS.href;
  cta.textContent = 'View My Work';
  cta.className = 'cta-button';
  
  hero.appendChild(title);
  hero.appendChild(subtitle);
  hero.appendChild(cta);
  page.appendChild(hero);
  
  return page;
}
