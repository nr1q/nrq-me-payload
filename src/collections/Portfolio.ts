import type { CollectionConfig } from 'payload'
//import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    // group: 'Portfolio',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Entry',
    plural: 'Portfolio',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    // {
    //   name: 'content',
    //   type: 'richText',
    //   //required: true,
    //   //editor: lexicalEditor({
    //   //  //admin: {
    //   //  //  placeholder: 'Wassap foo!',
    //   //  //},
    //   //  features: ({ rootFeatures }) => {
    //   //    return [
    //   //      ...rootFeatures,
    //   //    ];
    //   //  }
    //   //}),
    // },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
    },
    {
      name: 'releasedAt',
      type: 'date',
      admin: {
        date: {
          displayFormat: 'yyyy/MM/dd',
        }
      }
    },
  ],
  upload: true,
}
