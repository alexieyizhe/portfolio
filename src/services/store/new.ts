import constate from 'constate';
import { useCallback, useMemo, useState } from 'react';

import { TPageInitialProps } from 'pages';
import { TNowPlayingData } from 'services/now-playing';
import {
  ACTIVITIES,
  GREETINGS,
  PREFIXES,
  TAGLINES,
  TALKING_POINTS,
} from 'services/copy';
import {
  getDateFromOffset,
  getRandomItem,
  getShuffledArray,
} from 'services/utils';

type TSection = 'about' | 'work';

console.log('YEEEET', process.browser && window.location.pathname);
/**
 * zustand for
 * - focusing
 * - easter egg
 * - displayed section
 *
 * context for
 * - is dark mode
 * - theme
 *
 * FIX DynamicTime color
 */

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

const useSiteState = (initialProps: TPageInitialProps) => {
  const prefix = getRandomItem(PREFIXES);
  const activity = getRandomItem([
    ...ACTIVITIES,
    ...(initialProps.customStatus
      ? new Array(ACTIVITIES.length).fill(initialProps.customStatus) // larger weight for custom status
      : []),
  ]);
  const activityStatus = `${prefix} ${activity}.`;

  const [greeting] = useState(getRandomItem(GREETINGS));
  const [taglines] = useState(getShuffledArray(TAGLINES));
  const [currentDate] = useState(
    getDateFromOffset(initialProps.currentTimezoneOffset)
  );
  const [statuses, setStatuses] = useState([
    initialProps.initialNowPlayingData ?? activityStatus,
  ]);
  const [talkingPoint] = useState(getRandomItem(TALKING_POINTS));
  const [displayedSection, setDisplayedSection] = useState<TSection>('about');

  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isFocusingOnSomething, setIsFocusingOnSomething] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = useMemo(
    () => ({ ...SHARED_THEME, ...(isDarkMode ? DARK_THEME : LIGHT_THEME) }),
    [isDarkMode]
  );

  const addStatus = useCallback(
    (status: TNowPlayingData | string) =>
      setStatuses((prev) => [...prev, status]),
    []
  );

  const showSection = (section?: TSection) =>
    setDisplayedSection((prev) => {
      console.log(section, prev === 'about' ? 'work' : 'about');
      return section ?? prev === 'about' ? 'work' : 'about';
    });

  const toggleEasterEgg = useCallback(
    (active?: boolean) => setIsEasterEggActive((p) => active ?? !p),
    []
  );

  const toggleFocusing = useCallback(
    (focusing?: boolean) => setIsFocusingOnSomething((p) => focusing ?? !p),
    []
  );

  const toggleDarkMode = useCallback(
    (dark?: boolean) => setIsDarkMode((p) => dark ?? !p),
    []
  );

  return {
    initialProps,
    greeting,
    taglines,
    currentDate,
    statuses,
    talkingPoint,
    displayedSection,
    isEasterEggActive,
    isFocusingOnSomething,
    isDarkMode,
    theme,

    addStatus,
    showSection,
    toggleEasterEgg,
    toggleFocusing,
    toggleDarkMode,
  };
};

const [
  SiteStateProvider,
  useInitialProps,
  useGreeting,
  useTaglines,
  useCurrentDate,
  useStatuses,
  useTalkingPoint,
  useDisplayedSection,
  useTheme,
  useEasterEggActive,
  useFocusing,
  useDarkMode,

  useAddStatus,
  useShowSection,
  useToggleEasterEgg,
  useToggleFocusing,
  useToggleDarkMode,
] = constate(
  useSiteState,
  (value) => value.initialProps,
  (value) => value.greeting,
  (value) => value.taglines,
  (value) => value.currentDate,
  (value) => value.statuses,
  (value) => value.talkingPoint,
  (value) => value.displayedSection,
  (value) => value.theme,
  (value) => value.isEasterEggActive,
  (value) => value.isFocusingOnSomething,
  (value) => value.isDarkMode,

  (value) => value.addStatus,
  (value) => value.showSection,
  (value) => value.toggleEasterEgg,
  (value) => value.toggleFocusing,
  (value) => value.toggleDarkMode
);

export {
  SiteStateProvider,
  useInitialProps,
  useGreeting,
  useTaglines,
  useCurrentDate,
  useStatuses,
  useTalkingPoint,
  useDisplayedSection,
  useTheme,
  useEasterEggActive,
  useFocusing,
  useDarkMode,
  useAddStatus,
  useShowSection,
  useToggleEasterEgg,
  useToggleFocusing,
  useToggleDarkMode,
};
