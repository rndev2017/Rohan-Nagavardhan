import {defineArrayMember, defineField, defineType} from 'sanity'

type TextBlock = {children?: Array<{text?: string}>}
function plainText(value: unknown): string {
  if (!Array.isArray(value)) return ''
  return (value as TextBlock[])
    .map((block) => block.children?.map((child) => child.text || '').join('') || '')
    .join(' ')
    .trim()
}

export const photoPanel = defineType({
  name: 'photoPanel',
  title: 'Photograph',
  type: 'object',
  fields: [
    defineField({
      name: 'photo',
      type: 'reference',
      to: [{type: 'photo'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'photo.title', subtitle: 'photo.altText', media: 'photo.image'}},
})

export const writingPanel = defineType({
  name: 'writingPanel',
  title: 'Writing',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Paragraph', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) =>
                      rule.required().uri({scheme: ['http', 'https', 'mailto']}),
                  },
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom((blocks) => {
            if (!blocks) return true
            return Boolean(plainText(blocks)) || 'Add some writing before publishing.'
          }),
    }),
  ],
  preview: {
    select: {content: 'content'},
    prepare: ({content}) => ({
      title: 'Writing',
      subtitle: plainText(content).slice(0, 100),
    }),
  },
})

export const blankPanel = defineType({
  name: 'blankPanel',
  title: 'Blank space',
  type: 'object',
  fields: [
    defineField({
      name: 'note',
      type: 'string',
      description: 'An optional editor note. Never shown on the website.',
    }),
  ],
  preview: {
    select: {subtitle: 'note'},
    prepare: ({subtitle}) => ({title: 'Blank space', subtitle}),
  },
})

export const oneColumnSpread = defineType({
  name: 'oneColumnSpread',
  title: 'One-column spread',
  type: 'object',
  fields: [
    defineField({
      name: 'panels',
      title: 'Content',
      type: 'array',
      description: 'One photograph or writing panel. This is one navigation step in the book.',
      of: [{type: 'photoPanel'}, {type: 'writingPanel'}],
      validation: (rule) => rule.required().length(1),
    }),
  ],
  preview: {
    select: {media: 'panels.0.photo.image'},
    prepare: ({media}) => ({title: 'One-column spread', media}),
  },
})

export const twoColumnSpread = defineType({
  name: 'twoColumnSpread',
  title: 'Two-column spread',
  type: 'object',
  fields: [
    defineField({
      name: 'panels',
      title: 'Left and right panels',
      type: 'array',
      description:
        'Exactly two panels: first is left, second is right. On mobile, read left before right.',
      of: [{type: 'photoPanel'}, {type: 'writingPanel'}, {type: 'blankPanel'}],
      validation: (rule) =>
        rule
          .required()
          .length(2)
          .custom(
            (panels) =>
              !panels ||
              panels.some((panel) => (panel as {_type?: string})._type !== 'blankPanel') ||
              'At least one panel must contain a photograph or writing.',
          ),
    }),
  ],
  preview: {
    select: {media: 'panels.0.photo.image'},
    prepare: ({media}) => ({title: 'Two-column spread', media}),
  },
})
