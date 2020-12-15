import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import type { TNowPlayingData } from 'services/now-playing';

type TCopyContextValue = {
  greeting: string;
  taglines: string[];
  currentDate: Date;
  nowPlaying?: TNowPlayingData;
  activity: string;
  talkingPoint: string; // wanna chat about ...
};

const CopyContext = createContext<TCopyContextValue>({} as any); // eslint-disable-line

const useCopyContext = () => useContext(CopyContext);

export { useCopyContext };
export default CopyContext;
