/**
 * @fileoverview Constants for DOM element IDs used throughout the application
 * @author ValentimSts
 * @since 0.0.0
 */

/**
 * DOM element ID constants
 * @namespace IDs
 * @description Centralized collection of DOM element IDs to avoid magic strings
 * and ensure consistency across the application
 * @readonly
 * @example
 * // Usage in component
 * import { IDs } from './constants/ids.js';
 * const navbar = document.getElementById(IDs.NAVBAR);
 */
export const IDs = {
  /** @type {string} Main application content container element ID */
  MAIN: 'app',
  
  /** @type {string} Header navigation container element ID */
  NAVBAR: 'navbar',
};
