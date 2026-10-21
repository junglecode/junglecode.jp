// Real photographs used on the site, with what their licences ask for. The credits page lists them,
// and a small link at the foot of every page leads there.
import type { PhotoKey } from './photoKeys';
import { NOTES_ENABLED } from './features';

export interface PhotoCredit {
  photo: PhotoKey;
  title: { en: string; ja: string };
  by: string;
  source: string;
  licence: string;
  licenceUrl: string;
  /** True when the site shows a cropped or resized version, which the licences ask us to say. */
  adapted: boolean;
  /** Set when the photo only appears in the notes, so it's listed only while they're shown. */
  notesOnly?: boolean;
}

const allCredits: PhotoCredit[] = [
  {
    photo: 'tokyo-day',
    title: { en: 'Minato City, Tokyo, Japan', ja: '東京都港区の街並み' },
    by: 'David Kernan',
    source: 'https://commons.wikimedia.org/wiki/File:Minato_City,_Tokyo,_Japan.jpg',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
    adapted: true,
  },
  {
    photo: 'tokyo-night',
    title: { en: 'Minato City, Tokyo, Japan (Night)', ja: '東京都港区の夜景' },
    by: 'David Kernan',
    source: 'https://commons.wikimedia.org/wiki/File:Minato_City,_Tokyo,_Japan_(Night)-denoised.jpg',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
    adapted: true,
  },
  {
    photo: 'marunouchi',
    title: { en: 'Tokyo Station Marunouchi exit seen from the JP Tower', ja: 'JPタワーから見た東京駅丸の内口' },
    by: '掬茶',
    source: 'https://commons.wikimedia.org/wiki/File:Tokyo_Station_Marunouchi_exit_seen_from_the_JP_Tower_20191130.jpg',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    adapted: true,
  },
  {
    photo: 'shinkansen',
    title: { en: 'N700 Series Shinkansen on the Tokaido Line, Tokyo', ja: '東京を走る東海道新幹線N700系' },
    by: 'David Kernan',
    source: 'https://commons.wikimedia.org/wiki/File:N700_Series_Shinkansen_on_Tokaido_Line_Tokyo_March_2015.jpg',
    licence: 'CC BY 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
    adapted: true,
    notesOnly: true,
  },
];

export const photoCredits = allCredits.filter((c) => NOTES_ENABLED || !c.notesOnly);
