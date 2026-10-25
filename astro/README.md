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

## Photography shell

`PhotoLayout` owns the photography header, typography, spacing, and namespaced
`--photo-*` tokens on its root. Tailwind maps these variables to photography
colors, fonts, widths, and spacing in `tailwind.config.cjs`; components use
utilities for their presentation. Only tokens, base typography, and interaction
styles remain in the layout stylesheet. Use it for future routes under
`/photos`; photography UI lives in `src/components/photography/`. System fonts
avoid additional font requests. Tailwind's reset/utilities, `SiteHead`, Sanity
queries/client, image URL generation, and Portable Text rendering remain shared.

The photography content model is being redesigned. `/photos` and
`/photos/projects` render empty states without fetching CMS content. Previously
published `/albums/{id}` URLs remain available as empty project pages; their IDs
are recorded in the route so they survive content deletion. The former album/photo
schemas, queries, and rendering components have been removed. Both Studio entry
points have empty schema lists. Sanity configuration and shared Portable Text
rendering remain available for the new content model.

Repository/schema edits do not themselves delete documents or image assets from
Sanity, nor do they publish changes to the live website or Studio.

Production photography content was reset on 2026-10-25 after a verified full export.
The ignored `.sanity/backups/` directory at the repository root contains the export,
checksum, inventory, and deletion receipts. Sanity permission/retention records
and the separate `production-comments` dataset were preserved. The empty Studio
was deployed to `https://rohansogal.sanity.studio/`, and the stored production
schema was deleted. The prior schema record is backed up in the same directory.
The frontend still requires its own deployment to publish the empty pages.
