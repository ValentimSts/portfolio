/**
 * @fileoverview Base Router class providing common routing functionality
 * @author ValentimSts
 * @since 0.0.0
 */

import { Route } from './route.js';
import { IDs } from '../constants/ids.js';

/**
 * Router type object
 * @typedef {Object} RouterType
 * @property {string} name - The name of the router
 * @property {string} version - The version of the router
 */

export const ROUTER_TYPE = {
  /** @type {RouterType} Base Router type */
  BASE: {
    name: 'BaseRouter',
    version: '0.0.0'
  },

  /** @type {RouterType} Hash Router type */
  HASH: {
    name: 'HashRouter',
    version: '0.0.0'
  },
  
  /** @type {RouterType} History Router type */
  HISTORY: {
    name: 'HistoryRouter',
    version: '0.0.0'
  }
};

/**
 * Navigation event details object
 * @typedef {Object} NavigationEvent
 * @property {string} from - Previous route path
 * @property {string} to - Current route path
 * @property {Object} params - Route parameters (for dynamic routes)
 */

/**
 * Abstract Base Router class providing common routing functionality
 * @abstract
 * @class BaseRouter
 * @description Provides shared functionality for different router implementations.
 * This class should be extended by specific router types (hash-based, history API, etc.)
 * @example
 * class MyRouter extends BaseRouter {
 *   // Implement abstract methods
 *   _startListening() { ... }
 *   _stopListening() { ... }
 *   _getCurrentPath() { ... }
 *   _navigateToPath(path) { ... }
 * }
 */
export class BaseRouter {
  /**
   * Creates a new BaseRouter instance
   * @constructor
   * @param {RouterType} type - The type of router
   */
  constructor(type) {
    if (this.constructor === BaseRouter) {
      throw new Error('BaseRouter is abstract and cannot be instantiated directly');
    }

    /** @type {RouterType} */
    this.routerType = ROUTER_TYPE.BASE;
    if (type && type.name && type.version) {
      this.routerType = type;
    }

    /** @type {Map<string, Route>} */
    this.routes = new Map();
    
    /** @type {string | null} */
    this.defaultRoute = null;
    
    /** @type {string | null} */
    this.notFoundRoute = null;
    
    /** @type {string} */
    this.currentPath = '';
    
    /** @type {boolean} */
    this.isInitialized = false;

    /** @type {HTMLElement | null} */
    this.appContainer = null;
  }

  /**
   * Add a route to the router
   * @param {string} path The route path
   * @param {Function} component Function that returns the page component
   * @param {string} title Page title for document.title
   * @returns {BaseRouter} Router instance for method chaining
   * @example
   * router.addRoute('home', () => createHomePage(), 'Home');
   */
  addRoute(path, component, title) {
    const route = new Route(path, component, title);
    this.routes.set(path, route);
    return this;
  }

  /**
   * Set the default route (home page)
   * @param {string} path - The default route path
   * @throws {Error} If the specified path does not exist in the routes
   * @returns {BaseRouter} Router instance for method chaining
   * @example
   * router.setDefaultRoute('home');
   */
  setDefaultRoute(path) {
    if (!this.routes.has(path)) {
      throw new Error(`Cannot set default route. There is no route with '${path}' path.`);
    }
    this.defaultRoute = path;
    return this;
  }

  /**
   * Set the not found route (404 page)
   * @param {string} path - The not found route path
   * @throws {Error} If the specified path does not exist in the routes
   * @returns {BaseRouter} Router instance for method chaining
   * @example
   * router.setNotFoundRoute('not-found');
   */
  setNotFoundRoute(path) {
    if (!this.routes.has(path)) {
      throw new Error(`Cannot set not found route. There is no route with '${path}' path.`);
    }
    this.notFoundRoute = path;
    return this;
  }

  /**
   * Initialize the router and starts listening for navigation events
   * @param {string} [containerId='app'] - ID of the container element for page content
   * @returns {BaseRouter} Router instance for method chaining
   * @example
   * router.init(); // Uses default 'app' container
   */
  init(containerId = IDs.MAIN) {
    if (this.isInitialized) {
      console.warn(`${this.routerType} router is already initialized`);
      return this;
    }

    this.appContainer = document.getElementById(containerId);
    if (!this.appContainer) {
      throw new Error(`Container element with ID '${containerId}' not found`);
    }

    this._startListening();
    this.isInitialized = true;

    // Handle initial route
    this.render();

    return this;
  }

  /**
   * Destroy the router and clean up event listeners
   * @example
   * router.destroy();
   */
  destroy() {
    if (!this.isInitialized) return;

    this._stopListening();
    this.isInitialized = false;
  }

  /**
   * Render the component for the current route
   * @public
   */
  render() {
    const currentPath = this._getCurrentPath();
    const previousPath = this.currentPath;
    this.currentPath = currentPath;

    // Find matching route
    const { route, params } = this._findMatchingRoute(currentPath);
    
    let targetRoute = route;
    let routeParams = params || {};

    // Handle not found case
    if (!targetRoute && this.notFoundRoute) {
      const notFoundRoute = this.routes.get(this.notFoundRoute);
      if (notFoundRoute) {
        targetRoute = notFoundRoute;
        routeParams = {};
      }
    }

    // Handle default route
    if (this._isRootPath(currentPath) && !targetRoute && this.defaultRoute) {
      this._navigateToPath(this.defaultRoute, { replace: true });
      return;
    }

    if (!targetRoute) {
      console.error(`No route found for path: ${currentPath}`);
      return;
    }

    try {
      // Clear current content
      this.appContainer.innerHTML = '';
      
      // Create and render new component
      const component = targetRoute.component(routeParams);
      if (component) {
        this.appContainer.appendChild(component);
      }
      
      // Update document title
      if (targetRoute.title) {
        document.title = targetRoute.title;
      }

      // Dispatch navigation event
      this._dispatchNavigationEvent(previousPath, currentPath, routeParams);
      
    } catch (error) {
      console.error('Error rendering route:', error);
      
      // Try to render not found page as fallback
      if (this.notFoundRoute && this.notFoundRoute !== targetRoute.path) {
        this._navigateToPath(this.notFoundRoute, { replace: true });
      }
    }
  }

  /**
   * Navigate to a specific route programmatically
   * @param {string} path - The path to navigate to
   * @param {Object} [options] - Navigation options
   * @returns {void}
   * @example
   * router.navigate('home');
   */
  navigate(path, options = {}) {
    this._navigateToPath(path, options);
  }

  /**
   * Get current route information
   * @returns {Object} Current route info
   * @example
   * const { path, params, route } = router.getCurrentRoute();
   */
  getCurrentRoute() {
    const currentPath = this._getCurrentPath();
    const { route, params } = this._findMatchingRoute(currentPath);
    
    return {
      path: currentPath,
      params: params || {},
      route: route?.path || null
    };
  }

  /**
   * Find a route that matches the given path
   * @protected
   * @param {string} path - Path to match
   * @returns {Object} Matching route and parameters
   */
  _findMatchingRoute(path) {
    // Base implementation - exact match only
    const route = this.routes.get(path);
    return { route: route || null, params: {} };
  }

  /**
   * Check if the current path is the root path
   * @protected
   * @param {string} path - Path to check
   * @returns {boolean} True if root path
   */
  _isRootPath(path) {
    return path === '' || path === '/';
  }

  /**
   * Dispatch a custom navigation event
   * @protected
   * @param {string} from - Previous route path
   * @param {string} to - Current route path
   * @param {Object} params - Route parameters
   */
  _dispatchNavigationEvent(from, to, params) {
    const navigationEvent = new CustomEvent('routechange', {
      detail: { 
        from, 
        to, 
        params,
        routerType: this.routerType
      }
    });
    window.dispatchEvent(navigationEvent);
  }

  
  // Abstract methods that must be implemented by subclasses

  /**
   * Start listening for navigation events (abstract method)
   * @abstract
   * @protected
   */
  _startListening() {
    throw new Error('_startListening() must be implemented by subclass');
  }

  /**
   * Stop listening for navigation events (abstract method)
   * @abstract
   * @protected
   */
  _stopListening() {
    throw new Error('_stopListening() must be implemented by subclass');
  }

  /**
   * Get the current path from the URL (abstract method)
   * @abstract
   * @protected
   * @returns {string} Current path
   */
  _getCurrentPath() {
    throw new Error('_getCurrentPath() must be implemented by subclass');
  }

  /**
   * Navigate to a specific path (abstract method)
   * @abstract
   * @protected
   * @param {string} path - Path to navigate to
   * @param {Object} [options] - Navigation options
   */
  _navigateToPath(path, options = {}) {
    throw new Error('_navigateToPath() must be implemented by subclass');
  }
}
