import { StoreonModule } from 'storeon';

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

type TSiteModuleState = TPageInitialProps & {
  greeting: string;
  taglines: string[];
  currentDate: Date;
  statuses: (TNowPlayingData | string)[];
  talkingPoint: string; // wanna chat about ...

  displayedSection: TSection;

  isEasterEggActive: boolean;
  isFocusingOnSomething: boolean;
};

type TSiteModuleEvents = {
  'status/add': TNowPlayingData | string;
  'section/toggle': undefined;
  'section/set': TSection;
  'easter-egg/toggle': undefined;
  'focusing/set': boolean;
  'data/refresh': undefined;
};

const createSiteModule = (initialProps: TPageInitialProps) => {
  const prefix = getRandomItem(PREFIXES);
  const activity = getRandomItem([
    ...ACTIVITIES,
    ...(initialProps.customStatus
      ? new Array(ACTIVITIES.length).fill(initialProps.customStatus) // larger weight for custom status
      : []),
  ]);

  const status = `${prefix} ${activity}.`;

  const initialState: TSiteModuleState = {
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

  const siteModule: StoreonModule<TSiteModuleState, TSiteModuleEvents> = (
    siteStore
  ) => {
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

    siteStore.on('easter-egg/toggle', (state) => ({
      isEasterEggActive: !state.isEasterEggActive,
    }));

    siteStore.on('focusing/set', (_, focusing) => ({
      isFocusingOnSomething: focusing,
    }));

    siteStore.on('data/refresh', async (state) => {
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

    siteStore.on('data/refresh', (state) => ({
      currentDate: getDateFromOffset(state.currentTimezoneOffset),
    }));
  };

  return siteModule;
};

export type { TSiteModuleState, TSiteModuleEvents };
export { createSiteModule };
