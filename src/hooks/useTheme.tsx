/**
 * Global Theme System
 *
 * Automatically syncs with system appearance (light/dark mode).
 * All components should use the `useTheme()` hook to access theme colors.
 *
 * This is the ONLY place where `useColorScheme()` should be used.
 * All other components should use `useTheme()` instead.
 */
import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { Theme, ThemeMode, getTheme } from '../theme';

interface ThemeContextValue extends Theme {
  mode: ThemeMode;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Initialize with system scheme
    return systemScheme === 'dark' ? 'dark' : 'light';
  });

  // Automatically sync with system appearance changes
  useEffect(() => {
    const newMode: ThemeMode = systemScheme === 'dark' ? 'dark' : 'light';
    setMode(newMode);
  }, [systemScheme]);

  const themeObject = useMemo(() => getTheme(mode), [mode]);
  const isDark = mode === 'dark';

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, isDark, ...themeObject }),
    [mode, isDark, themeObject],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};
