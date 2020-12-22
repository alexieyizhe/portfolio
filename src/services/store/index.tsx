import { StoreonModule, createStoreon } from 'storeon';
import { useStoreon } from 'storeon/preact';

import type { TPageInitialProps } from 'pages/index';
import {
  getNowPlaying,
  isNowPlayingData,
  TNowPlayingData,
} from 'services/now-playing';
import {
  getDateFromOffset,
  getRandomItem,
  getShuffledArray,
} from 'services/utils';
import {
  ACTIVITIES,
  GREETINGS,
  TAGLINES,
  TALKING_POINTS,
  PREFIXES,
} from 'services/copy';

type TSection = 'about' | 'work';

type TStoreState = TPageInitialProps & {
  greeting: string;
  taglines: string[];
  currentDate: Date;
  statuses: (TNowPlayingData | string)[];
  talkingPoint: string; // wanna chat about ...

  displayedSection: TSection;

  isEasterEggActive: boolean;
  isFocusingOnSomething: boolean;
};

type TStoreEvents = {
  'status/add': TNowPlayingData | string;
  'section/toggle': undefined;
  'section/set': TSection;
  'easter-egg/activate': undefined;
  'focusing/set': boolean;
  'window/focus': undefined;
};

const createSiteStore = (initialProps: TPageInitialProps) => {
  const prefix = getRandomItem(PREFIXES);
  const activity = getRandomItem([
    ...ACTIVITIES,
    new Array(ACTIVITIES.length).fill(initialProps.customStatus), // larger weight for custom status
  ]);

  const status = `${prefix} ${activity}.`;

  const initialState: TStoreState = {
    ...initialProps,
    greeting: getRandomItem(GREETINGS),
    taglines: getShuffledArray(TAGLINES),
    currentDate: getDateFromOffset(initialProps.currentTimezoneOffset),
    statuses: [initialProps.initialNowPlayingData ?? status],
    talkingPoint: getRandomItem(TALKING_POINTS),

    displayedSection: 'about',

    isEasterEggActive: false,
    isFocusingOnSomething: false,
  };

  const siteModule: StoreonModule<TStoreState, TStoreEvents> = (siteStore) => {
    siteStore.on('@init', () => initialState);

    siteStore.on('status/add', (state, newStatus) => ({
      statuses: [...state.statuses, newStatus],
    }));

    siteStore.on('section/toggle', (state) => ({
      displayedSection: state.displayedSection === 'about' ? 'work' : 'about',
    }));

    siteStore.on('section/set', (_, newSection) => ({
      displayedSection: newSection,
    }));

    siteStore.on('easter-egg/activate', () => ({
      isEasterEggActive: true,
    }));

    siteStore.on('focusing/set', (_, focusing) => ({
      isFocusingOnSomething: focusing,
    }));

    siteStore.on('window/focus', async (state) => {
      const updatedNowPlayingData = await getNowPlaying(state.spotifyToken);
      const lastStatus = state.statuses[state.statuses.length - 1];
      const lastNowPlayingData = isNowPlayingData(lastStatus)
        ? lastStatus
        : null;

      if (
        !!updatedNowPlayingData &&
        updatedNowPlayingData.uri !== lastNowPlayingData?.uri
      ) {
        console.debug(
          `Now playing: ${
            updatedNowPlayingData.podcastName ?? updatedNowPlayingData.name
          }`
        );
        siteStore.dispatch('status/add', updatedNowPlayingData);
      }
    });

    siteStore.on('window/focus', (state) => ({
      currentDate: getDateFromOffset(state.currentTimezoneOffset),
    }));
  };

  return createStoreon<TStoreState, TStoreEvents>([siteModule]);
};

const useSiteStore = (...keys: (keyof TStoreState)[]) =>
  useStoreon<TStoreState, TStoreEvents>(...keys);

export { createSiteStore, useSiteStore };
