import { ImageSourcePropType } from 'react-native';

/**
 * Centralized image assets registry
 * Import and export all app images here for type-safe, reusable access
 *
 * Note: For React icon components, see src/assets/icons.tsx
 */

// Onboarding carousel images
export const onboardingImages = {
  carousel1:
    require('../../assets/images/carousel_image_1.png') as ImageSourcePropType,
  carousel2:
    require('../../assets/images/carousel_image_2.png') as ImageSourcePropType,
  carousel3:
    require('../../assets/images/carousel_image_3.png') as ImageSourcePropType,
};

// Community guidelines icons
export const guidelineIcons = {
  honest: require('./images/guidelines/icon-honest.png') as ImageSourcePropType,
  respect:
    require('./images/guidelines/icon-respect.png') as ImageSourcePropType,
  privacy:
    require('./images/guidelines/icon-privacy.png') as ImageSourcePropType,
  vigilant:
    require('./images/guidelines/icon-vigilant.png') as ImageSourcePropType,
};

// Bottom tab navigation icons
export const tabIcons = {
  home: require('./images/tabs/home-icon.png') as ImageSourcePropType,
  matches: require('./images/tabs/matches-icon.png') as ImageSourcePropType,
  inbox: require('./images/tabs/inbox-icon.png') as ImageSourcePropType,
  settings: require('./images/tabs/settings-icon.png') as ImageSourcePropType,
};

// Discover screen controls
export const discoverControls = {
  dislike: require('./images/discover/dislike-icon.png') as ImageSourcePropType,
  like: require('./images/discover/like-button.png') as ImageSourcePropType,
  superlike:
    require('./images/discover/superlike-icon.png') as ImageSourcePropType,
};

// Filter screen icons
export const filterIcons = {
  close:
    require('../../assets/images/filters/close-icon.svg') as ImageSourcePropType,
  save: require('../../assets/images/filters/save-icon.svg') as ImageSourcePropType,
  location:
    require('../../assets/images/filters/location-icon.svg') as ImageSourcePropType,
  check:
    require('../../assets/images/filters/check-icon.svg') as ImageSourcePropType,
};

// Gender selection icons (PNG versions from Figma)
// Note: PNGs are white from Figma. Using tintColor in SelectionSection for gray default state
export const genderIconImages = {
  male: {
    default: require('./images/gender/gender-male-selected.png') as ImageSourcePropType,
    selected: require('./images/gender/gender-male-selected.png') as ImageSourcePropType,
    size: 18,
  },
  female: {
    default: require('./images/gender/gender-female-selected.png') as ImageSourcePropType,
    selected: require('./images/gender/gender-female-selected.png') as ImageSourcePropType,
    size: 18,
  },
  nonBinary: {
    default: require('./images/gender/gender-non-binary-selected.png') as ImageSourcePropType,
    selected: require('./images/gender/gender-non-binary-selected.png') as ImageSourcePropType,
    size: 24,
  },
};

// Interest selection icons (PNG versions from Figma)
// Note: PNGs are white from Figma. Using tintColor in MultiSelectSection for proper coloring
export const interestIconImages = {
  Cooking: {
    default: require('./images/interests/cooking.png') as ImageSourcePropType,
    size: 16,
  },
  Movies: {
    default: require('./images/interests/movies.png') as ImageSourcePropType,
    size: 16,
  },
  'Music Enthusiast': {
    default: require('./images/interests/music.png') as ImageSourcePropType,
    size: 14,
  },
  'Book Nerd': {
    default: require('./images/interests/book.png') as ImageSourcePropType,
    size: 12,
  },
  Traveling: {
    default: require('./images/interests/traveling.png') as ImageSourcePropType,
    size: 24,
  },
  Athlete: {
    default: require('./images/interests/athlete.png') as ImageSourcePropType,
    size: 24,
  },
  Technology: {
    default: require('./images/interests/technology.png') as ImageSourcePropType,
    size: 24,
  },
  Shopping: {
    default: require('./images/interests/shopping.png') as ImageSourcePropType,
    size: 24,
  },
  Art: {
    default: require('./images/interests/art.png') as ImageSourcePropType,
    size: 24,
  },
  Photography: {
    default: require('./images/interests/photography.png') as ImageSourcePropType,
    size: 24,
  },
  'Video Games': {
    default: require('./images/interests/videogames.png') as ImageSourcePropType,
    size: 24,
  },
  Boating: {
    default: require('./images/interests/boating.png') as ImageSourcePropType,
    size: 24,
  },
  Gambling: {
    default: require('./images/interests/gambling.png') as ImageSourcePropType,
    size: 24,
  },
  Swimming: {
    default: require('./images/interests/swimming.png') as ImageSourcePropType,
    size: 24,
  },
  Videography: {
    default: require('./images/interests/videography.png') as ImageSourcePropType,
    size: 24,
  },
  Design: {
    default: require('./images/interests/design.png') as ImageSourcePropType,
    size: 24,
  },
};

// Add more image categories as needed:
// export const profileImages = { ... };
// export const backgroundImages = { ... };
