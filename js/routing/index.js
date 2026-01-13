/**
 * @fileoverview Routing module exports for easy importing
 * @author ValentimSts
 * @since 0.0.0
 */

export { Route } from './route.js';

export {
  BaseRouter,
  ROUTER_TYPE
} from './base-router.js';

export { 
  HashRouter, 
  HASH_ROUTES, 
  HASH_NAVIGATION_ROUTES, 
  HASH_ROUTES_ARRAY,
  hashRouter 
} from './hash-router.js';

export { 
  HistoryRouter, 
  HISTORY_ROUTES, 
  HISTORY_NAVIGATION_ROUTES, 
  HISTORY_ROUTES_ARRAY,
  historyRouter 
} from './history-router.js';

/**
 * Router factory function to create router instances
 * @param {RouterType} type - Router type
 * @returns {BaseRouter} Router instance
 * @example
 * import { ROUTER_TYPE, createRouter } from './routing/index.js';
 *
 * const router = createRouter(ROUTER_TYPE.HASH);
 * router.addRoute('home', createHomePage, 'Home');
 * router.init();
 */
export function createRouter(type) {
  switch (type) {
    case ROUTER_TYPE.HASH:
      return new HashRouter();
    case ROUTER_TYPE.HISTORY:
      return new HistoryRouter();
    default:
      throw new Error(
        `Unknown router type: ${type}. Use
        '${ROUTER_TYPE.HASH.name}' or
        '${ROUTER_TYPE.HISTORY.name}'.`
      );
  }
}

/**
 * Get route constants for a specific router type
 * @param {RouterType} type - Router type
 * @returns {Object} Route constants object
 * @example
 * import { ROUTER_TYPE, getRoutes } from './routing/index.js';
 *
 * const routes = getRoutes(ROUTER_TYPE.HASH);
 * console.log(routes.HOME.href); // '#home'
 */
export function getRoutes(type) {
  switch (type) {
    case ROUTER_TYPE.HASH:
      return HASH_ROUTES;
    case ROUTER_TYPE.HISTORY:
      return HISTORY_ROUTES;
    default:
      throw new Error(
        `Unknown router type: ${type}. Use 
        '${ROUTER_TYPE.HASH.name}' or 
        '${ROUTER_TYPE.HISTORY.name}'.`
      );
  }
}

/**
 * Get navigation routes for a specific router type
 * @param {RouterType} type - Router type 
 * @returns {Array} Navigation routes array
 * @example
 * import { ROUTER_TYPE, getNavigationRoutes } from './routing/index.js';
 *
 * const navRoutes = getNavigationRoutes(ROUTER_TYPE.HASH);
 */
export function getNavigationRoutes(type) {
  switch (type) {
    case ROUTER_TYPE.HASH:
      return HASH_NAVIGATION_ROUTES;
    case ROUTER_TYPE.HISTORY:
      return HISTORY_NAVIGATION_ROUTES;
    default:
      throw new Error(
        `Unknown router type: ${type}. Use
        '${ROUTER_TYPE.HASH.name}' or
        '${ROUTER_TYPE.HISTORY.name}'.`
      );
  }
}
