import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'camera',
  title: 'Camera',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'medium',
      type: 'string',
      options: {list: ['film', 'digital'], layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bodyType',
      type: 'string',
      description:
        'Selects the shared camera sound; film and digital rangefinders use the same recording.',
      options: {
        list: [
          {title: 'Rangefinder', value: 'rangefinder'},
          {title: 'SLR', value: 'slr'},
          {title: 'Instant / Polaroid', value: 'instant'},
          {title: 'Point and shoot', value: 'pointAndShoot'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'acquiredAt',
      title: 'Acquired',
      type: 'object',
      description: 'Optional. Enter a year; add the month only if you know it.',
      fields: [
        defineField({
          name: 'year',
          type: 'number',
          validation: (rule) => rule.required().integer().min(1).max(new Date().getFullYear()),
        }),
        defineField({
          name: 'month',
          type: 'number',
          validation: (rule) => rule.integer().min(1).max(12),
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name', medium: 'medium', bodyType: 'bodyType'},
    prepare: ({title, medium, bodyType}) => ({
      title,
      subtitle: [medium, bodyType].filter(Boolean).join(' · '),
    }),
  },
})
