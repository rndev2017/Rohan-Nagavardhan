import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    mdx(),
    sanity({
      projectId: 'uyx6mizc',
      dataset: 'production',
      useCdn: false, // See note on using the CDN
      apiVersion: "2023-03-20"
    }),
    react()
  ],
  redirects: {
    '/admin': {status: 302, destination: 'https://rohansogal.sanity.studio/'},
  },
  output: "static",
  adapter: vercel(),
});
