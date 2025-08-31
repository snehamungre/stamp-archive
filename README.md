# README — Aaba’s Stamp Archive 

## Project

**Aaba/Grandfather’s Stamp Archive** — a small interactive web app that preserves and showcases my grandfather’s stamp collection. It opens with a cinematic, scroll-driven entry animation, then guides users to explore, create, and curate stamps from the collection.

This project was built to honor a family legacy and to experiment with tactile, scroll-controlled UI and lightweight data-driven galleries.

---

## Key features (what it does)

* **Scroll-scrubbed entry animation** (GSAP ScrollTrigger + pinned video) that controls an intro video with your scroll.
* **Intro objects** that slide in from left/right and sequence before the video scrub.
* **Create page**: shows the back of an empty envelope; user is given 3–4 randomly chosen stamps from the collection and can **drag & drop** stamps onto the envelope.
* **Archive page**: grid of stamps with **filtering by country and year** and lazy-loaded images.
* **Theme page**: curated stamp releases & special postcards.
* **About page**: the story behind the archive — why it exists.
* Data stored as JSON (easy to migrate to DB later).

---
### Design
UI and all screen mockups were designed in Figma. Exports:
- Icons: SVG
- Illustrations / images: PNG 2x or WebP
- Exported assets live in `/public/assets/images` and `/public/assets/stamps`
- Figma file: [https://www.figma.com/design/mMcS5ACk4ine9skPrDUaL4/stamp-archive?node-id=0-1&t=RbDBwdvw8eM2mz5n-1]

## Tech stack

* React (Vite)
* GSAP (ScrollTrigger, timelines; Pro if available)
* TailwindCSS
* Static assets (images/video) served from `/public/assets`
* 

---

## Quick start (dev)

1. Clone:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install:

```bash
npm install
```

3. Dev server:

```bash
npm run dev
```

4. Open `http://localhost:5173` (or whatever Vite prints).

---

## Build & deploy

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to static hosts (Netlify, Vercel, GitHub Pages, S3 + CloudFront). If you have many images, use object storage or CDN (Cloudinary / S3) to avoid large repository size.

---

## How it works (brief)

* Entry animation is a GSAP timeline bound to a ScrollTrigger. The video `currentTime` is tweened by the timeline so the video scrubs as you scroll.
* The app shows `Entry` only on initial load. `Entry` calls an `onComplete` callback (when ScrollTrigger reaches the end) which switches the app to normal routes (`/create`, `/archive`, `/theme`, `/about`).
* Navigation is SPA-style (React Router `<Routes>` / `<NavLink>`), so links don’t reload the page.
* Archive data lives in `src/data/stamps.json`. Each stamp object includes `id`, `img`, `countries`, `year`, `collection`, `info`.

---

## UX / performance notes (what I learned & recommend)

* Pinning + scrubbed timelines must have enough scrollable space after the section so the element can unpin. Use `end: "+=N"` and test on mobile.
* For predictable scrub speed, control scroll distance rather than forcing a `duration`.
* Use `gsap.context()` (or `useGSAP`) and cleanup (`ctx.revert()` / kill timelines) to avoid duplicate triggers on route changes.
* Lazy-load stamp images (`loading="lazy"`) and consider a CDN for large collections.
* Keep `fixed` overlays minimal; animate them driven by some other non-fixed trigger or use a pinned parent with height.

---

## Folder structure (example)

```
public/
  assets/
    images/
    video/
    stamps/
src/
  components/
    Navbar.jsx
    Entry.jsx
    Card.jsx
  pages/
    Create.jsx
    Archive.jsx
    Theme.jsx
    About.jsx
  data/
    stamps.json
  index.css
  App.jsx
  main.jsx
```

---

## Development tips & gotchas

* If using React Router, call `ScrollTrigger.refresh()` on route changes (use `useLocation` effect) so ScrollTrigger recalculates positions.
* When animating fixed-position elements, don’t use the fixed element as the trigger; trigger off a scrolling sibling/section.
* Use `markers: true` while debugging start/end/pin ranges; remove for production.

---

## Future improvements

* Move stamp metadata and images to a DB/object storage (Supabase, S3 + Dynamo/Firestore) for scale.
* Add user accounts + saved envelopes.
* Accessibility: add keyboard drag-drop fallback and improved ARIA for animated elements.
* Add automated validation pipeline (CI check that `stamps.json` passes schema).

---

## License & credits
* Built with GSAP, React, Tailwind.

---

## Contact
If you are interested in what I have done here let me know :)
