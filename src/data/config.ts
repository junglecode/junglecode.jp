// Site-wide settings. Launch blockers are marked LAUNCH.

export const SITE_URL = 'https://junglecode.jp';
export const EMAIL = 'hello@junglecode.jp'; // LAUNCH: confirm this mailbox or alias exists in Google Workspace
export const FORM_ENDPOINT = 'https://formspree.io/f/moveqnkd';

// LAUNCH: paste the real scheduling link (Cal.com, Calendly or cal.diy). Until then the
// booking link opens an email with a prepared subject, so nothing on the page is a dead end.
export const BOOKING_URL: string | null = null;

export const bookingHref = (subject: string) =>
  BOOKING_URL ?? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

export const PEOPLE = {
  jet: { name: 'Jet Villegas', city: 'Tokyo', tz: 'Asia/Tokyo', linkedin: 'https://www.linkedin.com/in/jetvillegas/' },
  aditya: { name: 'Aditya Pandya', city: 'New York', tz: 'America/New_York', linkedin: 'https://www.linkedin.com/in/adityapandya/' },
} as const;

// Draft notes are shown in development and in preview builds (SHOW_DRAFTS=1), never in production.
export const SHOW_DRAFTS = import.meta.env.DEV || import.meta.env.SHOW_DRAFTS === '1' || process.env.SHOW_DRAFTS === '1';
