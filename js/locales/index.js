/**
 * @fileoverview Localization module for managing application strings
 * @author ValentimSts
 * @since 0.0.0
 */

import { en } from './en.js';

/**
 * Available locales
 * @type {Object.<string, Object>}
 */
const locales = {
  en,
};

/**
 * Default locale
 * @type {string}
 */
const DEFAULT_LOCALE = 'en';

/**
 * Current locale
 * @type {string}
 */
let currentLocale = DEFAULT_LOCALE;

/**
 * Gets the current locale strings
 * @function getStrings
 * @returns {Object} The strings for the current locale
 */
export function getStrings() {
  return locales[currentLocale] || locales[DEFAULT_LOCALE];
}

/**
 * Sets the current locale
 * @function setLocale
 * @param {string} locale - The locale code (e.g., 'en', 'pt', 'es')
 * @returns {boolean} True if locale was set successfully
 */
export function setLocale(locale) {
  if (locales[locale]) {
    currentLocale = locale;
    return true;
  }
  console.warn(`Locale '${locale}' not found. Using default '${DEFAULT_LOCALE}'.`);
  return false;
}

/**
 * Gets the current locale code
 * @function getCurrentLocale
 * @returns {string} The current locale code
 */
export function getCurrentLocale() {
  return currentLocale;
}

/**
 * Gets available locale codes
 * @function getAvailableLocales
 * @returns {string[]} Array of available locale codes
 */
export function getAvailableLocales() {
  return Object.keys(locales);
}
