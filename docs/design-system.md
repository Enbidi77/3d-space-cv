# Design System & Creative Direction

## Aesthetic Philosophy

The visual atmosphere combines the precision of a scientific space observatory, the visual immersion of an award-winning WebGL interactive application, and the clean typography and usability of a modern developer portfolio.

### Visual Foundations
- **Backgrounds:** Deep space `#030712` (near-black navy/midnight blue), accented by subtle indigo and cyan radial glows.
- **Glassmorphism:** Information panels feature translucent slate surfaces (`bg-slate-950/70` to `bg-slate-900/80`), fine borders (`border-slate-800`), soft drop shadows, and backdrop blur (`backdrop-blur-md` to `backdrop-blur-xl`).
- **Color Hierarchy:**
  - **Cyan (`#38bdf8` / `#0ea5e9`):** Core engineering actions, primary links, active system status, and Home Base core.
  - **Violet / Purple (`#c084fc` / `#818cf8`):** Project worlds, secondary stations, and microservices links.
  - **Emerald (`#34d399`):** Education station, verified benchmarks, and operational success indicators.
  - **Rose / Red (`#f43f5e`):** Subspace comm beacon and contact action items.
  - **Slate Neutral (`#f8fafc` text, `#94a3b8` muted):** Body text, typography, and structure.

---

## Typography Hierarchy

| Level | Size / Weight | Purpose |
| :--- | :--- | :--- |
| **Hero Title** | 3rem - 4rem / ExtraBold | Engineer name in primary briefings |
| **Section Headings** | 1.875rem - 2.25rem / Bold | Station / World titles |
| **Card Headers** | 1.125rem - 1.25rem / SemiBold | Individual project or employer titles |
| **Monospace Badges** | 0.75rem / Medium Mono | Sector codes (`ORBIT-ALPHA-01`), dates, tech tags |
| **Body Text** | 0.875rem - 1rem / Normal | Project descriptions and CV bullet points |

---

## UI Component Primitives

The design system primitives reside in `packages/ui`:

1. **`GlassPanel`**
   - Translucent card with rounded-2xl geometry.
   - Variants: `default`, `elevated`, `subtle`, `glow-cyan`, `glow-violet`, `glow-emerald`.
   - Controls backdrop blur level (`sm`, `md`, `lg`, `xl`).

2. **`Button`**
   - Primary: High-contrast cyan button with soft glow.
   - Secondary: Dark slate with subtle border.
   - Outline: Border with cyan hover fill.
   - Glow: Gradient cyan-to-violet with radial bloom.

3. **`Badge`**
   - Compact tag for technologies, status indicators, and sector categories.
   - Color variants matched to skill constellations.

4. **`Modal`**
   - Accessible dialog with escape key listener, scroll locking, and smooth fade/zoom animations.

5. **`Tabs`**
   - Pill-based horizontal navigation controls for filtering skill clusters and categories.

