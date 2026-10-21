// The archival prints used across the site. All public domain.
import nihonbashi from '../assets/archive/nihonbashi.jpg';
import hakone from '../assets/archive/hakone.jpg';
import mishima from '../assets/archive/mishima.jpg';
import kyoto from '../assets/archive/kyoto.jpg';
import kanbara from '../assets/archive/kanbara.jpg';
import kaitai from '../assets/archive/kaitai-shinsho-preface.jpg';

export const plates = { nihonbashi, hakone, mishima, kyoto, kanbara, kaitai } as const;
export type PlateKey = keyof typeof plates;

// Where the subject of each print sits, so crops keep it in frame.
export const focus: Record<PlateKey, string> = {
  nihonbashi: '50% 56%',
  hakone: '64% 62%',
  mishima: '42% 70%',
  kyoto: '50% 68%',
  kanbara: '52% 55%',
  kaitai: '30% 45%',
};
