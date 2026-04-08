import { defineField, defineType } from 'sanity';

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News Page',
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