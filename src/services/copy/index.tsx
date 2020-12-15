import { h, createContext, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import { getDateInZone, getRandomItem } from 'services/utils';
import {
  ACTIVITIES,
  DEFAULT_GREETING,
  GREETINGS,
  TAGLINES,
  TALKING_POINTS,
} from './config';

type TNowPlayingInfo = {
  type: 'now-playing';
  name: string;
  by: string; // artist or author or show or whatnot
};

type TActivityInfo = {
  type: 'activity';
  content: string;
};

export type TCopyContextValue = {
  greeting: string;
  taglines: string[];
  currentDate: Date;
  additionalInfo: TNowPlayingInfo | TActivityInfo;
  talkingPoint: string; // wanna chat about ...
};

const currentEDTDate = getDateInZone('America/Toronto');

const CopyContext = createContext<TCopyContextValue>({
  greeting: DEFAULT_GREETING,
  taglines: TAGLINES,
  currentDate: currentEDTDate,
  additionalInfo: {
    type: 'activity',
    content: ACTIVITIES[0],
  },
  talkingPoint: TALKING_POINTS[0],
});

const useCopyContext = () => useContext(CopyContext);

// todo: actually do stuff here
const CopyContextProvider: FunctionalComponent = ({ children }) => {
  const greeting = getRandomItem(GREETINGS);
  const additionalInfo = {
    type: 'activity' as const,
    content: ACTIVITIES[0],
  };
  const talkingPoint = getRandomItem(TALKING_POINTS);

  return (
    <CopyContext.Provider
      value={{
        greeting,
        taglines: TAGLINES,
        currentDate: currentEDTDate,
        additionalInfo,
        talkingPoint,
      }}
      children={children}
    />
  );
};

export { CopyContextProvider, useCopyContext };
export default CopyContext;
