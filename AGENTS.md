# Agent Guidelines for 3D Space Portfolio

Welcome to the **Nguyen Bao Duy - 3D Space Exploration Developer Portfolio & Interactive CV** codebase.

## Repository Layout
- `apps/web`: Next.js 15 App Router web application.
- `packages/portfolio-content`: Single source of truth for resume data and Zod schemas.
- `packages/state`: Shared Zustand galaxy store (`useGalaxyStore`).
- `packages/ui`: Shared design system and glassmorphic components.
- `packages/galaxy-engine`: Three.js / React Three Fiber / Drei 3D scene graph.
- `docs/`: Technical and operational documentation.

## Core Rules for Agents
1. **Authoritative Source of Truth:** Never invent or alter career dates, employment history, degrees, or certifications. The provided CV is the single authoritative source.
2. **Decoupled 3D Engine:** Keep personal resume content inside `@space/portfolio-content` and rendering logic inside `@space/galaxy-engine`.
3. **Dual-Mode Navigation:** Never remove conventional HTML navigation routes or fallback modes (`/career`, `/skills`, `/projects`, `/education`, `/contact`, `/cv`).
4. **Accessible First:** Ensure all interactive 3D objects maintain accessible HTML equivalents and that `prefers-reduced-motion` settings are honored.

