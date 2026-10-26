# Deployment & Vercel Configuration Guide

## Deploying on Vercel

The monorepo is fully configured for deployment on [Vercel](https://vercel.com).

### Project Configuration Settings
When creating or importing the project in Vercel:

1. **Framework Preset:** `Next.js`
2. **Root Directory:** `./apps/web` (or leave as root with build command specified)
3. **Build Command:**
   ```bash
   pnpm build
   ```
   *(or `turbo build --filter=@space/web...`)*
4. **Output Directory:** `.next`
5. **Install Command:**
   ```bash
   pnpm install
   ```

### Environment Variables
The application is statically deployable without mandatory secrets. Optional variables can be configured:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL of the website | `https://cv-portfolio.vercel.app` |
| `NEXT_PUBLIC_SITE_NAME`| Site title prefix | `Nguyen Bao Duy - Fullstack & Backend Software Engineer` |

---

## Local Verification Commands

```bash
# Clean install dependencies
pnpm install

# Run type check across all monorepo packages
pnpm type-check

# Run unit and schema test suite
pnpm test

# Build production bundle
pnpm build

# Start production server
pnpm --filter @space/web start
```

