import { memo, FC, useEffect, useState, useCallback } from 'react';
import TextLoop from 'react-text-loop';

import { useVisibilityChange } from 'services/utils';
import { useSiteContext } from 'services/site/context';
import {
  TNowPlayingData,
  isNowPlayingData,
  getNowPlaying,
} from 'services/now-playing';

const CoverArtLink = ({ href, children }) => {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        transform: `scale(${hover ? 1.1 : 1})`,
        transition: 'transform 250ms',
      }}
    >
      {children}
    </a>
  );
};

const nowPlayingMarkup = ({
  name,
  artist,
  link,
  coverArtSrc,
  coverArtColor,
}: TNowPlayingData) => {
  const isTrack = !!artist;
  const action = isTrack ? "jammin' out to" : 'listening to';
  const label = `${name}${isTrack ? ` by ${artist}` : ''}`;

  return [
    ...action.split(' ').map((a) => <span>{a}</span>),
    ...label.split(' ').map((a) => (
      <span
        className="dynamic"
        style={{ color: coverArtColor, transition: 'color 1s' }}
      >
        {a}
      </span>
    )),
    <CoverArtLink href={link}>
      <img
        src={coverArtSrc}
        style={{
          height: '18px',
          borderRadius: '3px',
          transform: 'translateY(1px)',
        }}
      />
    </CoverArtLink>,
  ];
};

const DynamicCurrentStatus: FC = memo(() => {
  const { nowPlaying, activity, spotifyToken } = useSiteContext();
  const [statuses, setStatuses] = useState<(TNowPlayingData | string)[]>([
    nowPlaying ?? `probably ${activity}`,
  ]);
  const [shouldFetchNew, setShouldFetchNew] = useState(true);

  const refetchNp = useCallback(async () => {
    const lastStatus = statuses[statuses.length - 1];
    const lastNowPlayingData = isNowPlayingData(lastStatus) ? lastStatus : null;
    const updatedNowPlayingData = await getNowPlaying(spotifyToken);

    if (
      updatedNowPlayingData &&
      updatedNowPlayingData.uri !== lastNowPlayingData?.uri
    ) {
      console.debug('New now playing data found...', updatedNowPlayingData);
      setStatuses((prev) => [...prev, updatedNowPlayingData]);
    }
  }, [statuses, spotifyToken]);

  /**
   * Indicate that we should refetch now playing data when tab receives focus.
   * We don't use `refetchNp` to update status directly here because
   * `useVisibilityChange` takes in a function that forms a closure
   * over the original state of `refetchNp`, not the most updated state.
   */
  useVisibilityChange((isHidden) => {
    if (!isHidden) {
      console.debug('Received focus, refreshing now playing...');
      setShouldFetchNew(true);
    }
  });

  /**
   * Refetch what's currently playing on Spotify when it's indicated we should do so.
   */
  useEffect(() => {
    (async () => {
      if (shouldFetchNew) {
        await refetchNp();
        setShouldFetchNew(false);
      }
    })();
  }, [refetchNp, shouldFetchNew]);

  const npMarkup = statuses.map((e) =>
    typeof e === 'string' ? e.split(' ') : nowPlayingMarkup(e)
  );

  return (
    <span>
      {new Array(20).fill('').map((_, wordIdx) => {
        return (
          <>
            <TextLoop
              // transition to next status, but don't transition from last back to first
              interval={statuses.map((_, i) =>
                i === statuses.length - 1 ? -1 : 2000
              )}
              children={npMarkup.map((e) => e[wordIdx] ?? '')}
            />{' '}
          </>
        );
      })}
    </span>
  );
});

export default DynamicCurrentStatus;
