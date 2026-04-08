import { defineField, defineType } from 'sanity';

export const donatePage = defineType({
  name: 'donatePage',
  title: 'Donate Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});