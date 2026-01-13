/**
 * @fileoverview Constants for HTML element tags used throughout the application
 * @author ValentimSts
 * @since 0.0.0
 */

/**
 * HTML element tag constants
 * @namespace HTML_ELEMENTS
 * @description Centralized collection of HTML element tags to avoid magic strings
 * and ensure consistency across the application
 * NOTE: this is kind of useless, but why not.
 * @readonly
 * @example
 * // Usage in component
 * import { HTML_ELEMENTS } from './constants/elements.js';
 * const nav = document.createElement(HTML_ELEMENTS.NAVIGATION);
 */
export const HTML_ELEMENTS = {
    CONTAINER: 'div',
    SECTION: 'section',
    HEADER: 'header',
    FOOTER: 'footer',
    NAVIGATION: 'nav',
    PARAGRAPH: 'p',
    HEADING_1: 'h1',
    HEADING_2: 'h2',
    HEADING_3: 'h3',
    LINK: 'a',
    LIST_ITEM: 'li',
    UNORDERED_LIST: 'ul',
};
