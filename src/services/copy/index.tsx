import { h, createContext, FunctionalComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { getDateInZone, getRandomItem } from 'services/utils';
import {
  ACTIVITIES,
  DEFAULT_GREETING,
  GREETINGS,
  TAGLINES,
  TALKING_POINTS,
} from './config';

type TNowPlayingData = {
  name: string;
  by: string; // artist or author or show or whatnot
};

type TNowPlayingInfo = {
  type: 'now-playing';
} & TNowPlayingData;

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

// returns null if nothing is playing
const getNowPlaying = async (): Promise<TNowPlayingData | null | undefined> => {
  try {
    const res = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer BQAi3hZsf1Ofo7O9H3mDNBsnLpWn7W6eubO0NxgquXyWnn6Ee9yzBL661BtcG5_pY4f8l-J0PepJc1OmXkYFU9Y3yhUFuHsoQtxP3dJgj3kdPkicd7wLF9XvsYfqHVI3-se6dzvODgP46v7crn0GiUGIZhm4y10bOL4BvZKacA`,
        },
      }
    );
    console.log(res);

    const isPlaying = res.status === 200; // API returns 204 if nothing is playing

    if (!isPlaying) return null;

    console.log(await res.json());

    const {
      item: {
        name,
        artists: [{ name: artistName }],
      },
    } = await res.json();

    return {
      name,
      by: artistName,
    };
  } catch {
    return undefined;
  }
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
  const [nowPlayingData, setNowPlayingData] = useState<
    TNowPlayingData | undefined | null
  >(undefined);

  const greeting = getRandomItem(GREETINGS);
  const talkingPoint = getRandomItem(TALKING_POINTS);

  const additionalInfo =
    nowPlayingData === undefined
      ? { type: 'activity' as const, content: ACTIVITIES[0] }
      : nowPlayingData === null
      ? { type: 'activity' as const, content: ACTIVITIES[0] }
      : { type: 'now-playing' as const, ...nowPlayingData };

  useEffect(() => {
    (async function fetchNowPlaying() {
      const nowPlaying = await getNowPlaying();
      setNowPlayingData(nowPlaying);
    })();
  }, []);

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
