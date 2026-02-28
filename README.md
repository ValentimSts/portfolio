# My Personal Portfolio

A personal portfolio website built with pure JavaScript, CSS, and HTML — no frameworks, no build tools, no dependencies. Built from scratch as a learning project.

## Features

- **Single Page Application** — custom client-side routing with the History API for clean URLs, plus a hash-based fallback router
- **Dynamic page background** — animated diagonal stripe that transitions between pages
- **Navbar circle indicator** — SVG circle that smoothly follows the active navigation link
- **Settings menu** — slide-out panel with a blueprint debug mode toggle (persisted via localStorage)
- **Localization support** — i18n system with centralized locale strings (currently English)
- **Responsive design** — adapts to mobile and desktop viewports
- **Dark theme support** — CSS custom properties for light/dark theming

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/home` | Home | Hero section with welcome text |
| `/about-me` | About Me | Bio and skills list |
| `/projects` | Projects | Project cards grid with tech tags |
| `/misc` | Art | Art gallery (coming soon) |

## Project Structure

```
.
├── index.html              # Entry point
├── js/
│   ├── main.js             # App initialization and route configuration
│   ├── components/         # Reusable UI components (navbar, settings menu, etc.)
│   ├── pages/              # Page components (home, about, projects, misc, not-found)
│   ├── routing/            # Custom SPA router (base, history, hash)
│   ├── constants/          # Centralized CSS classes, DOM IDs, HTML elements
│   ├── locales/            # i18n locale strings
│   └── utils/              # Shared utilities
├── css/
│   ├── main.css            # Master stylesheet (imports all others)
│   ├── reset.css           # CSS reset
│   ├── colors.css          # Color variables and theming
│   ├── typography.css      # Font styles
│   └── layout.css          # Layout and responsive breakpoints
└── assets/
    ├── fonts/              # Custom fonts
    └── icons/              # SVG icons
```

## Development

No build step required. Run the included script to start a local server:

```bash
./serve.sh        # serves on port 8000
./serve.sh 3000   # custom port
```

ES6 modules require HTTP — `file://` won't work.
