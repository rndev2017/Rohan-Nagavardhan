# Repository Guidelines

## Project Structure & Module Organization

This repository contains two independent npm projects:

- `astro/`: static personal site using Astro, React integration, and Tailwind CSS. Routes and Markdown blog posts live in `src/pages/`; reusable UI and layouts live in `src/components/` and `src/layouts/`. Shared Sanity queries and document interfaces belong in `src/lib/queries.ts`. Images, videos, and favicons live in `public/`.
- `sanity/`: standalone Sanity Studio. Content schemas live in `schemaTypes/` and are registered in `schemaTypes/index.ts`.

The frontend fetches photography content from Sanity during static builds and uses the Vercel adapter. Schema changes should be coordinated with frontend queries and rendering.

## Build, Test, and Development Commands

Run commands inside the relevant project directory; there is no root package script.

- `cd astro && npm install`: install frontend dependencies.
- `cd sanity && npm install`: install Studio dependencies.
- `npm run dev`: start the selected project's development server. Astro's script uses `--host`, exposing it on available network interfaces.
- `npm run build`: build the selected project for production.
- In `astro/`, `npm run preview`: preview the production build locally.
- In `sanity/`, `npm run deploy`: publish Studio; use only for intentional deployments.

Stop the local Astro dev server before running a production build in the same checkout, then restart it afterward. Concurrent builds have left the long-running dev server referencing nonexistent production assets. In normal development, refresh to fetch published Sanity content; a production rebuild is required for deployed static pages.

## Coding Style & Naming Conventions

Match surrounding formatting and avoid unrelated reformatting. TypeScript generally uses two-space indentation; Astro markup varies. Use PascalCase for components and layouts (for example, `SanityDescription.astro`), camelCase for functions and schema fields, and existing underscore-separated names for blog posts.

Reuse Tailwind utilities and the palette in `astro/tailwind.config.cjs`. Sanity's Prettier configuration specifies single quotes, no semicolons, no bracket spacing, and a 100-character print width. Neither project defines a lint script; the root ESLint configuration references legacy Next.js rules.

## Photography Design

Read [DESIGN_LANGUAGE.md](DESIGN_LANGUAGE.md) before changing photography layouts, components, typography, color, or interactions. It records the agreed visual roles and behavior for the `/photos` microsite and photography routes using `PhotoLayout.astro`.

- Reuse the documented typography roles, photography tokens, and existing components. Keep the main personal site's visual design separate.
- Use Georgia for photography identity and page headings, Fraunces Bold only for book-cover titles, and the system sans-serif for catalog descriptions, status, and metadata.
- Keep new work within the requested design step. The user has approved the book-opening transition and spread reader with chevrons, a spread marker, and arrow-key navigation. Preserve the homepage tilt and hover pause. Do not add further page-turn effects or new CMS fields without a specific request.
- When an agreed design rule changes, update `DESIGN_LANGUAGE.md` alongside the implementation.

## Testing Guidelines

Run `npm run test:photography` in `astro/` for the slideshow/audio and project-reader regression tests. No coverage threshold is configured. Build each affected project and manually verify changed routes at desktop and mobile sizes. For photography changes, check album listings, detail pages, photo ordering, and empty content. Frontend builds require access to Sanity content.

## Commit & Pull Request Guidelines

Recent commits use scoped Conventional Commits such as `feat(albums): ...`, `fix(albums): ...`, and `refactor(queries): ...`; follow that pattern. Keep commits focused. PRs should describe the change, link relevant issues, list validation performed, and include screenshots for visual changes.
