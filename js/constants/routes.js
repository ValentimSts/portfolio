/**
 * @fileoverview Portfolio routes configuration.
 * @author ValentimSts
 * @since 0.0.0
 */

/**
 * Route object definition.
 * @typedef {Object} Route
 * @property {string} text - The display text for the navigation link.
 * @property {string} href - The URL or anchor that the link points to.
 */

/**
 * Available routes.
 * @type {Route[]}
 * @const
 * @example
 * // Usage in a component
 * import { ROUTES } from './constants/routes.js';
 * ROUTES.forEach(link => console.log(link.text));
 */
export const ROUTES = [
  { text: 'Home', href: '#home' },
  { text: 'About Me', href: '#about-me' },
  { text: 'Projects', href: '#projects' },
  { text: 'Art', href: '#art' },
];