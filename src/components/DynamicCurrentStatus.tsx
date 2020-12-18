import { memo, FC, useEffect, useState, useCallback } from 'react';
import { prominent } from 'color.js';

import { rgbToHsl, useVisibilityChange } from 'services/utils';
import { useSiteContext } from 'services/site/context';
import {
  isNowPlayingData,
  fetchNowPlaying,
  TNowPlayingData,
} from 'services/now-playing/fetch';
import TextLoop from 'react-text-loop';

const getBestTextColor = async (coverArt: string) => {
  const colors = (await prominent(coverArt, {
    amount: 3,
    group: 20,
    format: 'array',
    sample: 10,
  })) as number[][];

  let [bestH, bestS, bestL] = rgbToHsl(colors[0]);
  for (const rgb of colors) {
    const [h, s, l] = rgbToHsl(rgb);
    if (s > 40) {
      [bestH, bestS, bestL] = [h, s, l];
      break;
    }
  }

  // upper bound lightness value at 40 to make it readable
  return `hsl(${bestH}, ${bestS}%, ${Math.min(bestL, 40)}%)`;
};

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
    ...action.split(' ').map((a) => <span style={{ color: '#000' }}>{a}</span>),
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
    const updatedNowPlayingData = await fetchNowPlaying(spotifyToken);

    if (
      updatedNowPlayingData &&
      updatedNowPlayingData.uri !== lastNowPlayingData?.uri
    ) {
      console.debug('New now playing data found...', updatedNowPlayingData);
      const color = await getBestTextColor(updatedNowPlayingData.coverArtSrc);
      setStatuses((prev) => [
        ...prev,
        {
          ...updatedNowPlayingData,
          coverArtColor: color,
        },
      ]);
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
