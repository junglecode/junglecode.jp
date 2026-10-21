import { getCollection } from 'astro:content';
import { SHOW_DRAFTS } from './config';

export async function getNotes() {
  const all = await getCollection('notes', ({ data }) => SHOW_DRAFTS || !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.data.order - b.data.order);
}

export const formatDate = (d: Date, locale: 'en' | 'ja') =>
  new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d);
