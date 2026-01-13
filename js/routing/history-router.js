/**
 * @fileoverview History API-based router extending BaseRouter for clean URL navigation
 * @author ValentimSts
 * @since 0.0.0
 */

import { BaseRouter, ROUTER_TYPE } from './base-router.js';
import { Route } from './route.js';

/**
 * History API Router class extending BaseRouter
 * @class HistoryRouter
 * @extends BaseRouter
 * @description Manages single page application routing using the History API
 * for clean URLs without hash fragments. Supports dynamic routes with parameters.
 * @example
 * const router = new HistoryRouter();
 * router.addRoute('/home', () => createHomePage(), 'Home - My Portfolio');
 * router.addRoute('/projects/:id', ({ id }) => createProjectPage(id), 'Project');
 * router.init();
 */
export class HistoryRouter extends BaseRouter {
  /**
   * Creates a new HistoryRouter instance
   * @constructor
   */
  constructor() {
    super(ROUTER_TYPE.HISTORY);

    // Bind event handlers
    this._handlePopState = this._handlePopState.bind(this);
    this._handleLinkClick = this._handleLinkClick.bind(this);
  }

  /**
   * Add a route to the router with dynamic route support
   * @override
   * @param {string} path - The route path (e.g., '/home', '/projects/:id')
   * @param {Function} component - Function that returns the page component
   * @param {string} title - Page title for document.title
   * @returns {HistoryRouter} Router instance for method chaining
   * @example
   * // Static route
   * router.addRoute('/home', () => createHomePage(), 'Home');
   * 
   * // Dynamic route with parameter
   * router.addRoute('/projects/:id', ({ id }) => createProjectPage(id), 'Project');
   */
  addRoute(path, component, title) {
    const route = new Route(path, component, title, this._pathToRegex(path));    
    this.routes.set(path, route);
    return this;
  }

  /**
   * Navigate to a specific route programmatically
   * @override
   * @param {string} path - The path to navigate to
   * @param {Object} [options] - Navigation options
   * @param {boolean} [options.replace=false] - Replace current history entry instead of pushing
   * @param {Object} [options.state] - State object to associate with the history entry
   * @example
   * // Navigate to home page
   * router.navigate('/home');
   * 
   * // Replace current history entry
   * router.navigate('/login', { replace: true });
   * 
   * // Navigate with state
   * router.navigate('/projects/123', { state: { fromList: true } });
   */
  navigate(path, options = {}) {
    const { replace = false, state = null } = options;
    
    if (replace) {
      history.replaceState(state, '', path);
    } else {
      history.pushState(state, '', path);
    }
    
    this.render();
  }

  /**
   * Go back in history
   * @example
   * router.back();
   */
  back() {
    history.back();
  }

  /**
   * Go forward in history
   * @example
   * router.forward();
   */
  forward() {
    history.forward();
  }

  /**
   * Get current route information with History API-specific data
   * @override
   * @returns { Route } Current route
   * @example
   * const { path, params, query } = router.getCurrentRoute();
   * console.log(`Current path: ${path}`);
   * console.log('Params:', params);
   * console.log('Query:', query);
   */
  getCurrentRoute() {
    const currentPath = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const query = Object.fromEntries(searchParams);
    
    // Find matching route and extract parameters
    const { route, params } = this._findMatchingRoute(currentPath);
    
    return {
      path: currentPath,
      params: params || {},
      query,
      route: route?.path || null
    };
  }

  /**
   * Start listening for History API events
   * @protected
   * @override
   */
  _startListening() {
    window.addEventListener('popstate', this._handlePopState);
    document.addEventListener('click', this._handleLinkClick);
  }

  /**
   * Stop listening for History API events
   * @protected
   * @override
   */
  _stopListening() {
    window.removeEventListener('popstate', this._handlePopState);
    document.removeEventListener('click', this._handleLinkClick);
  }

  /**
   * Get the current path from the URL pathname
   * @protected
   * @override
   * @returns {string} Current pathname
   */
  _getCurrentPath() {
    return window.location.pathname;
  }

  /**
   * Navigate to a specific path using History API
   * @protected
   * @override
   * @param {string} path - Path to navigate to
   * @param {Object} [options] - Navigation options
   */
  _navigateToPath(path, options = {}) {
    this.navigate(path, options);
  }

  /**
   * Find a route that matches the current path (with dynamic route support)
   * @protected
   * @override
   * @param {string} path - Current path to match
   * @returns {Object} Matching route and extracted parameters
   */
  _findMatchingRoute(path) {
    for (const [routePath, routeConfig] of this.routes) {
      const match = path.match(routeConfig.pattern);
      
      if (match) {
        const paramNames = this._extractParamNames(routePath);
        const params = {};
        
        // Extract parameter values from the match
        paramNames.forEach((paramName, index) => {
          params[paramName] = match[index + 1];
        });
        
        return { route: routeConfig, params };
      }
    }
    
    return { route: null, params: null };
  }

  /**
   * Convert a path pattern to a regular expression
   * @private
   * @param {string} path - Path pattern with optional parameters
   * @returns {RegExp} Compiled regular expression
   * @example
   * // '/users/:id' becomes /^\/users\/([^\/]+)$/
   * // '/posts/:category/:slug' becomes /^\/posts\/([^\/]+)\/([^\/]+)$/
   */
  _pathToRegex(path) {
    // Escape special regex characters except for parameter placeholders
    const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Replace parameter placeholders with capture groups
    const regexPattern = escapedPath.replace(/\\:([^\/\\]+)/g, '([^/]+)');
    
    return new RegExp(`^${regexPattern}$`);
  }

  /**
   * Extract parameter names from a path pattern
   * @private
   * @param {string} path - Path pattern with parameters
   * @returns {string[]} Array of parameter names
   * @example
   * // '/users/:id/posts/:slug' returns ['id', 'slug']
   */
  _extractParamNames(path) {
    const matches = path.match(/:([^\/]+)/g);
    return matches ? matches.map(match => match.slice(1)) : [];
  }

  /**
   * Handle browser back/forward navigation
   * @private
   * @param {PopStateEvent} event - PopState event
   */
  _handlePopState(event) {
    this.render();
  }

  /**
   * Handle link clicks for client-side navigation
   * @private
   * @param {MouseEvent} event - Click event
   */
  _handleLinkClick(event) {
    const link = event.target.closest('a');
    
    // Only handle internal links
    if (!link || 
        link.hostname !== window.location.hostname ||
        link.getAttribute('target') === '_blank' ||
        event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    event.preventDefault();
    const path = link.getAttribute('href');
    
    if (path && path !== window.location.pathname) {
      this.navigate(path);
    }
  }
}

/**
 * Route configuration constants for History API router
 * @type {Object<string, Object>}
 * @const
 * @example
 * import { HISTORY_ROUTES } from './routing/history-router.js';
 * historyRouter.navigate(HISTORY_ROUTES.HOME.path);
 */
export const HISTORY_ROUTES = {
  HOME: { path: '/home', href: '/home', title: 'Home' },
  ABOUT: { path: '/about-me', href: '/about-me', title: 'About Me' },
  PROJECTS: { path: '/projects', href: '/projects', title: 'Projects' },
  MISC: { path: '/misc', href: '/misc', title: 'Misc' },
  NOT_FOUND: { path: '/not-found', href: '/not-found', title: 'Page Not Found' },
  
  // Dynamic route examples
  PROJECT_DETAIL: { path: '/projects/:id', href: '/projects', title: 'Project Details' },
  USER_PROFILE: { path: '/users/:userId', href: '/users', title: 'User Profile' },
};

/**
 * Array of navigation routes for History API (excludes not-found and dynamic routes)
 * @type {Object[]}
 * @const
 */
export const HISTORY_NAVIGATION_ROUTES = [
  HISTORY_ROUTES.HOME,
  HISTORY_ROUTES.ABOUT,
  HISTORY_ROUTES.PROJECTS,
  HISTORY_ROUTES.MISC
];

/**
 * Array of all history routes for iteration
 * @type {Object[]}
 * @const
 */
export const HISTORY_ROUTES_ARRAY = Object.values(HISTORY_ROUTES).filter(
  route => !route.path.includes(':') // Exclude dynamic routes from general iteration
);

/**
 * Global history router instance
 * @type {HistoryRouter}
 * @example
 * import { historyRouter } from './routing/history-router.js';
 * historyRouter.addRoute('/home', createHomePage, 'Home');
 * historyRouter.init();
 */
export const historyRouter = new HistoryRouter();
