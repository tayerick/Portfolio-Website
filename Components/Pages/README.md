# Professional Web Portfolio and Application Dashboard

A hand-authored, framework-free personal web application demonstrating modern web platform features, semantic HTML5 engineering, progressive enhancement design, and custom native Web Components. 

This repository functions as a professional landing space detailing my background as an undergraduate Computer Science student at the University of San Diego, a Project Analyst at the San Diego Community College District, and a former United States Marine Corps MV-22 Crew Chief (2017–2023).

**Live Deployment URL:** [https://tayspage.pages.dev](https://tayspage.pages.dev)

---

## Technical Stack and Architectural Decisions

This project explicitly rejects heavy framework dependencies (such as React, Vue, Svelte, Tailwind, or Bootstrap) to showcase compliance with low-level web specifications, optimal critical rendering paths, and clean separation of concerns.

- **Markup:** Semantic HTML5 (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`). Layout blocks restrict utility `<div>` tags strictly to isolated CSS stacking contexts.
- **Styling:** Modern, hand-authored CSS utilizing CSS Grid for responsive multi-column structures, Flexbox for linear element distribution, CSS Custom Properties for unified theme tokens, and relative units (`rem`, `em`, `%`, `ch`, `vw/vh`) for flexible responsive scaling.
- **Behavior:** Modular, vanilla JavaScript structured as standard Web Components leveraging progressive enhancement—ensuring content navigation and text presentation remain fully readable and operational with scripting entirely disabled.
- **Deployment Platform:** Cloudflare Pages edge network CDN pipeline integrated with GitHub version control commit webhooks.

---

## Progressive Enhancement and Scriptless Fallbacks

Progressive enhancement is integrated as a core design requirement rather than an afterthought. If a user or screen reader browses the site with scripting turned off:
1. **The Theme Engine:** Falls back smoothly onto native operating system color configurations using browser-level media query layers (`@media (prefers-color-scheme: dark)`).
2. **The Navigation Layout:** Uses custom `<noscript>` markup containers to account for layout spacing when the interactive custom `<theme-toggle>` component is omitted by the engine.
3. **The Contact Infrastructure:** Fulfills data transactions natively via a pure HTML5 data processing form submission (`method="POST"`) targeting an edge-handling endpoint—relying on native browser validation attributes (`required`, `type="email"`) before any scripting layer intervenes.

---

## Web Application Demonstration

The portfolio integrates an interactive custom element dashboard widget (`<github-user-card>`) that demonstrates real application-layer thinking using vanilla asynchronously-driven script models.

### How It Works
- **API Consumed:** Native public GitHub REST API endpoint (`https://api.github.com/users/{username}`).
- **Asynchronous Flow:** Utilizes `async/await` fetch promises within the component's `connectedCallback()` cycle to handle non-blocking thread scheduling.
- **Data Mutation:** Dynamically parses incoming JSON payload streams to extract public network profile statistics (avatar image resource paths, follower counts, following tracks, public repository metrics).
- **UX States:** Programmatically toggles between active text-based loading updates, direct error-handling fallback trees for invalid lookups, and the final structural shadow DOM render tree layout upon a successful transaction.

---

## Local Development and Environment Set Up

Since this repository contains pure, raw web platform files without a Node build pipeline or asset bundler, it can be tested locally using any standard local HTTP file server.

### Option A: VS Code Live Server (Recommended)
1. Open this project directory inside VS Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Click the **Go Live** button on the bottom status bar track.

### Option B: Python Local Server
If you prefer terminal-based environments, navigate to the project's root folder and execute the background web server module:

```bash
# For Python 3.x environments
python3 -m http.server 8000