/**
 * @fileoverview Settings menu component for the portfolio website
 * @author ValentimSts
 * @since 0.0.0
 */

import { HTML_ELEMENTS } from '../../constants/elements.js';
import { CLASSES } from '../../constants/classes.js';
import { IDs } from '../../constants/ids.js';
import { createToggleSwitch } from '../toggle-switch/toggle-switch.js';
import { createHamburgerButton, setHamburgerExpanded } from '../hamburger-button/hamburger-button.js';

/**
 * Configuration for the settings menu
 * @constant {Object} SETTINGS_MENU_CONFIG
 * @property {string} width - The width of the settings menu (CSS value)
 */
const SETTINGS_MENU_CONFIG = {
  width: '25%'
};

/**
 * State management for the settings menu
 * @type {Object}
 */
const settingsMenuState = {
  isOpen: false,
  menuElement: null,
  overlayElement: null,
  buttonElement: null
};

/**
 * Creates the overlay element for blur effect
 * @function createOverlay
 * @returns {HTMLDivElement} The overlay element
 */
function createOverlay() {
  const overlay = document.createElement(HTML_ELEMENTS.CONTAINER);
  overlay.className = CLASSES.SETTINGS_OVERLAY;
  overlay.id = IDs.SETTINGS_OVERLAY;
  
  overlay.addEventListener('click', closeSettingsMenu);

  return overlay;
}

/**
 * Creates the close button for the settings menu
 * @function createCloseButton
 * @returns {HTMLButtonElement} The close button element
 */
function createCloseButton() {
  const button = document.createElement('button');
  button.className = CLASSES.SETTINGS_MENU_CLOSE;
  button.setAttribute('aria-label', 'Close settings menu');

  const icon = document.createElement('span');
  icon.className = CLASSES.SETTINGS_MENU_CLOSE_ICON;
  button.appendChild(icon);

  button.addEventListener('click', closeSettingsMenu);

  return button;
}

/**
 * Creates the settings menu header
 * @function createSettingsHeader
 * @returns {HTMLDivElement} The header element
 */
function createSettingsHeader() {
  const header = document.createElement(HTML_ELEMENTS.CONTAINER);
  header.className = CLASSES.SETTINGS_MENU_HEADER;

  const title = document.createElement(HTML_ELEMENTS.HEADING_2);
  title.className = CLASSES.SETTINGS_MENU_TITLE;
  title.textContent = 'Settings';

  const closeButton = createCloseButton();

  header.appendChild(title);
  header.appendChild(closeButton);

  return header;
}

/**
 * State for blueprint debug mode
 * @type {Object}
 */
const blueprintState = {
  isEnabled: true
};

/**
 * Creates a settings item row with label and control
 * @function createSettingsItem
 * @param {string} labelText - The label text for the setting
 * @param {HTMLElement} control - The control element (e.g., toggle switch)
 * @returns {HTMLDivElement} The settings item element
 */
function createSettingsItem(labelText, control) {
  const item = document.createElement(HTML_ELEMENTS.CONTAINER);
  item.className = CLASSES.SETTINGS_ITEM;

  const label = document.createElement(HTML_ELEMENTS.PARAGRAPH);
  label.className = CLASSES.SETTINGS_ITEM_LABEL;
  label.textContent = labelText;

  item.appendChild(label);
  item.appendChild(control);

  return item;
}

/**
 * Handles blueprint toggle change
 * @function handleBlueprintToggle
 * @param {boolean} enabled - Whether blueprint borders should be enabled
 */
function handleBlueprintToggle(enabled) {
  blueprintState.isEnabled = enabled;
  
  if (enabled) {
    document.body.classList.remove(CLASSES.BLUEPRINT_HIDDEN);
  } else {
    document.body.classList.add(CLASSES.BLUEPRINT_HIDDEN);
  }

  // Save preference to localStorage
  localStorage.setItem('blueprintEnabled', JSON.stringify(enabled));
}

/**
 * Initializes blueprint state from localStorage
 * @function initBlueprintState
 */
function initBlueprintState() {
  const saved = localStorage.getItem('blueprintEnabled');
  if (saved !== null) {
    blueprintState.isEnabled = JSON.parse(saved);
    if (!blueprintState.isEnabled) {
      document.body.classList.add(CLASSES.BLUEPRINT_HIDDEN);
    }
  }
}

/**
 * Creates the settings menu content area
 * @function createSettingsContent
 * @returns {HTMLDivElement} The content container element
 */
function createSettingsContent() {
  const content = document.createElement(HTML_ELEMENTS.CONTAINER);
  content.className = CLASSES.SETTINGS_MENU_CONTENT;
  
  // Blueprint toggle
  const blueprintToggle = createToggleSwitch({
    id: 'blueprint-toggle',
    checked: blueprintState.isEnabled,
    onChange: handleBlueprintToggle,
    ariaLabel: 'Toggle blueprint borders visibility'
  });
  const blueprintItem = createSettingsItem('Show Blueprint Borders', blueprintToggle);
  content.appendChild(blueprintItem);

  return content;
}

/**
 * Creates the settings menu panel
 * @function createSettingsMenu
 * @returns {HTMLDivElement} The settings menu element
 */
function createSettingsMenuPanel() {
  const menu = document.createElement(HTML_ELEMENTS.CONTAINER);
  menu.className = CLASSES.SETTINGS_MENU;
  menu.id = IDs.SETTINGS_MENU;
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-modal', 'true');
  menu.setAttribute('aria-labelledby', 'settings-title');

  // Apply configurable width
  menu.style.setProperty('--settings-menu-width', SETTINGS_MENU_CONFIG.width);

  const header = createSettingsHeader();
  const content = createSettingsContent();

  // Set ID for aria-labelledby
  header.querySelector(`.${CLASSES.SETTINGS_MENU_TITLE}`).id = 'settings-title';

  menu.appendChild(header);
  menu.appendChild(content);

  return menu;
}

/**
 * Opens the settings menu
 * @function openSettingsMenu
 */
export function openSettingsMenu() {
  if (settingsMenuState.isOpen) return;

  settingsMenuState.isOpen = true;
  
  if (settingsMenuState.menuElement) {
    settingsMenuState.menuElement.classList.add(CLASSES.SETTINGS_MENU_OPEN);
  }
  
  if (settingsMenuState.overlayElement) {
    settingsMenuState.overlayElement.classList.add(CLASSES.SETTINGS_OVERLAY_VISIBLE);
  }

  setHamburgerExpanded(settingsMenuState.buttonElement, true);

  // Prevent body scroll when menu is open
  // Add padding to compensate for scrollbar width to prevent content shift
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.overflow = 'hidden';

  // Also compensate fixed elements (navbar)
  const navbar = document.getElementById(IDs.NAVBAR);
  if (navbar) {
    navbar.style.paddingRight = `calc(2rem + ${scrollbarWidth}px)`;
  }

  // Add escape key listener
  document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Closes the settings menu
 * @function closeSettingsMenu
 */
export function closeSettingsMenu() {
  if (!settingsMenuState.isOpen) return;

  settingsMenuState.isOpen = false;
  
  if (settingsMenuState.menuElement) {
    settingsMenuState.menuElement.classList.remove(CLASSES.SETTINGS_MENU_OPEN);
  }
  
  if (settingsMenuState.overlayElement) {
    settingsMenuState.overlayElement.classList.remove(CLASSES.SETTINGS_OVERLAY_VISIBLE);
  }

  setHamburgerExpanded(settingsMenuState.buttonElement, false);

  // Restore body scroll and remove padding compensation
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';

  // Remove navbar padding compensation
  const navbar = document.getElementById(IDs.NAVBAR);
  if (navbar) {
    navbar.style.paddingRight = '';
  }

  // Remove escape key listener
  document.removeEventListener('keydown', handleEscapeKey);
}

/**
 * Toggles the settings menu open/closed state
 * @function toggleSettingsMenu
 */
export function toggleSettingsMenu() {
  if (settingsMenuState.isOpen) {
    closeSettingsMenu();
  } else {
    openSettingsMenu();
  }
}

/**
 * Handles escape key press to close the menu
 * @function handleEscapeKey
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeSettingsMenu();
  }
}

/**
 * Updates the settings menu width
 * @function setSettingsMenuWidth
 * @param {string} width - The new width (CSS value, e.g., '25%', '300px')
 */
export function setSettingsMenuWidth(width) {
  SETTINGS_MENU_CONFIG.width = width;
  
  if (settingsMenuState.menuElement) {
    settingsMenuState.menuElement.style.setProperty('--settings-menu-width', width);
  }
}

/**
 * Gets the current settings menu width
 * @function getSettingsMenuWidth
 * @returns {string} The current width value
 */
export function getSettingsMenuWidth() {
  return SETTINGS_MENU_CONFIG.width;
}

/**
 * Checks if the settings menu is currently open
 * @function isSettingsMenuOpen
 * @returns {boolean} True if the menu is open
 */
export function isSettingsMenuOpen() {
  return settingsMenuState.isOpen;
}

/**
 * Initializes the settings menu component
 * @function initSettingsMenu
 * @param {HTMLElement} navbarElement - The navbar element to append the button to
 * @description Creates and appends all settings menu elements to the DOM
 */
export function initSettingsMenu(navbarElement) {
    // Initialize blueprint state from localStorage
    initBlueprintState();

    const navbarItemList = navbarElement.querySelector(HTML_ELEMENTS.UNORDERED_LIST);
    if (navbarItemList) {
      // Add the settings button as the last item in the navbar list
        const listItem = document.createElement(HTML_ELEMENTS.LIST_ITEM);
        const button = createHamburgerButton({
          id: IDs.SETTINGS_BUTTON,
          onClick: toggleSettingsMenu,
          ariaLabel: 'Open settings menu'
        });
        settingsMenuState.buttonElement = button;
        listItem.appendChild(button);
        navbarItemList.appendChild(listItem);
    }

  // Create overlay and menu, add to body
  const overlay = createOverlay();
  const menu = createSettingsMenuPanel();
  
  settingsMenuState.overlayElement = overlay;
  settingsMenuState.menuElement = menu;

  document.body.appendChild(overlay);
  document.body.appendChild(menu);
}

/**
 * Gets the settings button element
 * @function getSettingsButton
 * @returns {HTMLButtonElement|null} The settings button element
 */
export function getSettingsButton() {
  return settingsMenuState.buttonElement;
}

/**
 * Gets the settings menu element
 * @function getSettingsMenuElement
 * @returns {HTMLDivElement|null} The settings menu element
 */
export function getSettingsMenuElement() {
  return settingsMenuState.menuElement;
}
