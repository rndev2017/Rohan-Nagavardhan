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
        dateFormat: 'MMM Do, YYYY',
      }
    }),

    defineField({
      title: 'Ended at',
      name: 'endedAt',
      type: 'date',
      options: {
        dateFormat: 'MMM Do, YYYY',
      }
    }),

    defineField({
      name: 'isUploading',
      title: 'Is Uploading',
      type: 'boolean',
      description: 'Show an "uploading..." indicator on the album listing.',
    }),

    defineField({
      name: 'photoSequence',
      title: 'Photo Sequence',
      type: 'array',
      description: 'Drag to reorder photos. Leave empty to use default chronological order.',
      of: [
        {
          type: 'reference',
          to: [{type: 'photo'}],
        },
      ],
    }),
  ]
})
