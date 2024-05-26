// ./sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

export default defineConfig({
  name: "rohan-flicks", // Can be whatever
  title: "Rohan's Analog Photography", // Can be whatever
  projectId: 'uyx6mizc',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: [],
  },
});

