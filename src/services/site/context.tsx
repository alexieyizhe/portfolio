import { createContext, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import { Dispatch, SetStateAction, useState } from 'react';

import type { TNowPlayingData } from 'services/now-playing';
import { getDateInZone, getRandomItem } from 'services/utils';

import { ACTIVITIES, GREETINGS, TAGLINES, TALKING_POINTS } from './copy';

type TSiteContextValue = {
  greeting: string;
  taglines: string[];
  currentDate: Date;
  nowPlaying?: TNowPlayingData;
  activity: string;
  talkingPoint: string; // wanna chat about ...

  isEasterEggActive: boolean;
  setIsEasterEggActive: Dispatch<SetStateAction<boolean>>;

  isHoveringLink: boolean;
  setIsHoveringLink: Dispatch<SetStateAction<boolean>>;
};

type SiteContextProviderProps = {
  nowPlayingData: TNowPlayingData;
  currentTimeZone: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SiteContext = createContext<TSiteContextValue>({} as any);

const useSiteContext = () => useContext(SiteContext);

const greeting = getRandomItem(GREETINGS);
const activity = getRandomItem(ACTIVITIES);
const talkingPoint = getRandomItem(TALKING_POINTS);

const SiteContextProvider: FunctionalComponent<SiteContextProviderProps> = ({
  nowPlayingData,
  currentTimeZone,
  children,
}) => {
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  return (
    <SiteContext.Provider
      value={{
        greeting,
        taglines: TAGLINES,
        currentDate: getDateInZone(currentTimeZone),
        nowPlaying: nowPlayingData,
        activity, // todo: add back customStatus
        talkingPoint,

        isEasterEggActive,
        setIsEasterEggActive,

        isHoveringLink,
        setIsHoveringLink,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export { useSiteContext, SiteContextProvider };
export default SiteContext;
