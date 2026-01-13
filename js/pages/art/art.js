/**
 * @fileoverview Art page component
 * @author ValentimSts
 * @since 0.0.0
 */

/**
 * Creates the art page component
 * @function createArtPage
 * @returns {HTMLElement} The art page element
 * @example
 * const artPage = createArtPage();
 * document.getElementById('app').appendChild(artPage);
 */
export function createArtPage() {
  const page = document.createElement('div');
  page.className = 'page art-page';
  
  const title = document.createElement('h1');
  title.textContent = 'My Art';
  
  const description = document.createElement('p');
  description.textContent = 'A collection of my creative work and digital art pieces.';
  
  const gallery = document.createElement('div');
  gallery.className = 'art-gallery';
  
  // Placeholder for art pieces
  const placeholder = document.createElement('div');
  placeholder.className = 'art-placeholder';
  placeholder.textContent = 'Art gallery coming soon...';
  
  gallery.appendChild(placeholder);
  
  page.appendChild(title);
  page.appendChild(description);
  page.appendChild(gallery);
  
  return page;
}
