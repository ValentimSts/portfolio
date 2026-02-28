# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project boilerplate.
- HTML entry point with ES6 module support.
- CSS architecture with reset, colors, typography, and layout stylesheets.
- CSS custom properties for theming (light/dark mode).
- Google Fonts integration (Inter family).
- Navbar component with navigation links.
- JSDoc documentation across all modules.
- Custom SPA routing system with History API and hash-based fallback.
- Base router abstract class with shared routing logic.
- History router with clean URL navigation and dynamic route parameters.
- Hash router as a legacy/fallback alternative.
- Route class for encapsulating route configuration.
- Home page with hero section and localized welcome text.
- About Me page with bio and skills list.
- Projects page with project cards grid and technology tags.
- Art/Misc page with gallery placeholder.
- 404 Not Found page.
- Page container layout component.
- CSS page transition animations (fade-in).
- Localization system with English locale strings.
- Centralized constants for CSS classes, DOM IDs, and HTML elements.
- Dynamic diagonal page background that animates on page transitions.
- Navbar circle indicator (SVG) that follows the active navigation link.
- Smooth animations using requestAnimationFrame.
- Background configuration constants (baseHeight, maxOffset, lineThickness).
- Settings menu with slide-out panel and overlay with blur effect.
- Blueprint debug mode toggle that shows element borders.
- Settings persistence via localStorage.
- Settings button with orange-slice icon in the navbar.
- Toggle switch component for settings controls.
- Escape key support for closing the settings menu.

### Fixed

- Home page layout improvements.
- Settings button renamed and navbar no longer shifts when settings menu is opened.
