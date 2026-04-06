import { type SchemaTypeDefinition } from 'sanity';
import { project } from './project';
import { news } from './news';
import { teamMember } from './teamMember';
import { partner } from './partner';
import { heroSlide } from './heroSlide';
import { stat } from './stat';
import { siteSettings } from './siteSettings';
import { aboutContent } from './aboutContent';
import { job } from './job';
import { pageSettings } from './pageSettings';
import { transparencyContent } from './transparencyContent';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, news, teamMember, partner, heroSlide, stat, siteSettings, aboutContent, job, pageSettings, transparencyContent],
};