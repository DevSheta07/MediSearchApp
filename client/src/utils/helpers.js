// Deterministic medicine image based on name character
const MEDICINE_IMAGES = [
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80', // pills close-up
  'https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&q=80', // capsules
  'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=500&q=80', // tablets
  'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&q=80', // medicine jars
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&q=80', // pharmacy
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80', // medical
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80', // syringes
  'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&q=80', // blister pack
];

export const getMedicineImage = (name = '') => {
  const idx = (name.charCodeAt(0) || 0) % MEDICINE_IMAGES.length;
  return MEDICINE_IMAGES[idx];
};

export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80';

// Truncate long text
export const truncate = (str = '', maxLen = 80) =>
  str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
