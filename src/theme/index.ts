import { darkColors, lightColors, gradients } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  colors: typeof lightColors;
  spacing: typeof spacing;
  typography: typeof typography;
  gradients: typeof gradients;
}

export const Theme = (mode: ThemeMode = 'light'): Theme => ({
  colors: mode === 'light' ? lightColors : darkColors,
  spacing,
  typography,
  gradients,
});

export const getTheme = Theme;

// Re-export for convenience
export { gradients } from './colors';
