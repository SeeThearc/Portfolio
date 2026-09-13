# Ayush's iPad - interactive portfolio

An iPad-inspired portfolio built with React and Vite. The original lock screen, app launcher, project gallery, profile, contact composer, resume, appearance picker, audio, dock, and recent-app interactions are retained and upgraded.

```sh
npm install
npm run dev
npm run lint
npm run build
```

## Explore

- Click or swipe up to unlock. Click the home indicator to return home; drag it upward to open recent apps.
- The top-left clock opens Notification Center; the top-right status icons open Control Center. A downward drag from either side also opens its panel.
- Notifications open the related content and can be dismissed individually or cleared.
- Recent apps track visited screens during the session. Close a card to dismiss it, or select it to resume.
- Search with the Home Screen search pill or Ctrl/Cmd+K. Alt+Tab opens recent apps when the browser receives the shortcut; the OS may reserve it.
- Control Center provides three wallpapers, simulated screen brightness, focus (hides the notification badge), ambient audio, lock, and browser fullscreen where supported.
- Ambient sound is synthesized locally and starts only after interaction. No external audio request is needed.

## Content and implementation

`src/components/AppSwitcher.jsx` owns the device shell and system panels. `src/pages/` contains the original app screens. `src/ipad.css` refines the device, wallpaper, widgets, and responsive presentation. `src/index.css` provides the shared foundation. `src/data/projects.js` is the single source of project content. The resume and images live in `public/`.

Appearance is saved locally; recent apps are session-scoped. Both work without browser storage. Notification cards are portfolio shortcuts, not a live messaging feed. Device status is decorative; brightness affects this portfolio only.

The prior studio redesign is retained in `src/studio/` but is not imported by the app.

Serve `index.html` for application routes (`/home`, `/projects`, `/about`) when hosting. Email composition opens the visitor's mail app; clipboard copying requires HTTPS or localhost.

## Dedicated portfolio apps

- `/skills`: searchable skill categories, with links to projects demonstrating the tools.
- `/experience`: an interactive role selector, contributions, education link, and resume download.
- `/contact`: a dedicated contact card and message composer. Drafts stay in session storage when switching apps or reloading. Visitors review and send in their mail app or Gmail; the portfolio itself does not send email. Copy actions report success or offer manual selection when clipboard access is denied.

All three apps are available from the Home Screen, Spotlight, and Recent Apps. Legacy `/about?tab=Skills` and `/about?tab=Experience` links redirect to the dedicated apps. Include the new application routes in your host's SPA fallback.
