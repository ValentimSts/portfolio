/**
 * @fileoverview Main entry point for the portfolio application
 * @author ValentimSts
 * @since 0.0.0
 * @description Initializes the application with History routing and navbar
 */

import { createNavbar } from './components/navbar/navbar.js';
import { initPageBackground, updatePageBackground } from './components/page-background/page-background.js';
import { historyRouter, HISTORY_NAVIGATION_ROUTES, HISTORY_ROUTES } from './routing/history-router.js';
import { IDs } from './constants/ids.js';

// Page components
import { createHomePage } from './pages/home/home.js';
import { createAboutPage } from './pages/about/about.js';
import { createProjectsPage } from './pages/projects/projects.js';
import { createArtPage } from './pages/misc/misc.js';
import { createNotFoundPage } from './pages/not-found/not-found.js';

/**
 * Configure routes for the History router
 * @function configureRoutes
 * @param {HistoryRouter} router - The router instance to configure
 * @description Adds all application routes to the router
 */
function configureRoutes(router) {
  router
    .addRoute(HISTORY_ROUTES.HOME.path, createHomePage, HISTORY_ROUTES.HOME.title)
    .addRoute(HISTORY_ROUTES.ABOUT.path, createAboutPage, HISTORY_ROUTES.ABOUT.title)
    .addRoute(HISTORY_ROUTES.PROJECTS.path, createProjectsPage, HISTORY_ROUTES.PROJECTS.title)
    .addRoute(HISTORY_ROUTES.MISC.path, createArtPage, HISTORY_ROUTES.MISC.title)
    .addRoute(HISTORY_ROUTES.NOT_FOUND.path, createNotFoundPage, HISTORY_ROUTES.NOT_FOUND.title)
    .setDefaultRoute(HISTORY_ROUTES.HOME.path)
    .setNotFoundRoute(HISTORY_ROUTES.NOT_FOUND.path);
}

/**
 * Initialize the application
 * @function initApp
 * @description Sets up the router, configures routes, and creates the navbar
 */
function initApp() {
  // Configure routes on the router
  configureRoutes(historyRouter);
  
  // Initialize the router
  historyRouter.init();

  // Initialize page background with navigation routes
  initPageBackground(HISTORY_NAVIGATION_ROUTES);

  // Create and append navbar
  const navbarContainer = document.getElementById(IDs.NAVBAR);
  if (navbarContainer) {
    const navbar = createNavbar(HISTORY_NAVIGATION_ROUTES);
    navbarContainer.appendChild(navbar);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

