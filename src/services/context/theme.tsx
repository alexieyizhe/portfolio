import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useSiteStore } from 'services/store';

export type TTheme = {
  colors: {
    background: string;
    textPrimary: string;
  };
  headingFont: string;
  bodyFont: string;
};

type TThemeContextValue = TTheme & {
  isDarkMode: boolean;
  toggleDarkMode: (dark?: boolean) => void;
};

export type TThemeColor = keyof TTheme['colors'];

const SHARED_THEME = {
  headingFont: "'Verona Serial', 'Franklin Gothic Medium', Arial, serif",
  bodyFont:
    "'Space Grotesk Variable', 'Space Grotesk', -apple-system, BlinkMacSystemFont, Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
};

/**
 * The easter egg lives in the theme rather than on the heading, so everything
 * drawing its font from here turns over at once. Each stack keeps its usual
 * font behind Comic Sans, so anyone without it installed just sees no change.
 */
const EASTER_EGG_THEME = {
  headingFont: `'Comic Sans MS', ${SHARED_THEME.headingFont}`,
  bodyFont: `'Comic Sans MS', ${SHARED_THEME.bodyFont}`,
};

export const DARK_THEME = {
  colors: { background: '#121212', textPrimary: '#efefef' },
};

export const LIGHT_THEME = {
  colors: { background: '#fff', textPrimary: '#232323' },
};

const ThemeContext = createContext<TThemeContextValue>({
  isDarkMode: true,
  toggleDarkMode: () => null,
  ...SHARED_THEME,
  ...DARK_THEME,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const isEasterEggActive = useSiteStore((state) => state.isEasterEggActive);
  const [isDarkMode, setDarkMode] =
    useState<TThemeContextValue['isDarkMode']>(true);
  const toggleDarkMode = useCallback<TThemeContextValue['toggleDarkMode']>(
    (dark) => setDarkMode((prevMode) => dark ?? !prevMode),
    []
  );

  const theme = useMemo(
    () => ({
      ...SHARED_THEME,
      ...(isEasterEggActive ? EASTER_EGG_THEME : null),
      ...(isDarkMode ? DARK_THEME : LIGHT_THEME),
    }),
    [isDarkMode, isEasterEggActive]
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, ...theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
