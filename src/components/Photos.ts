// Photographs of contemporary Tokyo, and of Japanese hospitals and care for the healthcare page.
// The two Tokyo Tower views are real photographs by David Kernan (CC BY 4.0, credited in the footer).
// LAUNCH: the rest are generated placeholders. Replace them with licensed or commissioned photography.
import tokyoTowerDay from '../assets/photos/tokyo-tower-day.jpg';
import tokyoTowerNight from '../assets/photos/tokyo-tower-night.jpg';
import towerMorning from '../assets/photos/tower-morning.jpg';
import platform from '../assets/photos/platform.jpg';
import meeting from '../assets/photos/meeting.jpg';
import facade from '../assets/photos/facade.jpg';
import streetEvening from '../assets/photos/street-evening.jpg';
import clinic from '../assets/photos/clinic.jpg';
import officeFloor from '../assets/photos/office-floor.jpg';
import care from '../assets/photos/care.jpg';
import readingRoom from '../assets/photos/reading-room.jpg';
import wardMeeting from '../assets/photos/ward-meeting.jpg';

export const photos = {
  'tokyo-tower-day': tokyoTowerDay,
  'tokyo-tower-night': tokyoTowerNight,
  'tower-morning': towerMorning,
  platform,
  meeting,
  facade,
  'street-evening': streetEvening,
  clinic,
  'office-floor': officeFloor,
  care,
  'reading-room': readingRoom,
  'ward-meeting': wardMeeting,
} as const;
export type { PhotoKey } from '../data/photoKeys';
import type { PhotoKey } from '../data/photoKeys';

// Where each picture's subject sits, so crops keep it in frame.
export const focus: Record<PhotoKey, string> = {
  'tokyo-tower-day': '46% 42%',
  'tokyo-tower-night': '50% 40%',
  'tower-morning': '50% 40%',
  platform: '55% 55%',
  meeting: '45% 55%',
  facade: '50% 50%',
  'street-evening': '50% 60%',
  clinic: '45% 50%',
  'office-floor': '50% 50%',
  care: '30% 70%',
  'reading-room': '40% 35%',
  'ward-meeting': '72% 55%',
};
