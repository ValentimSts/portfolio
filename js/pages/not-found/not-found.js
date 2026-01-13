/**
 * @fileoverview Not Found (404) page component
 * @author ValentimSts
 * @since 0.0.0
 */

import { HASH_ROUTES } from '../../routing/hash-router.js';

/**
 * Creates the 404 not found page component
 * @function createNotFoundPage
 * @returns {HTMLElement} The not found page element
 * @example
 * const notFoundPage = createNotFoundPage();
 * document.getElementById('app').appendChild(notFoundPage);
 */
export function createNotFoundPage() {
  const page = document.createElement('div');
  page.className = 'page not-found-page';
  
  const container = document.createElement('div');
  container.className = 'not-found-container';
  
  const errorCode = document.createElement('h1');
  errorCode.className = 'error-code';
  errorCode.textContent = '404';
  
  const title = document.createElement('h2');
  title.className = 'error-title';
  title.textContent = 'Page Not Found';
  
  const description = document.createElement('p');
  description.className = 'error-description';
  description.textContent = 'Sorry, the page you are looking for doesn\'t exist or has been moved.';
  
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'error-actions';
  
  const homeButton = document.createElement('a');
  homeButton.href = HASH_ROUTES.HOME.href;
  homeButton.textContent = 'Go Home';
  homeButton.className = 'error-button primary';
  
  const backButton = document.createElement('button');
  backButton.textContent = 'Go Back';
  backButton.className = 'error-button secondary';
  backButton.onclick = () => window.history.back();
  
  actionsContainer.appendChild(homeButton);
  actionsContainer.appendChild(backButton);
  
  container.appendChild(errorCode);
  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(actionsContainer);
  
  page.appendChild(container);
  
  return page;
}
