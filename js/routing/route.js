/**
 * @file js/routing/route.js
 * @fileoverview Defines the Route class for managing route configurations
 * @author ValentimSts
 * @since 0.0.0
 */

/**
 * Route object representing a single route configuration
 * @class Route
 * @description Encapsulates the properties of a route including path,
 * component function, title, and optional pattern for dynamic routes.
 * @example
 * const homeRoute = new Route('home', () => createHomePage(), 'Home - My Portfolio');
 */
export class Route {
    /**
     * Creates a new Route instance
     * @param {string} path The path for the route
     * @param {Function} component The component function to render
     * @param {string} title The title of the route
     * @param {RegExp|null} pattern The pattern for dynamic routes
     */
    constructor(path, component, title, pattern = null) {
        /** @type {string} */
        this.path = path;

        /** @type {Function} */
        this.component = component;

        /** @type {string} */
        this.title = title;

        /** @type {RegExp|null} */
        this.pattern = pattern;
    }

    /**
     * Check if the route matches a given path
     * @param {string} path The path to match against
     * @returns {boolean} True if the route matches the path, false otherwise
     */
    matches(path) {
        if (this.pattern) {
            return this.pattern.test(path);
        }
        return this.path === path;
    }

    /**
     * Extract parameters from a dynamic route path
     * @param {string} path The path to extract parameters from
     * @returns {Object} An object containing the extracted parameters
     */
    extractParams(path) {
        const params = {};
        if (this.pattern) {
            const match = path.match(this.pattern);
            if (match) {
                const keys = this.path.match(/:([a-zA-Z0-9_]+)/g) || [];
                keys.forEach((key, index) => {
                    params[key.substring(1)] = match[index + 1];
                });
            }
        }
        return params;
    }
}