/**
 * Centralized Color Theme System
 *
 * This file contains all colors used throughout the app, extracted from Figma design.
 * Colors are grouped and merged to eliminate duplication (DRY principle).
 *
 * Similar colors (within 2% brightness difference) are consolidated into single values.
 */

// Base color palette - extracted from Figma
const baseColors = {
  // Primary brand colors (purple gradient family)
  purple: {
    primary: '#8239FF', // Main brand purple (most common in Figma)
    primaryLight: '#9253FF', // Lighter variant for gradients
    primaryLighter: '#A776FC', // Lightest variant for gradients
    primaryDark: '#843DFE', // Darker variant
    primaryDarker: '#853EFE', // Darkest variant
    underline: '#D4BBFF', // Underline color for onboarding titles
  },

  // Neutral grays (grouped by similarity)
  gray: {
    // Dark grays (backgrounds)
    black: '#000000',
    dark900: '#121212', // Darkest background
    dark800: '#151515', // Very dark background
    dark700: '#171717', // Dark background (text primary in light mode)
    dark600: '#181818', // Main dark background
    dark500: '#1A1A1A', // Dark card background
    dark400: '#212121', // Darker card
    dark300: '#262626', // Card dark
    dark200: '#2E2E2E', // Input background dark
    dark100: '#323232', // Border dark

    // Medium grays
    medium900: '#3D3D3D', // Border tab dark
    medium800: '#444444', // Text tertiary
    medium700: '#474747', // Border dark
    medium600: '#484848', // Medium gray
    medium500: '#4A4A4A', // Tab inactive dark
    medium400: '#515151', // Border dark variant

    // Light grays (text, borders)
    light900: '#666666',
    light800: '#888888', // Text subtitle
    light700: '#A7A7A7', // Text muted
    light600: '#A8A8A8', // Text secondary, placeholder
    light500: '#B2B2B2', // Text disabled, icon unselected
    light400: '#BEBEBE', // Text light
    light300: '#C6C6C6', // Icon default, text icon
    light200: '#D0C9D6', // Input icon secondary
    light100: '#D7D9DD', // Tab inactive

    // Very light grays (backgrounds, borders)
    veryLight900: '#EAEAEA', // Border light
    veryLight800: '#F2F2F2', // Underline, background quaternary
    veryLight700: '#F4F4F4', // Background light
    veryLight600: '#F5F5F5', // Background secondary
    veryLight500: '#F5F7F9', // Card, input background, border
    veryLight400: '#F7F8FA', // Background tertiary, border light
    veryLight300: '#F8F8F8', // Background card, border tab
    veryLight200: '#FFFFFF', // White
    dotInactiveLight: '#EDEDED', // Pagination dot inactive (light mode)
    dotInactiveDark: '#363636', // Pagination dot inactive (dark mode)
  },

  // Pink/Red accent colors (for special UI elements)
  pink: {
    light: '#FFDAE0', // Background pink light, shadow pink
    medium: '#FFF3F5', // Background pink
    dark: '#FFF4F6', // Background active
  },

  // Status colors
  status: {
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  },

  // Overlay colors
  overlay: {
    dark: 'rgba(0, 0, 0, 0.6)',
    light: 'rgba(255, 255, 255, 0.95)',
  },
};

// Light theme colors - using base palette
export const lightColors = {
  // Background colors
  background: baseColors.gray.veryLight200,
  backgroundSecondary: baseColors.gray.veryLight600,
  backgroundTertiary: baseColors.gray.veryLight400,
  backgroundQuaternary: baseColors.gray.veryLight800,
  backgroundPink: baseColors.pink.medium,
  backgroundPinkLight: baseColors.pink.light,
  backgroundCard: baseColors.gray.veryLight300,
  backgroundActive: baseColors.pink.dark,
  backgroundDark: baseColors.gray.dark600,
  backgroundCardSecondary: baseColors.gray.dark300,

  // Text colors
  textPrimary: baseColors.gray.dark700,
  textSecondary: baseColors.gray.light600,
  textTertiary: baseColors.gray.medium800,
  textQuaternary: baseColors.gray.black,
  textMuted: baseColors.gray.light700,
  textDisabled: baseColors.gray.light500,
  textLight: baseColors.gray.light400,
  textIcon: baseColors.gray.light300,
  textLabel: baseColors.gray.light300,
  textSubtitle: baseColors.gray.light800,

  // Accent colors (purple family)
  accent: baseColors.purple.primary,
  accentPrimary: baseColors.purple.primaryLight,
  accentSecondary: baseColors.purple.primaryLighter,
  accentTertiary: baseColors.purple.primaryDark,
  accentUnderline: baseColors.purple.underline, // Underline color for onboarding

  // Card and container colors
  card: baseColors.gray.veryLight500,
  cardDark: baseColors.gray.dark300,

  // Border colors
  border: baseColors.gray.veryLight500,
  borderLight: baseColors.gray.veryLight400,
  borderDark: baseColors.gray.medium700,
  borderTab: baseColors.gray.veryLight300,
  borderTabDark: baseColors.gray.medium900,

  // Section/Heading colors (semantic names for common patterns)
  sectionTitle: baseColors.gray.dark700, // Same as textPrimary in light
  heading: baseColors.gray.black, // Same as textQuaternary in light
  subheading: baseColors.gray.light400, // Same as textLight
  iconUnselected: baseColors.gray.light300, // Default icon color

  // Field/Input specific colors
  fieldLabel: baseColors.purple.primary, // Label color (accent)
  fieldBackground: baseColors.gray.veryLight500, // Field background
  fieldText: baseColors.gray.black, // Field text color

  // Content container colors
  contentContainer: baseColors.gray.veryLight200, // White container
  contentContainerDark: baseColors.gray.dark500, // Dark container (#1A1A1A)
  sectionContent: baseColors.gray.black, // Section content text (with opacity)
  sectionContentMuted: 'rgba(0, 0, 0, 0.7)', // Muted section content

  // Name and occupation colors
  name: baseColors.gray.black, // User name
  occupation: 'rgba(0, 0, 0, 0.7)', // Occupation text

  // Link and action colors
  readMore: baseColors.purple.primaryLight, // Read more link (#8945FF)
  distanceBadge: baseColors.purple.primaryLight, // Distance badge (#8945FF)
  distanceBadgeBackground: 'rgba(137, 69, 255, 0.1)', // Distance badge background

  // Button colors
  buttonBackground: baseColors.gray.veryLight200, // Button background
  buttonBackgroundSecondary: baseColors.gray.veryLight600, // Secondary button background (#313131 in dark)
  buttonText: baseColors.gray.black, // Button text

  // Search colors
  searchBackground: baseColors.gray.veryLight200, // Search input background
  searchBorder: baseColors.gray.veryLight900, // Search border (#E8E6EA)
  searchIcon: baseColors.gray.light600, // Search icon color

  // Message colors
  messageBackground: baseColors.gray.veryLight200, // Message bubble background
  messageText: baseColors.gray.black, // Message text
  messageTime: baseColors.gray.light700, // Message time (#AFAFAF)
  messageDivider: baseColors.gray.light200, // Message divider (#D2D2D2)

  // Header button colors
  headerButtonBackground: baseColors.pink.dark, // Header button background (#FFF4F6)
  headerButtonIcon: baseColors.gray.black, // Header button icon

  // Checkbox colors
  checkboxBorder: baseColors.gray.light500, // Checkbox border (#B1B1B1)

  // Slider colors
  sliderTrack: baseColors.gray.veryLight700, // Slider track (#F3F3F3)
  sliderThumb: baseColors.purple.primary, // Slider thumb

  // OTP box colors
  otpBoxEmpty: baseColors.gray.veryLight200, // Empty OTP box background
  otpBoxEmptyBorder: 'rgba(167, 118, 252, 0.3)', // Empty OTP box border
  otpBoxText: baseColors.gray.black, // OTP box text

  // Photo/Media colors
  photoBackground: baseColors.pink.medium, // Photo background (#FFF3F5)
  photoBadgeBackground: baseColors.overlay.light, // Photo badge background (rgba(255, 255, 255, 0.95))
  photoBadgeText: baseColors.purple.primary, // Photo badge text (#8239FF)
  photoPlusBackground: baseColors.gray.veryLight200, // Plus button background (white)
  photoPlusText: baseColors.gray.dark300, // Plus button text (#262626)

  // Input colors
  inputBackground: baseColors.gray.veryLight500,
  inputText: baseColors.gray.light600,
  inputIcon: baseColors.gray.light600,
  inputIconSecondary: baseColors.gray.light200,

  // Status colors
  success: baseColors.status.success,
  warning: baseColors.status.warning,
  danger: baseColors.status.danger,

  // UI element colors
  placeholder: baseColors.gray.light600,
  underline: baseColors.gray.veryLight800,
  shadow: baseColors.gray.black,
  shadowLight: baseColors.gray.light700,
  shadowMedium: baseColors.gray.light200,
  shadowAccent: baseColors.purple.primaryLight,
  shadowPink: baseColors.pink.light,

  // Icon colors
  iconDefault: baseColors.gray.light300,
  iconSelected: baseColors.gray.veryLight200,
  iconUnselectedDark: baseColors.gray.light500,
  iconUnselectedLight: baseColors.gray.light300,
  iconPrimary: baseColors.purple.primary,

  // Overlay colors
  overlayDark: baseColors.overlay.dark,
  overlayLight: baseColors.overlay.light,

  // Disabled colors
  disabled: baseColors.gray.light300,
  disabledDark: baseColors.gray.medium500,

  // Tab colors
  tabInactive: baseColors.gray.light100,
  tabInactiveDark: baseColors.gray.medium500,

  // Pagination dot colors
  dotInactive: baseColors.gray.dotInactiveLight, // #EDEDED for light mode

  // Onboarding screen specific colors
  signInText: baseColors.gray.light700, // #A7A7A7 - "Already have an account?" text
  signInLink: baseColors.purple.primary, // #8239FF - "Sign In" link color
};

// Dark theme colors - using base palette
export const darkColors = {
  // Background colors
  background: baseColors.gray.dark600,
  backgroundSecondary: baseColors.gray.dark900,
  backgroundTertiary: baseColors.gray.dark200,
  backgroundQuaternary: baseColors.gray.dark300,
  backgroundPink: baseColors.gray.dark300,
  backgroundPinkLight: baseColors.gray.dark300,
  backgroundCard: baseColors.gray.dark200,
  backgroundActive: baseColors.gray.dark300,
  backgroundDark: baseColors.gray.dark600,
  backgroundCardSecondary: baseColors.gray.dark300,

  // Text colors
  textPrimary: baseColors.gray.veryLight200,
  textSecondary: baseColors.gray.light600,
  textTertiary: baseColors.gray.veryLight200,
  textQuaternary: baseColors.gray.veryLight200,
  textMuted: baseColors.gray.light700,
  textDisabled: baseColors.gray.light500,
  textLight: baseColors.gray.light400,
  textIcon: baseColors.gray.light300,
  textLabel: baseColors.gray.light300,
  textSubtitle: baseColors.gray.light800,

  // Accent colors (purple family - same as light)
  accent: baseColors.purple.primary,
  accentPrimary: baseColors.purple.primaryLight,
  accentSecondary: baseColors.purple.primaryLighter,
  accentTertiary: baseColors.purple.primaryDark,
  accentUnderline: baseColors.purple.underline, // Underline color for onboarding

  // Card and container colors
  card: baseColors.gray.dark200,
  cardDark: baseColors.gray.dark300,

  // Border colors
  border: baseColors.gray.dark200,
  borderLight: baseColors.gray.dark200,
  borderDark: baseColors.gray.medium400,
  borderTab: baseColors.gray.medium900, // Mode-aware: dark in dark mode
  borderTabDark: baseColors.gray.medium900,

  // Section/Heading colors (semantic names for common patterns)
  sectionTitle: baseColors.gray.veryLight200, // Same as textPrimary in dark
  heading: baseColors.gray.veryLight200, // Same as textPrimary in dark
  subheading: baseColors.gray.light400, // Same as textLight
  iconUnselected: baseColors.gray.light500, // Darker icon in dark mode

  // Field/Input specific colors
  fieldLabel: baseColors.purple.primaryLight, // Label color (slightly lighter in dark)
  fieldBackground: baseColors.gray.dark200, // Field background (darker in dark mode, ~#2E2E2E)
  fieldText: baseColors.gray.veryLight200, // Field text color (white in dark)

  // Content container colors
  contentContainer: baseColors.gray.dark500, // Dark container (#1A1A1A)
  contentContainerDark: baseColors.gray.dark500, // Dark container
  sectionContent: baseColors.gray.veryLight200, // Section content text (white)
  sectionContentMuted: 'rgba(255, 255, 255, 0.7)', // Muted section content

  // Name and occupation colors
  name: baseColors.gray.veryLight200, // User name (white)
  occupation: 'rgba(255, 255, 255, 0.7)', // Occupation text

  // Link and action colors
  readMore: baseColors.purple.primaryLight, // Read more link (#8945FF)
  distanceBadge: baseColors.purple.primaryLight, // Distance badge (#8945FF)
  distanceBadgeBackground: 'rgba(137, 69, 255, 0.1)', // Distance badge background

  // Button colors
  buttonBackground: baseColors.gray.medium600, // Button background (#313131)
  buttonBackgroundSecondary: baseColors.gray.medium600, // Secondary button background
  buttonText: baseColors.gray.veryLight200, // Button text (white)

  // Search colors
  searchBackground: baseColors.gray.dark200, // Search input background (#2E2E2E)
  searchBorder: baseColors.gray.dark200, // Search border
  searchIcon: baseColors.gray.light600, // Search icon color (#A8A8A8)

  // Message colors
  messageBackground: baseColors.gray.medium600, // Message bubble background (#2D2D2D)
  messageText: baseColors.gray.veryLight200, // Message text (white)
  messageTime: baseColors.gray.medium600, // Message time (#6B6B6B)
  messageDivider: baseColors.gray.medium600, // Message divider (#6B6B6B)

  // Header button colors
  headerButtonBackground: baseColors.gray.medium600, // Header button background (#2D2D2D)
  headerButtonIcon: baseColors.gray.veryLight200, // Header button icon (white)

  // Checkbox colors
  checkboxBorder: baseColors.gray.light500, // Checkbox border (#B1B1B1)

  // Slider colors
  sliderTrack: baseColors.gray.dark200, // Slider track (#2E2E2E)
  sliderThumb: baseColors.purple.primary, // Slider thumb

  // OTP box colors
  otpBoxEmpty: baseColors.gray.medium600, // Empty OTP box background (gradient in dark)
  otpBoxEmptyBorder: 'rgba(167, 118, 252, 0.3)', // Empty OTP box border
  otpBoxText: baseColors.gray.veryLight200, // OTP box text (white in dark)
  otpBoxGradientStart: baseColors.gray.medium600, // OTP box gradient start (#2D2D2D)
  otpBoxGradientEnd: baseColors.gray.medium600, // OTP box gradient end (#2B2B2B)

  // Photo/Media colors
  photoBackground: baseColors.gray.dark300, // Photo background (#262626)
  photoBadgeBackground: baseColors.overlay.dark, // Photo badge background (rgba(0, 0, 0, 0.6))
  photoBadgeText: baseColors.gray.veryLight200, // Photo badge text (white)
  photoPlusBackground: baseColors.gray.veryLight200, // Plus button background (white)
  photoPlusText: baseColors.gray.dark300, // Plus button text (#262626)

  // Input colors
  inputBackground: baseColors.gray.dark200,
  inputText: baseColors.gray.light600,
  inputIcon: baseColors.gray.light600,
  inputIconSecondary: baseColors.gray.light200,

  // Status colors
  success: baseColors.status.success,
  warning: baseColors.status.warning,
  danger: baseColors.status.danger,

  // UI element colors
  placeholder: baseColors.gray.light600,
  underline: 'transparent',
  shadow: baseColors.gray.black,
  shadowLight: baseColors.gray.light700,
  shadowMedium: baseColors.gray.light200,
  shadowAccent: baseColors.purple.primaryLight,
  shadowPink: baseColors.pink.light,

  // Icon colors
  iconDefault: baseColors.gray.light300,
  iconSelected: baseColors.gray.veryLight200,
  iconUnselectedDark: baseColors.gray.light500,
  iconUnselectedLight: baseColors.gray.light300,
  iconPrimary: baseColors.purple.primary,

  // Overlay colors
  overlayDark: baseColors.overlay.dark,
  overlayLight: baseColors.overlay.light,

  // Disabled colors
  disabled: baseColors.gray.light300,
  disabledDark: baseColors.gray.medium500,

  // Tab colors
  tabInactive: baseColors.gray.medium500,
  tabInactiveDark: baseColors.gray.medium500,

  // Pagination dot colors
  dotInactive: baseColors.gray.dotInactiveDark, // #363636 for dark mode

  // Onboarding screen specific colors
  signInText: baseColors.gray.light700, // #A7A7A7 - "Already have an account?" text (same as light)
  signInLink: baseColors.gray.veryLight200, // #8239FF - "Sign In" link color (same as light)
};

// Gradient colors - extracted from Figma
// Primary gradients use the purple family
export const gradients = {
  // Main brand gradient (most common in Figma)
  primary: [baseColors.purple.primaryLight, baseColors.purple.primary],

  // Secondary gradient (for buttons, highlights)
  secondary: [baseColors.purple.primaryLighter, baseColors.purple.primary],

  // Disabled state gradient
  disabled: [baseColors.gray.light300, baseColors.gray.medium500],
};
