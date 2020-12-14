import { h, createContext, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import {
  ACTIVITIES,
  DEFAULT_GREETING,
  TAGLINES,
  TALKING_POINTS,
} from './config';

function changeTimezone(ianatz: string): Date {
  const cur = new Date();

  const dateInTimezone = new Date(
    cur.toLocaleString('en-US', {
      timeZone: ianatz,
    })
  );

  const diff = cur.getTime() - dateInTimezone.getTime();

  return new Date(cur.getTime() - diff);
}

type TInfoType = 'now-playing' | 'activity';

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

const currentEDTDate = changeTimezone('America/Toronto');

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
  return (
    <CopyContext.Provider
      value={{
        greeting: DEFAULT_GREETING,
        taglines: TAGLINES,
        currentDate: currentEDTDate,
        additionalInfo: {
          type: 'activity',
          content: ACTIVITIES[0],
        },
        talkingPoint: TALKING_POINTS[0],
      }}
      children={children}
    />
  );
};

export { CopyContextProvider, useCopyContext };
export default CopyContext;
