// Deterministic medicine image based on name character
const MEDICINE_IMAGES = [
  '/images/pills-closeup.jpg',
  '/images/capsules.jpg',
  '/images/tablets.jpg',
  '/images/medicine-jars.jpg',
  '/images/pharmacy-store.jpg',
  '/images/medical-tablets.jpg',
  '/images/syringes.jpg',
  '/images/blister-pack.jpg',
];

export const getMedicineImage = (name = '') => {
  const idx = (name.charCodeAt(0) || 0) % MEDICINE_IMAGES.length;
  return MEDICINE_IMAGES[idx];
};

export const FALLBACK_IMAGE = '/images/pills-closeup.jpg';

// Truncate long text
export const truncate = (str = '', maxLen = 80) =>
  str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
