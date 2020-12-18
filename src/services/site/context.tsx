import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  FC,
} from 'react';

import type { TPageProps } from 'pages/index';
import type { TNowPlayingData } from 'services/now-playing';
import { getDateInZone, getRandomItem } from 'services/utils';

import { ACTIVITIES, GREETINGS, TAGLINES, TALKING_POINTS } from './copy';

type TSiteContextValue = TPageProps & {
  greeting: string;
  taglines: string[];
  currentDate: Date;
  nowPlaying?: TNowPlayingData;
  activity: string;
  talkingPoint: string; // wanna chat about ...
  spotifyToken: string;

  isEasterEggActive: boolean;
  setIsEasterEggActive: Dispatch<SetStateAction<boolean>>;

  isHoveringLink: boolean;
  setIsHoveringLink: Dispatch<SetStateAction<boolean>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SiteContext = createContext<TSiteContextValue>({} as any);

const useSiteContext = () => useContext(SiteContext);

const greeting = getRandomItem(GREETINGS);
const activity = getRandomItem(ACTIVITIES);
const talkingPoint = getRandomItem(TALKING_POINTS);

const SiteContextProvider: FC<TPageProps> = ({
  currentTimeZone,
  children,
  ...rest
}) => {
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  return (
    <SiteContext.Provider
      value={{
        greeting,
        taglines: TAGLINES,
        currentTimeZone,
        currentDate: getDateInZone(currentTimeZone),
        activity,
        talkingPoint,
        ...rest,

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
