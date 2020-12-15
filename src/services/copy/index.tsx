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
  name: string; // name of song or name of podcast
  artist?: string; // name of artist or undefined if podcast
  coverArtSrc: string;
  link: string;
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

    const isPlaying = res.status === 200; // API returns 204 if nothing is playing

    if (!isPlaying) return null;

    const data = await res.json();

    switch (data.currently_playing_type as 'track' | 'episode') {
      case 'track': {
        const {
          item: {
            name,
            album: { images },
            external_urls: { spotify },
            artists: [{ name: artistName }],
          },
        } = data;
        return {
          name,
          artist: artistName,
          link: spotify,
          coverArtSrc: images.find((i: any) => i.width === 64)?.url,
        };
      }
      case 'episode': {
        const {
          item: {
            images,
            external_urls: { spotify },
            show: { name },
          },
        } = data;

        return {
          name,
          link: spotify,
          coverArtSrc: images.find((i: any) => i.width === 64)?.url,
        };
      }
    }
  } catch (e) {
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


export { useCopyContext };
export default CopyContext;
