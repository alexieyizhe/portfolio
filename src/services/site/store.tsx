import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  FC,
  useMemo,
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
  status: string;
  talkingPoint: string; // wanna chat about ...
  spotifyToken: string;

  displayedSection: 'about' | 'work';
  setDisplayedSection: Dispatch<SetStateAction<'about' | 'work'>>;

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
  customStatus,
  spotifyToken,
  children,
  ...rest
}) => {
  const [displayedSection, setDisplayedSection] = useState<'about' | 'work'>(
    'about'
  );
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const status = useMemo(
    () =>
      getRandomItem([`probably ${activity}`, customStatus].filter((s) => !!s)),
    [customStatus]
  ) as string;

  return (
    <SiteContext.Provider
      value={{
        greeting,
        taglines: shuffledTaglines,
        currentOffset,
        customStatus,
        currentDate: getDateFromOffset(currentOffset),
        status,
        talkingPoint,
        spotifyToken: spotifyToken ?? '',
        ...rest,

        displayedSection,
        setDisplayedSection,

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
