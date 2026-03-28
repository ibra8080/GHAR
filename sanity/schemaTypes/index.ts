import { type SchemaTypeDefinition } from 'sanity';
import { project } from './project';
import { news } from './news';
import { teamMember } from './teamMember';
import { partner } from './partner';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, news, teamMember, partner],
};