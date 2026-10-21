// Photographs of contemporary Tokyo, and of Japanese hospitals and care for the healthcare page.
// tokyo-day, tokyo-night, marunouchi and shinkansen are real photographs, credited on the credits
// page (src/data/credits.ts). LAUNCH: the rest are generated placeholders. Replace them with licensed or commissioned photography.
import tokyoDay from '../assets/photos/tokyo-day.jpg';
import tokyoNight from '../assets/photos/tokyo-night.jpg';
import marunouchi from '../assets/photos/marunouchi.jpg';
import shinkansen from '../assets/photos/shinkansen.jpg';
import towerMorning from '../assets/photos/tower-morning.jpg';
import meeting from '../assets/photos/meeting.jpg';
import facade from '../assets/photos/facade.jpg';
import streetEvening from '../assets/photos/street-evening.jpg';
import clinic from '../assets/photos/clinic.jpg';
import officeFloor from '../assets/photos/office-floor.jpg';
import care from '../assets/photos/care.jpg';
import readingRoom from '../assets/photos/reading-room.jpg';
import wardMeeting from '../assets/photos/ward-meeting.jpg';

export const photos = {
  'tokyo-day': tokyoDay,
  'tokyo-night': tokyoNight,
  marunouchi,
  shinkansen,
  'tower-morning': towerMorning,
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
  'tokyo-day': '40% 36%',
  'tokyo-night': '60% 42%',
  marunouchi: '50% 62%',
  shinkansen: '70% 60%',
  'tower-morning': '50% 40%',
  meeting: '45% 55%',
  facade: '50% 50%',
  'street-evening': '50% 60%',
  clinic: '45% 50%',
  'office-floor': '50% 50%',
  care: '30% 70%',
  'reading-room': '40% 35%',
  'ward-meeting': '72% 55%',
};
