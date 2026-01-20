/**
 * @fileoverview Constants for CSS classes used throughout the application
 * @author ValentimSts
 * @since 0.0.0
 */

/**
 * CSS class constants
 * @namespace CLASSES
 * @description Centralized collection of CSS class names to avoid magic strings
 * and ensure consistency across the application
 * @readonly
 */
export const CLASSES = {
  // Hamburger Button
  /** @type {string} Hamburger button class */
  HAMBURGER_BUTTON: 'hamburger-button',
  /** @type {string} Hamburger button icon class */
  HAMBURGER_BUTTON_ICON: 'hamburger-button__icon',

  // Settings Overlay
  /** @type {string} Settings overlay class */
  SETTINGS_OVERLAY: 'settings-overlay',
  /** @type {string} Settings overlay visible state class */
  SETTINGS_OVERLAY_VISIBLE: 'settings-overlay--visible',

  // Settings Menu
  /** @type {string} Settings menu panel class */
  SETTINGS_MENU: 'settings-menu',
  /** @type {string} Settings menu open state class */
  SETTINGS_MENU_OPEN: 'settings-menu--open',
  /** @type {string} Settings menu header class */
  SETTINGS_MENU_HEADER: 'settings-menu__header',
  /** @type {string} Settings menu title class */
  SETTINGS_MENU_TITLE: 'settings-menu__title',
  /** @type {string} Settings menu close button class */
  SETTINGS_MENU_CLOSE: 'settings-menu__close',
  /** @type {string} Settings menu close icon class */
  SETTINGS_MENU_CLOSE_ICON: 'settings-menu__close-icon',
  /** @type {string} Settings menu content area class */
  SETTINGS_MENU_CONTENT: 'settings-menu__content',

  // Settings Items
  /** @type {string} Settings item row class */
  SETTINGS_ITEM: 'settings-item',
  /** @type {string} Settings item label class */
  SETTINGS_ITEM_LABEL: 'settings-item__label',

  // Toggle Switch
  /** @type {string} Toggle switch container class */
  TOGGLE_SWITCH: 'toggle-switch',
  /** @type {string} Toggle switch input class */
  TOGGLE_SWITCH_INPUT: 'toggle-switch__input',
  /** @type {string} Toggle switch slider class */
  TOGGLE_SWITCH_SLIDER: 'toggle-switch__slider',

  // Blueprint Debug Mode
  /** @type {string} Class to hide blueprint borders */
  BLUEPRINT_HIDDEN: 'blueprint-hidden',
};
