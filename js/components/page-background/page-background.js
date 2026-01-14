/**
 * @fileoverview Dynamic diagonal background component for page transitions
 * @author ValentimSts
 * @since 0.0.0
 * @description Creates a dynamic white/orange diagonal background that changes
 * based on the current page position in the navbar.
 */

/**
 * Configuration for the diagonal background effect
 * All values are in viewport height percentage (vh)
 * @constant {Object} BACKGROUND_CONFIG
 * @property {number} baseHeight - The base height where the diagonal centers (50 = middle)
 * @property {number} maxOffset - Maximum offset from baseHeight for the diagonal extremes
 * @property {number} lineThickness - Thickness of the diagonal line in pixels
 */
export const BACKGROUND_CONFIG = {
  baseHeight: 50,      // Center of the screen (vh)
  maxOffset: 25,       // Maximum deviation from center (vh)
  lineThickness: 3     // Thickness of the diagonal line (px)
};

/**
 * Stores the navigation routes for calculating page positions
 * @type {Array<Object>}
 * @private
 */
let _navigationRoutes = [];

/**
 * Reference to the background element
 * @type {HTMLElement|null}
 * @private
 */
let _backgroundElement = null;

/**
 * Initializes the page background system
 * @function initPageBackground
 * @param {Array<Object>} navigationRoutes - Array of navigation route objects
 * @description Sets up the background element and registers event listeners
 * @example
 * import { initPageBackground } from './components/page-background/page-background.js';
 * initPageBackground(HISTORY_NAVIGATION_ROUTES);
 */
export function initPageBackground(navigationRoutes) {
  _navigationRoutes = navigationRoutes;
  _createBackgroundElement();
  _updateBackground();
  
  window.addEventListener('popstate', _updateBackground);
  
  // Create a custom event listener for programmatic navigation
  window.addEventListener('pagechange', _updateBackground);
}

/**
 * Creates the background element and appends it to the body
 * @function _createBackgroundElement
 * @private
 */
function _createBackgroundElement() {
  if (_backgroundElement) return;
  
  _backgroundElement = document.createElement('div');
  _backgroundElement.className = 'page-background';
  _backgroundElement.setAttribute('aria-hidden', 'true');
  
  // Insert at the beginning of body so it's behind everything
  document.body.insertBefore(_backgroundElement, document.body.firstChild);
}

/**
 * Calculates the left and right heights for the diagonal based on page index
 * @function calculateDiagonalHeights
 * @param {number} pageIndex - Current page index (0-based)
 * @param {number} totalPages - Total number of pages in navigation
 * @returns {Object} Object containing lheight and rheight values
 * @example
 * const { lheight, rheight } = calculateDiagonalHeights(0, 4);
 * // For first page of 4: { lheight: 75, rheight: 25 }
 */
export function calculateDiagonalHeights(pageIndex, totalPages) {
  const { baseHeight, maxOffset } = BACKGROUND_CONFIG;
  
  // Handle edge case of single page
  if (totalPages <= 1) {
    return { lheight: baseHeight, rheight: baseHeight };
  }
  
  // Calculate center index (can be fractional for even number of pages)
  const centerIndex = (totalPages - 1) / 2;
  
  // Calculate normalized position from -1 to +1
  // -1 = first page, 0 = center, +1 = last page
  const normalizedPosition = (pageIndex - centerIndex) / centerIndex;
  
  // Calculate heights
  // First page (normalizedPosition = -1): lheight is high, rheight is low
  // Last page (normalizedPosition = +1): lheight is low, rheight is high
  const lheight = baseHeight + (normalizedPosition * maxOffset);
  const rheight = baseHeight - (normalizedPosition * maxOffset);
  
  return { lheight, rheight };
}

/**
 * Gets the current page index based on the URL
 * @function getCurrentPageIndex
 * @returns {number} The index of the current page in the navigation array
 * @private
 */
function _getCurrentPageIndex() {
  const currentPath = window.location.pathname;
  
  const index = _navigationRoutes.findIndex(route => {
    // Handle exact match
    if (route.path === currentPath) return true;
    // Handle root path matching home
    if (currentPath === '/' && route.path === '/') return true;
    return false;
  });
  
  // Default to first page if not found
  return index >= 0 ? index : 0;
}

/**
 * Updates the background diagonal based on current page
 * @function _updateBackground
 * @private
 */
function _updateBackground() {
  if (!_backgroundElement || _navigationRoutes.length === 0) return;
  
  const pageIndex = _getCurrentPageIndex();
  const totalPages = _navigationRoutes.length;
  const { lheight, rheight } = calculateDiagonalHeights(pageIndex, totalPages);
  
  // Apply CSS custom properties for the diagonal
  _backgroundElement.style.setProperty('--diagonal-left-height', `${lheight}vh`);
  _backgroundElement.style.setProperty('--diagonal-right-height', `${rheight}vh`);
  _backgroundElement.style.setProperty('--line-thickness', `${BACKGROUND_CONFIG.lineThickness}px`);
}

/**
 * Manually triggers a background update (useful after programmatic navigation)
 * @function updatePageBackground
 * @description Call this after using router.navigate() to update the background
 * @example
 * router.navigate('/about');
 * updatePageBackground();
 */
export function updatePageBackground() {
  _updateBackground();
}

/**
 * Updates the background configuration
 * @function setBackgroundConfig
 * @param {Object} config - Configuration object
 * @param {number} [config.baseHeight] - Base height in vh
 * @param {number} [config.maxOffset] - Maximum offset in vh
 * @param {number} [config.lineThickness] - Line thickness in pixels
 * @example
 * setBackgroundConfig({ baseHeight: 60, maxOffset: 30 });
 */
export function setBackgroundConfig({ baseHeight, maxOffset, lineThickness }) {
  if (baseHeight !== undefined) BACKGROUND_CONFIG.baseHeight = baseHeight;
  if (maxOffset !== undefined) BACKGROUND_CONFIG.maxOffset = maxOffset;
  if (lineThickness !== undefined) BACKGROUND_CONFIG.lineThickness = lineThickness;
  _updateBackground();
}

/**
 * Gets the diagonal heights for a specific page by its path
 * @function getDiagonalHeightsForPath
 * @param {string} path - The path of the page
 * @returns {Object} Object containing lheight and rheight values
 */
export function getDiagonalHeightsForPath(path) {
  const index = _navigationRoutes.findIndex(route => route.path === path);
  if (index < 0) return { lheight: BACKGROUND_CONFIG.baseHeight, rheight: BACKGROUND_CONFIG.baseHeight };
  return calculateDiagonalHeights(index, _navigationRoutes.length);
}
