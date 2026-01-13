/**
 * @fileoverview Hash-based router extending BaseRouter for universal browser compatibility
 * @author ValentimSts
 * @since 0.0.0
 */

import { BaseRouter, ROUTER_TYPE } from './base-router.js';
import { Route } from './route.js';

/**
 * Hash-based Router class extending BaseRouter
 * @class HashRouter
 * @extends BaseRouter
 * @description Manages single page application routing using hash fragments in the URL.
 * Provides universal browser compatibility and requires no server configuration.
 * @example
 * const router = new HashRouter();
 * router.addRoute('home', () => createHomePage(), 'Home - My Portfolio');
 * router.init();
 */
export class HashRouter extends BaseRouter {
  /**
   * Creates a new HashRouter instance
   * @constructor
   */
  constructor() {
    super(ROUTER_TYPE.HASH);

    // Bind event handlers
    this._handleHashChange = this._handleHashChange.bind(this);
  }

  /**
   * Add a route to the router
   * @override
   * @param {string} path - The route path (e.g., 'home', 'about-me')
   * @param {Function} component - Function that returns the page component
   * @param {string} title - Page title for document.title
   * @returns {HashRouter} Router instance for method chaining
   */
  addRoute(path, component, title) {
    const route = new Route(path, component, title);
    this.routes.set(path, route);
    return this;
  }

  /**
   * Navigate to a specific route using hash
   * @param {string} path - The route path to navigate to
   * @param {Object} [options] - Navigation options
   * @param {boolean} [options.replace=false] - Replace current history entry
   * @example
   * router.navigate('home');
   * router.navigate('about-me', { replace: true });
   */
  navigate(path, options = {}) {
    const { replace = false } = options;
    const hash = `#${path}`;
    
    if (replace) {
      window.location.replace(hash);
    } else {
      window.location.hash = hash;
    }
  }

  /**
   * Go back in browser history
   * @example
   * router.back();
   */
  back() {
    window.history.back();
  }

  /**
   * Go forward in browser history
   * @example
   * router.forward();
   */
  forward() {
    window.history.forward();
  }

  /**
   * Get current route information with hash-specific data
   * @returns {Object} Current route info with hash data
   * @example
   * const { path, hash, params, route } = router.getCurrentRoute();
   */
  getCurrentRoute() {
    const baseInfo = super.getCurrentRoute();
    return {
      ...baseInfo,
      hash: window.location.hash
    };
  }

  /**
   * Start listening for hash change events
   * @protected
   * @override
   */
  _startListening() {
    window.addEventListener('hashchange', this._handleHashChange);
    
    // Also listen for page load in case there's already a hash
    window.addEventListener('load', this._handleHashChange);
  }

  /**
   * Stop listening for hash change events
   * @protected
   * @override
   */
  _stopListening() {
    window.removeEventListener('hashchange', this._handleHashChange);
    window.removeEventListener('load', this._handleHashChange);
  }

  /**
   * Get the current path from the hash fragment
   * @protected
   * @override
   * @returns {string} Current path from hash
   */
  _getCurrentPath() {
    const hash = window.location.hash;
    // Remove the # character and return the path
    return hash.slice(1) || '';
  }

  /**
   * Navigate to a specific path using hash
   * @protected
   * @override
   * @param {string} path - Path to navigate to
   * @param {Object} [options] - Navigation options
   */
  _navigateToPath(path, options = {}) {
    this.navigate(path, options);
  }

  /**
   * Check if the current path is the root path for hash routing
   * @protected
   * @override
   * @param {string} path - Path to check
   * @returns {boolean} True if root path
   */
  _isRootPath(path) {
    return path === '' || path === '#' || path === '/';
  }

  /**
   * Handle hash change events
   * @private
   * @param {HashChangeEvent} event - Hash change event
   */
  _handleHashChange(event) {
    this.render();
  }
}

/**
 * Route configuration constants for Hash router
 * @type {Object<string, Object>}
 * @const
 * @example
 * import { HASH_ROUTES } from './routing/hash-router.js';
 * router.navigate(HASH_ROUTES.HOME.path);
 */
export const HASH_ROUTES = {
  HOME: { path: 'home', href: '#home', title: 'Home' },
  ABOUT: { path: 'about-me', href: '#about-me', title: 'About Me' },
  PROJECTS: { path: 'projects', href: '#projects', title: 'Projects' },
  MISC: { path: 'misc', href: '#misc', title: 'Misc' },
  NOT_FOUND: { path: 'not-found', href: '#not-found', title: 'Page Not Found' },
};

/**
 * Array of navigation routes for Hash router (excludes not-found)
 * @type {Object[]}
 * @const
 */
export const HASH_NAVIGATION_ROUTES = [
  HASH_ROUTES.HOME,
  HASH_ROUTES.ABOUT,
  HASH_ROUTES.PROJECTS,
  HASH_ROUTES.MISC
];

/**
 * Array of all hash routes for iteration
 * @type {Object[]}
 * @const
 */
export const HASH_ROUTES_ARRAY = Object.values(HASH_ROUTES);

/**
 * Global hash router instance
 * @type {HashRouter}
 * @example
 * import { hashRouter } from './routing/hash-router.js';
 * hashRouter.addRoute('home', createHomePage, 'Home');
 * hashRouter.init();
 */
export const hashRouter = new HashRouter();
