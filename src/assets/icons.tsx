import { genderIconImages } from './images';

/**
 * Icon component registry
 * Centralized React icon components for type-safe, reusable access
 * 
 * Note: Gender icons now use PNG images from Figma for exact design matching
 */

// Gender selection icons - using PNG images from images.ts
export const genderIcons = {
  male: genderIconImages.male,
  female: genderIconImages.female,
  nonBinary: genderIconImages.nonBinary,
};

