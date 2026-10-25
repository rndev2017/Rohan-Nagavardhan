import {defineField, defineType} from 'sanity'

export const homeSlideshow = defineType({
  name: 'homeSlideshow',
  title: 'Homepage slideshow',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      type: 'array',
      description:
        'Curate the homepage independently of projects. Drag to reorder. Leave empty to show the empty state.',
      of: [{type: 'reference', to: [{type: 'photo'}]}],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {prepare: () => ({title: 'Homepage slideshow'})},
})

export const cameraSounds = defineType({
  name: 'cameraSounds',
  title: 'Camera sounds',
  type: 'document',
  fields: ['rangefinder', 'slr', 'instant'].map((name) =>
    defineField({
      name,
      title: name === 'slr' ? 'SLR' : name === 'instant' ? 'Instant / Polaroid' : 'Rangefinder',
      type: 'file',
      options: {accept: '.mp3,.wav'},
      description:
        'Optional short MP3 or WAV recording shared by all cameras of this body type. Leave empty for silence.',
      validation: (rule) =>
        rule.custom((value) =>
          !value || value.asset?._ref ? true : 'Upload a recording or clear this field.',
        ),
    }),
  ),
  preview: {prepare: () => ({title: 'Camera sounds'})},
})
