import { memo, FC, useState, useCallback } from 'react';
import TextLoop from 'react-text-loop';

import { TNowPlayingData, isNowPlayingData, getNowPlaying } from 'services/api';
import {
  getRandomItem,
  textLoopIntervals,
  TVisibilityChangeHandler,
  useVisibilityChange,
} from 'services/utils';
import CoverArt from 'components/CoverArt';
import { Text } from 'components/core';
import { useInitialProps } from 'services/context/initial-props';
import { ACTIVITIES, PREFIXES } from 'services/copy';

const clamp = (v: number, min: number, max: number) =>
  Math.max(Math.min(v, max), min);

const hslColor = (color: TNowPlayingData['coverArtColor'] = [0, 0, 0]) => {
  const [h, s, l] = [
    color[0],
    clamp(color[1], 0, 60),
    // clamp lightness for colorful but still readable text
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
    <CoverArt
      link={link}
      coverArtSrc={coverArtSrc}
      color={color}
      isPodcast={isPodcast}
    />,
  ];
};

const printNowPlaying = ({
  name,
  artistName,
  podcastName,
  coverArtColor,
}: TNowPlayingData) => {
  const color = hslColor(coverArtColor);
  console.log(
    `Now Playing:\n%c${podcastName ?? name}%c by %c${artistName}`,
    `font-weight: bold; font-style: italic; background-color: ${color}; color: white; padding: 2px 0 2px 5px`,
    `font-weight: normal; font-style: italic; background-color: ${color}; color: white; padding: 2px 0`,
    `font-weight: bold; font-style: italic; background-color: ${color}; color: white; padding: 2px 5px 2px 0`
  );
};

const getInitialStatus = (initialStatus: string | null) => {
  const prefix = getRandomItem(PREFIXES);
  const activity = getRandomItem([
    ...ACTIVITIES,
    ...(initialStatus
      ? new Array(ACTIVITIES.length).fill(initialStatus) // larger weight for custom status
      : []),
  ]);

  return `${prefix} ${activity}.`;
};

const refreshAndGetNowPlaying = async () => {
  try {
    const res = await fetch('/api/spotify-token', {
      method: 'GET',
    });

    if (res.status === 200) {
      const token = ((await res.json()) as { token: string | null }).token;
      return await getNowPlaying(token);
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const useStatuses = () => {
  const {
    initialNowPlayingData,
    customStatus,
    spotifyToken,
  } = useInitialProps();

  const [statuses, setStatuses] = useState([
    initialNowPlayingData ?? getInitialStatus(customStatus),
  ]);

  const updateNowPlaying = useCallback<TVisibilityChangeHandler>(
    async (isHidden) => {
      if (!isHidden) {
        const nowPlayingData = await getNowPlaying(spotifyToken);
        const updatedNowPlayingData =
          nowPlayingData !== undefined
            ? nowPlayingData
            : await refreshAndGetNowPlaying(); // try refetching if spotify token is expired
        const lastStatus = statuses[statuses.length - 1];
        const lastNowPlayingData = isNowPlayingData(lastStatus)
          ? lastStatus
          : null;

        if (
          !!updatedNowPlayingData &&
          updatedNowPlayingData.uri !== lastNowPlayingData?.uri
        ) {
          printNowPlaying(updatedNowPlayingData);
          setStatuses((prev) => [...prev, updatedNowPlayingData]);
        }
      }
    },
    [spotifyToken, statuses]
  );

  useVisibilityChange(updateNowPlaying);

  return statuses;
};

const DynamicCurrentStatus: FC = memo(() => {
  const statuses = useStatuses();
  const statusesMarkup = statuses.map((status) =>
    isNowPlayingData(status) ? nowPlayingMarkup(status) : status.split(' ')
  );

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
