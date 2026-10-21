// The names of the site's photographs, shared with the content schema (which can't import images).
export const photoKeys = ['hero-morning', 'tower-morning', 'tower-dusk', 'platform', 'meeting', 'facade', 'street-evening', 'clinic', 'office-floor'] as const;
export type PhotoKey = (typeof photoKeys)[number];
