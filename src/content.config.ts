import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { photoKeys } from './data/photoKeys';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    authors: z.array(z.string()),
    summary_ja: z.string(),
    draft: z.boolean().default(false),
    /** Lower comes first among notes with the same date. */
    order: z.number().default(0),
    /** The photograph at the top of the note. */
    plate: z.enum(photoKeys).default('facade'),
    /** A second photograph that sits beside the body while reading. */
    aside: z.enum(photoKeys).default('meeting'),
  }),
});

export const collections = { notes };
