import { StoreonModule, createStoreon } from 'storeon';
import { useStoreon } from 'storeon/preact';

import { TPageInitialProps } from 'pages/index';
import { TNowPlayingData } from 'services/now-playing';
import { getRandomItem, getShuffledArray } from 'services/utils';
import { ACTIVITIES, GREETINGS, TAGLINES, TALKING_POINTS } from './copy';

type TSection = 'about' | 'work';

type TStoreState = TPageInitialProps & {
  greeting: string;
  taglines: string[];
  statuses: (TNowPlayingData | string)[];
  talkingPoint: string; // wanna chat about ...

  displayedSection: TSection;

  isEasterEggActive: boolean;
  isHoveringLink: boolean;
};

type TStoreEvents = {
  'status/add': TNowPlayingData | string;
  'section/show': TSection;
  'easter-egg/toggle': undefined;
  'link-hover/toggle': undefined;
};

const createSiteStore = (initialProps: TPageInitialProps) => {
  const status = getRandomItem([
    getRandomItem(ACTIVITIES),
    initialProps.customStatus ?? getRandomItem(ACTIVITIES),
  ]);

  const initialState: TStoreState = {
    ...initialProps,
    greeting: getRandomItem(GREETINGS),
    taglines: getShuffledArray(TAGLINES),
    statuses: [initialProps.initialNowPlayingData ?? status],
    talkingPoint: getRandomItem(TALKING_POINTS),

    displayedSection: 'about',

    isEasterEggActive: false,
    isHoveringLink: false,
  };

  const siteModule: StoreonModule<TStoreState, TStoreEvents> = (store) => {
    store.on('@init', () => initialState);
    store.on('status/add', (state, newStatus) => ({
      statuses: [...state.statuses, newStatus],
    }));
    store.on('section/show', (_, sectionName) => ({
      displayedSection: sectionName,
    }));
  };

  return createStoreon<TStoreState, TStoreEvents>([siteModule]);
};

const useSiteStoreValue = (key: keyof TStoreState) =>
  useStoreon<TStoreState, TStoreEvents>(key);

export { createSiteStore, useSiteStoreValue };
