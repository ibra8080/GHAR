import { defineField, defineType } from 'sanity';

export const volunteerPage = defineType({
  name: 'volunteerPage',
  title: 'Volunteer Page',
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