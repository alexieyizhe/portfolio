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
      // react-text-loop doesn't play well with goober, so we need to use inline styles
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
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      />
    </CoverArtLink>,
  ];
};

const DynamicCurrentStatus: FC = memo(() => {
  const { nowPlayingData, activity, spotifyToken } = useSiteContext();
  const [statuses, setStatuses] = useState<(TNowPlayingData | string)[]>([
    nowPlayingData ?? `probably ${activity}`,
  ]);

  const refetchNp = useCallback(async () => {
    const updatedNowPlayingData = await getNowPlaying(spotifyToken);

    const lastStatus = statuses[statuses.length - 1];
    const lastNowPlayingData = isNowPlayingData(lastStatus) ? lastStatus : null;
    const hasNewNowPlayingData =
      !!updatedNowPlayingData &&
      updatedNowPlayingData.uri !== lastNowPlayingData?.uri;

    if (hasNewNowPlayingData) {
      console.debug('New now playing data found...', updatedNowPlayingData);
      setStatuses((prev) => [...prev, updatedNowPlayingData]);
    }
  }, [statuses, spotifyToken]);

  /**
   *Refetch what's currently playing on Spotify when tab receives focus, and on mount.
   */
  useVisibilityChange((isHidden) => {
    if (!isHidden) {
      console.debug('Received focus, refreshing now playing...');
      refetchNp();
    }
  });

  useEffect(() => {
    refetchNp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusesMarkup = statuses.map((status) =>
    isNowPlayingData(status) ? nowPlayingMarkup(status) : status.split(' ')
  );

  return (
    <span>
      {new Array(Math.max(...statusesMarkup.map((s) => s.length)))
        .fill('')
        .map((_, wordIdx) => {
          return (
            <>
              <TextLoop
                // transition to next status, but don't transition from last back to first
                interval={statuses.map((_, i) =>
                  i === statuses.length - 1 ? -1 : 1000
                )}
                children={statusesMarkup.map((m) => m[wordIdx] ?? '')}
              />{' '}
            </>
          );
        })}
    </span>
  );
});

export default DynamicCurrentStatus;
