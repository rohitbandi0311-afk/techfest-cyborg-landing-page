# NEXUS — Cyborg-Themed Landing Page (V2)
A cinematic responsive landing page concept for the Techfest IIT Bombay Campus Ambassador Web Development task.

## What's new in V2
- Interactive procedural 3D cyborg built with Three.js (no external model download)
- Pointer-responsive head movement, animated neural core and orbit rings
- Ambient particle field and HUD overlays
- Scroll reveal animations, mobile navigation and responsive layouts
- Reduced-motion CSS support and semantic content structure

## Files
- `index.html` — page structure and Three.js import map
- `styles.css` — visual system and responsive layout
- `script.js` — navigation, reveal animations and cursor glow
- `cyborg.js` — interactive 3D scene

## Run
Open `index.html` with a local server (recommended):
`python -m http.server 8000`
Then visit `http://localhost:8000`.
The 3D scene loads Three.js from jsDelivr, so an internet connection is needed for the 3D hero. The rest of the page remains readable if WebGL is unavailable.

## Deploy to GitHub Pages
Replace the four files in your existing repository with these V2 files, keeping all files in the repository root. Commit the update to `main`. GitHub Pages should automatically redeploy.

## Demo recording checklist
1. Show the 3D cyborg hero and move the pointer to demonstrate interaction.
2. Click Systems and scroll through all three cards.
3. Show the Interface and Manifesto sections.
4. Open the mobile layout and test the menu.
5. Save a 30–60 second recording to Google Drive and set access to Anyone with the link — Viewer.

## Submission reminder
The task instructions request the GitHub repository link and a short demo recording through a Google Drive link with viewer access enabled. Follow the portal's exact submission field instructions.
