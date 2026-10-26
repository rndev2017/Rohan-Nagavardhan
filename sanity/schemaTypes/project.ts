import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  initialValue: {status: 'in_progress', spreads: []},
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      description: 'Completion status is independent of draft/published status.',
      options: {
        list: [
          {title: 'In progress', value: 'in_progress'},
          {title: 'Done', value: 'done'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', type: 'text', rows: 3}),
    defineField({name: 'thumbnail', type: 'reference', to: [{type: 'photo'}]}),
    defineField({
      name: 'spreads',
      type: 'array',
      description: 'Reorder to compose the book. The project reader will be added separately.',
      of: [{type: 'oneColumnSpread'}, {type: 'twoColumnSpread'}],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'status', media: 'thumbnail.image'}},
})
