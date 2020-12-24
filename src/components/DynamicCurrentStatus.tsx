import { memo, FC, useCallback, useEffect } from 'react';
import TextLoop from 'react-text-loop';

import { useStore } from 'services/store';
import { TNowPlayingData, isNowPlayingData } from 'services/now-playing';
import {
  textLoopIntervals,
  TVisibilityChangeHandler,
  useVisibilityChange,
} from 'services/utils';
import CoverArt from 'components/CoverArt';
import { Text } from 'components/core';

const clamp = (v: number, min: number, max: number) =>
  Math.max(Math.min(v, max), min);

const hslColor = (color: TNowPlayingData['coverArtColor'] = [0, 0, 0]) => {
  const [h, s, l] = [
    color[0],
    clamp(color[1], 0, 60),
    // clamp lightness value to make it colorful but still readable
    clamp(color[1], 50, 70),
  ];
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const nowPlayingMarkup = ({
  name,
  artistName,
  podcastName,
  link,
  coverArtSrc,
  coverArtColor,
}: TNowPlayingData) => {
  const isPodcast = !!podcastName;
  const hasArtist = !!artistName;
  const action = isPodcast
    ? "I'm listening to an episode of"
    : "I'm jammin' out to";
  const label = `${isPodcast ? podcastName : name}${
    hasArtist ? ` by ${artistName}` : ''
  }`;
  const color = hslColor(coverArtColor);

  return [
    ...action.split(' '),
    ...label.split(' ').map((s) => (
      <Text
        bold={s !== 'by'}
        style={{
          color,
        }}
      >
        {s}
      </Text>
    )),
    <CoverArt link={link} coverArtSrc={coverArtSrc} color={color} />,
  ];
};

const DynamicCurrentStatus: FC = memo(() => {
  const { dispatch, statuses } = useStore('statuses');
  const statusesMarkup = statuses.map((status) =>
    isNowPlayingData(status) ? nowPlayingMarkup(status) : status.split(' ')
  );

  const visibilityChangeHandler = useCallback<TVisibilityChangeHandler>(
    (isHidden) => {
      if (!isHidden) dispatch('data/refresh');
    },
    [dispatch]
  );

  useVisibilityChange(visibilityChangeHandler);

  useEffect(() => dispatch('data/refresh'), []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span>
      {new Array(Math.max(...statusesMarkup.map((s) => s.length)))
        .fill(null)
        .map((_, wordIdx) => (
          <>
            <TextLoop
              interval={textLoopIntervals(statusesMarkup.length)}
              children={statusesMarkup.map((m) => m[wordIdx] ?? '')}
            />{' '}
          </>
        ))}
    </span>
  );
});

export default DynamicCurrentStatus;
