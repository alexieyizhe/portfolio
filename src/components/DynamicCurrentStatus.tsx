import { memo, FC, useEffect, useState, useCallback } from 'react';
import TextLoop from 'react-text-loop';
import { styled } from 'goober';

import { useVisibilityChange } from 'services/utils';
import { useSiteContext } from 'services/site/context';
import {
  TNowPlayingData,
  isNowPlayingData,
  getNowPlaying,
} from 'services/now-playing';

const CoverArtLink = styled('a')`
  position: relative;
  display: inline-block;

  transition: transform 250ms;
  &:hover {
    transform: scale(1.1);
  }

  & img {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    transform: translateY(1px);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

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
  const action = isPodcast ? 'listening to an episode of' : "jammin' out to";
  const label = `${isPodcast ? podcastName : name}${
    hasArtist ? ` by ${artistName}` : ''
  }`;

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
    <CoverArtLink href={link} target="_blank" rel="noreferrer noopener">
      <img src={coverArtSrc} />
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
