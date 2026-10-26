# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo with two independent projects:

- `astro/` — Frontend site (Astro + React + Tailwind CSS), deployed to Vercel
- `sanity/` — Headless CMS (Sanity Studio), deployed separately via `sanity deploy`

## Commands

All commands must be run from within the relevant subdirectory.

### Astro frontend (`cd astro`)
```
npm run dev       # Start dev server (binds to all interfaces via --host)
npm run build     # Production build
npm run preview   # Preview production build locally
```

### Sanity Studio (`cd sanity`)
```
npm run dev       # Start Sanity Studio locally
npm run build     # Build Studio
npm run deploy    # Deploy Studio to Sanity's hosted URL
```

## Architecture

### Frontend (Astro)

**Routing**: File-based via `astro/src/pages/`. Key routes:
- `index.astro` — About/home page
- `blog.astro` — Blog index (reads all `blog/*.md` files, filters by `visible: true` frontmatter)
- `blog/*.md` — Individual posts using `PostLayout.astro`
- `photos.astro` — Photography gallery (fetches albums from Sanity at build time)
- `albums/[...id].astro` — Album detail page with `getStaticPaths()` generating static pages per album

**Data fetching**: Sanity content is fetched at build time using `sanityClient` from `"sanity:client"` (provided by `@sanity/astro` integration). Queries use GROQ syntax.

**Rendering**: Output is `static` (SSG). The Vercel adapter is used for deployment.

**Component conventions**:
- `Link.astro` — Use this for all links; it auto-adds `target="_blank"` for external URLs
- `SanityDescription.astro` — Renders Sanity portable text / block content
- `PhotoCarousel.astro` — React island (interactive) for album photo browsing

### Sanity CMS

Schemas in `sanity/schemaTypes/`:
- `album` — Photography albums with `title`, `description` (block content), `startedAt`, `endedAt` dates
- `photo` — Individual photos, referenced by albums

The Studio is embedded in the Astro site at `/admin` via the `@sanity/astro` integration (configured in `astro.config.mjs`).

### Environment Variables

Defined in `.env` at the repo root (not inside `astro/`):
```
PUBLIC_SANITY_PROJECT_ID="uyx6mizc"
PUBLIC_SANITY_DATASET="production"
```

### Styling

Tailwind CSS with a custom 5-color palette defined in `astro/tailwind.config.cjs`:
- `jet`, `red_crayola`, `pumpkin`, `honolulu_blue`, `parchment`

Uses `@tailwindcss/typography` for blog post prose styling.
