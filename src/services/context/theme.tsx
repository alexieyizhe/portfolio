import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

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

const DARK_THEME = {
  colors: { background: '#121212', textPrimary: '#efefef' },
};

const LIGHT_THEME = {
  colors: { background: '#fff', textPrimary: '#232323' },
};

const ThemeContext = createContext<TThemeContextValue>({
  isDarkMode: true,
  toggleDarkMode: () => null,
  ...SHARED_THEME,
  ...DARK_THEME,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider: FC = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState<TThemeContextValue['isDarkMode']>(
    true
  );
  const toggleDarkMode = useCallback<TThemeContextValue['toggleDarkMode']>(
    (dark) => setDarkMode((prevMode) => dark ?? !prevMode),
    []
  );

  const theme = useMemo(
    () => ({
      ...SHARED_THEME,
      ...(isDarkMode ? DARK_THEME : LIGHT_THEME),
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, ...theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
