# Accessibility & Performance Compliance

## Accessibility (A11y) Architecture

1. **Dual-Mode Navigation:**
   - The 3D galaxy is an exploration metaphor, never a mandatory barrier.
   - Every celestial destination (Home, Career, Skills, Projects, Education, Contact) is permanently accessible via standard HTML semantic links in the top navigation bar, bottom quick-jump bar, and mobile drawer.

2. **Keyboard Navigation:**
   - All interactive elements inside the 3D canvas render accessible HTML button elements via Drei `Html`.
   - Modals and drawers feature focus trap management and support the `Escape` key for dismissal.
   - An accessible skip link (`Skip to main content`) is available at the start of the DOM.

3. **Motion Sensitivity:**
   - Respects user `prefers-reduced-motion` operating system settings.
   - When reduced motion is detected or enabled in settings, all orbital rotations, particle drift loops, and lerping camera animations stop or transition instantly.

4. **WebGL Graceful Fallback:**
   - The application checks WebGL context availability (`window.WebGLRenderingContext` and `canvas.getContext('webgl')`).
   - If WebGL is unavailable or blocked by security policies, the app cleanly displays `WebGLFallback` (a 2D interactive sector map) without crashing or displaying a blank screen.

---

## SEO & Metadata

- **Metadata Configuration:** Complete Open Graph, Twitter Cards, canonical URLs, and structured headings are embedded via Next.js 15 App Router.
- **Sitemap & Robots:** Dynamically generated via `apps/web/src/app/sitemap.ts` and `apps/web/src/app/robots.ts`.
- **Search Engine Crawlability:** All career, skill, project, and education details exist in the initial HTML markup rendered by the server. Search engines do not need WebGL to index the entire CV.

