import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'description',
      type: 'array',
      of: [{'type': 'block'}]
    }),

    defineField({
      title: 'Started at',
      name: 'startedAt',
      type: 'date',
      options: {
        dateFormat: 'MMM Do, YY',
      }
    }),

    defineField({
      title: 'Ended at',
      name: 'endedAt',
      type: 'date',
      options: {
        dateFormat: 'MMM Do, YY',
      }
    })
  ]
})
