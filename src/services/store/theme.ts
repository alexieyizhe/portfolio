import { StoreonModule } from 'storeon';

export type TTheme = {
  colors: {
    background: string;
    textPrimary: string;
  };
  headingFont: string;
  bodyFont: string;
  easterEggFont: string;
};

export type TThemeColor = keyof TTheme['colors'];

const SHARED_THEME = {
  headingFont: "'Verona Serial', 'Franklin Gothic Medium', Arial, serif",
  bodyFont:
    "'Space Grotesk Variable', 'Space Grotesk', -apple-system, BlinkMacSystemFont, Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
  easterEggFont: "'Comic Sans MS'",
};

const DARK_THEME = {
  colors: { background: '#121212', textPrimary: '#efefef' },
};

const LIGHT_THEME = {
  colors: { background: '#fff', textPrimary: '#232323' },
};

export const THEME_KEYS = Array.from(
  new Set([
    ...Object.keys(DARK_THEME),
    ...Object.keys(LIGHT_THEME),
    ...Object.keys(SHARED_THEME),
  ])
) as (keyof TTheme)[];

export type TThemeModuleState = TTheme & {
  isDarkMode: boolean;
};

export type TThemeModuleEvents = {
  'dark-mode/toggle': boolean | undefined;
};

export const createThemeModule = () => {
  const prefersDarkTheme =
    process.browser &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isNighttime = new Date().getHours() > 20 || new Date().getHours() < 9;
  const initialIsDarkMode = prefersDarkTheme || isNighttime;
  const initialState: TThemeModuleState = {
    ...SHARED_THEME,
    ...(initialIsDarkMode ? DARK_THEME : LIGHT_THEME),
    isDarkMode: initialIsDarkMode,
  };

  const module: StoreonModule<TThemeModuleState, TThemeModuleEvents> = (
    store
  ) => {
    store.on('@init', () => initialState);

    store.on('dark-mode/toggle', (state, forceSet) => {
      const newIsDarkMode = forceSet ?? !state.isDarkMode;

      if (newIsDarkMode !== state.isDarkMode) {
        return {
          ...(newIsDarkMode ? DARK_THEME : LIGHT_THEME),
          isDarkMode: newIsDarkMode,
        };
      }
    });
  };

  return module;
};
