import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
    /** Which archival print heads the note. */
    plate: z.enum(['nihonbashi', 'hakone', 'mishima', 'kyoto', 'kanbara', 'kaitai']).default('kanbara'),
    /** A second print that sits beside the body while reading. */
    aside: z.enum(['nihonbashi', 'hakone', 'mishima', 'kyoto', 'kanbara', 'kaitai']).default('mishima'),
  }),
});

export const collections = { notes };
