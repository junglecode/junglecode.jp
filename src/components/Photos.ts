// Photographs of contemporary Tokyo used across the site.
// LAUNCH: these are generated placeholders. Replace them with licensed or commissioned photography.
import heroMorning from '../assets/photos/hero-morning.jpg';
import towerMorning from '../assets/photos/tower-morning.jpg';
import towerDusk from '../assets/photos/tower-dusk.jpg';
import platform from '../assets/photos/platform.jpg';
import meeting from '../assets/photos/meeting.jpg';
import facade from '../assets/photos/facade.jpg';
import streetEvening from '../assets/photos/street-evening.jpg';
import clinic from '../assets/photos/clinic.jpg';
import officeFloor from '../assets/photos/office-floor.jpg';

export const photos = {
  'hero-morning': heroMorning,
  'tower-morning': towerMorning,
  'tower-dusk': towerDusk,
  platform,
  meeting,
  facade,
  'street-evening': streetEvening,
  clinic,
  'office-floor': officeFloor,
} as const;
export type { PhotoKey } from '../data/photoKeys';
import type { PhotoKey } from '../data/photoKeys';

// Where each picture's subject sits, so crops keep it in frame.
export const focus: Record<PhotoKey, string> = {
  'hero-morning': '50% 70%',
  'tower-morning': '50% 40%',
  'tower-dusk': '40% 60%',
  platform: '55% 55%',
  meeting: '45% 55%',
  facade: '50% 50%',
  'street-evening': '50% 60%',
  clinic: '45% 50%',
  'office-floor': '50% 50%',
};
