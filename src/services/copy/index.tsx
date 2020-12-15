import { h, createContext, FunctionalComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { getDateInZone, getRandomItem } from 'services/utils';
import {
  ACTIVITIES,
  DEFAULT_GREETING,
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
