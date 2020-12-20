import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  FC,
} from 'react';

import type { TPageProps } from 'pages/index';
import {
  getDateFromOffset,
  getRandomItem,
  getShuffledArray,
} from 'services/utils';

import { ACTIVITIES, GREETINGS, TAGLINES, TALKING_POINTS } from './copy';

type TSiteContextValue = TPageProps & {
  greeting: string;
  taglines: string[];
  currentDate: Date;
  activity: string;
  talkingPoint: string; // wanna chat about ...
  spotifyToken: string;

  isEasterEggActive: boolean;
  setIsEasterEggActive: Dispatch<SetStateAction<boolean>>;

  isHoveringLink: boolean;
  setIsHoveringLink: Dispatch<SetStateAction<boolean>>;
};

const SiteContext = createContext<TSiteContextValue>({} as any);

const useSiteContext = () => useContext(SiteContext);

const greeting = getRandomItem(GREETINGS);
const activity = getRandomItem(ACTIVITIES);
const talkingPoint = getRandomItem(TALKING_POINTS);
const shuffledTaglines = getShuffledArray(TAGLINES);

const SiteContextProvider: FC<TPageProps> = ({
  currentOffset,
  spotifyToken,
  children,
  ...rest
}) => {
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  return (
    <SiteContext.Provider
      value={{
        greeting,
        taglines: shuffledTaglines,
        currentOffset,
        currentDate: getDateFromOffset(currentOffset),
        activity,
        talkingPoint,
        spotifyToken: spotifyToken ?? '',
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
