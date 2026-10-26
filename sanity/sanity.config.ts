import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'rohan-flicks',

  projectId: 'uyx6mizc',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Photography')
          .items([
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('photo').title('Photos'),
            S.documentTypeListItem('camera').title('Cameras'),
            S.divider(),
            S.listItem()
              .title('Homepage Slideshow')
              .child(S.document().schemaType('homeSlideshow').documentId('homeSlideshow')),
            S.listItem()
              .title('Camera Sounds')
              .child(S.document().schemaType('cameraSounds').documentId('cameraSounds')),
          ]),
    }),
    visionTool(),
  ],

  document: {
    actions: (actions, context) =>
      ['homeSlideshow', 'cameraSounds'].includes(context.schemaType)
        ? actions.filter(({action}) => action !== 'duplicate')
        : actions,
  },

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !['homeSlideshow', 'cameraSounds'].includes(schemaType)),
  },
})
