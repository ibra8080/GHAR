import { defineField, defineType } from 'sanity';

export const pageSettings = defineType({
  name: 'pageSettings',
  title: 'Design Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHome',
      title: 'Hero Image — Home',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroAbout',
      title: 'Hero Image — About',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroProjects',
      title: 'Hero Image — Projects',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroNews',
      title: 'Hero Image — News',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroDonate',
      title: 'Hero Image — Donate',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVolunteer',
      title: 'Hero Image — Volunteer',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroTransparency',
      title: 'Hero Image — Transparency',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroContact',
      title: 'Hero Image — Contact',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroJobs',
      title: 'Hero Image — Jobs',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});