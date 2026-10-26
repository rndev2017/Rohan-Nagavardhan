import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photograph',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required().assetRequired(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the photograph for someone who cannot see it.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({
      name: 'location',
      type: 'object',
      fields: [
        {name: 'city', type: 'string'},
        {name: 'region', title: 'State / province / region', type: 'string'},
        {name: 'country', type: 'string'},
      ],
    }),
    defineField({name: 'camera', type: 'reference', to: [{type: 'camera'}]}),
  ],
  orderings: [
    {title: 'Newest added', name: 'newest', by: [{field: '_createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', altText: 'altText', subtitle: 'camera.name', media: 'image'},
    prepare: ({title, altText, subtitle, media}) => ({
      title: title || altText || 'Untitled photograph',
      subtitle,
      media,
    }),
  },
})
