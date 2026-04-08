import { defineField, defineType } from 'sanity';

export const jobsPage = defineType({
  name: 'jobsPage',
  title: 'Jobs Page',
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