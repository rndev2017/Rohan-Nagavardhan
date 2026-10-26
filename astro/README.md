# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

Use Node.js 24 for the frontend. With nvm, run `nvm install` and `nvm use`
from `astro/`; `.nvmrc` and `package.json` pin the deployment major version.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Photography foundations

`PhotoLayout` owns the photography shell, Georgia typography, and scoped `--photo-*`
tokens. Tailwind maps these to `font-photo`, colors, widths, and spacing; the main
site keeps its existing appearance. Photography UI lives in
`src/components/photography/`; queries and data contracts live in `src/lib/queries.ts`.

The canonical schema source is `sanity/schemaTypes/`, maintained by the standalone
Studio. Both `/admin` and old `/admin/...` URLs redirect to
`https://rohansogal.sanity.studio/`; Astro no longer bundles a second Studio.

### Authoring

- **Cameras:** film/digital medium, rangefinder/SLR/instant body type, optional acquisition year/month.
- **Photos:** reusable image documents with required alt text and optional Camera references and metadata.
- **Projects:** title, slug, completion status, optional thumbnail, and ordered one-/two-column spreads. Panels hold Photo references, Portable Text writing, or deliberate blank space. A two-column spread cannot be entirely blank.
- **Homepage Slideshow:** one fixed document (`homeSlideshow`) containing ordered Photo references, independent of project ordering.
- **Camera Sounds:** one fixed document (`cameraSounds`) with optional MP3/WAV files for rangefinders, SLRs, and instant cameras. Film and digital rangefinders share a recording.

Run `npm run dev` inside `sanity/` to review the new schemas locally. Deploy that
Studio separately when ready to expose the schema changes to hosted editors.
No content or sample recordings are seeded automatically.

Publish the Camera and Photo documents, then select and publish the homepage
photographs. Optionally upload/publish the shared camera recordings. The frontend
is statically built: **publish content, then rebuild/redeploy Astro** to update the
website. Drafts are excluded. Missing/deleted references and incomplete photographs
are skipped; absent homepage settings show the empty state.

The homepage shows complete centered images at 82.5% of available width/height,
with a 2.5px black border and instant changes every ten seconds. The next image
loads in advance. Hover (fine pointers), keyboard focus, and a hidden tab pause
playback; reduced motion starts paused. Navigation controls are revealed by
keyboard focus, without a visible image counter.

The small speaker-cabinet button is available when at least one selected photo has
a configured sound. Sound starts off on each visit. Enabling it plays the current
camera category's sound; each new photograph plays its own category. Audio loads
only after opt-in, is cached by asset URL, and never delays photographs. Muting,
changing slides, or hiding the page stops the previous recording. Missing or failed
recordings stay silent. Button state and keyboard labels remain accessible.

The project reader is deliberately deferred: `/photos/projects` and existing
`/albums/{id}` URLs retain their empty states. Future two-column spreads will stack
left before right on mobile within a single navigation step. Existing album IDs
are retained in the legacy route independently of the new model.

### Verification

Use Node 24 and run `npm run test:photography` in `astro/` for the focused native
Node tests covering audio opt-in/caching/races, missing media, playback timing,
reduced motion, and touch focus. Build each npm project separately. In `sanity/`,
`npx sanity schema validate --level error` checks schema configuration. No new
runtime or test dependencies are required.

The production content reset on 2026-10-25 is backed up under the ignored root
`.sanity/backups/` directory, including image files, checksum, prior schema, and
reset receipts. Sanity permission/retention records and `production-comments`
were preserved. New schemas and frontend changes must be deployed separately.
