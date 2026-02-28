/**
 * @fileoverview Settings button component for the portfolio website
 * @author ValentimSts
 * @since 0.0.0
 */

import { CLASSES } from '../../constants/classes.js';

/**
 * Creates a settings button element using the settings icon SVG
 * @function createSettingsButton
 * @param {Object} options - Configuration options for the settings button
 * @param {string} [options.id] - The unique ID for the button
 * @param {Function} [options.onClick] - Callback function when button is clicked
 * @param {string} [options.ariaLabel='Open menu'] - Accessible label for the button
 * @param {string} [options.className] - Additional CSS class(es) to add
 * @returns {HTMLButtonElement} The settings button element
 * @example
 * const menuButton = createSettingsButton({
 *   id: 'menu-toggle',
 *   onClick: () => toggleMenu(),
 *   ariaLabel: 'Toggle navigation menu'
 * });
 */
export function createSettingsButton({ 
  id, 
  onClick, 
  ariaLabel = 'Open menu', 
  className
} = {}) {
  const button = document.createElement('button');
  button.className = CLASSES.SETTINGS_BUTTON;
  
  if (className) {
    button.classList.add(...className.split(' '));
  }
  
  button.setAttribute('aria-label', ariaLabel);
  button.setAttribute('aria-expanded', 'false');
  
  if (id) {
    button.id = id;
  }

  // Create icon using the settings SVG
  const icon = document.createElement('img');
  icon.src = 'assets/icons/orange-slice.svg';
  icon.alt = '';
  icon.className = CLASSES.SETTINGS_BUTTON_ICON;
  icon.setAttribute('aria-hidden', 'true');
  button.appendChild(icon);

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}

/**
 * Sets the aria-expanded attribute on a settings button
 * @function setSettingsButtonExpanded
 * @param {HTMLButtonElement} button - The settings button element
 * @param {boolean} expanded - Whether the button controls an expanded element
 */
export function setSettingsButtonExpanded(button, expanded) {
  if (button) {
    button.setAttribute('aria-expanded', String(expanded));
  }
}

/**
 * Gets the expanded state of a settings button
 * @function isSettingsButtonExpanded
 * @param {HTMLButtonElement} button - The settings button element
 * @returns {boolean} Whether the button is expanded
 */
export function isSettingsButtonExpanded(button) {
  return button?.getAttribute('aria-expanded') === 'true';
}
