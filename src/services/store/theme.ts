import { StoreonModule } from 'storeon';

type TTheme = {
  backgroundColor: string;
  textPrimaryColor: string;
  headingFont: string;
  bodyFont: string;
  easterEggFont: string;
};

const SHARED_THEME = {
  headingFont: "'Verona Serial', 'Franklin Gothic Medium', Arial, serif",
  bodyFont:
    "'Space Grotesk Variable', 'Space Grotesk', -apple-system, BlinkMacSystemFont, Roboto, Ubuntu, 'Helvetica Neue', sans-serif",
  easterEggFont: "'Comic Sans MS'",
};

const DARK_THEME = {
  backgroundColor: '#121212',
  textPrimaryColor: '#efefef',
};

const LIGHT_THEME = {
  backgroundColor: '#fff',
  textPrimaryColor: '#232323',
};

const THEME_KEYS = Array.from(
  new Set([
    ...Object.keys(DARK_THEME),
    ...Object.keys(LIGHT_THEME),
    ...Object.keys(SHARED_THEME),
  ])
) as (keyof TTheme)[];

type TThemeModuleState = TTheme & {
  isDarkMode: boolean;
};

type TThemeModuleEvents = {
  'dark-mode/toggle': boolean | undefined;
};

const createThemeModule = () => {
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

export type { TTheme, TThemeModuleEvents, TThemeModuleState };
export { createThemeModule, THEME_KEYS };
