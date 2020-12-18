import { memo, FC, useEffect, useState, useCallback } from 'react';
import { prominent } from 'color.js';

import { rgbToHsl, useVisibilityChange } from 'services/utils';
import { useSiteContext } from 'services/site/context';
import { TNowPlayingData } from 'services/now-playing';
import { fetchNowPlaying } from 'services/now-playing/fetch';
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
  const [np, setNp] = useState<(TNowPlayingData | string)[]>([
    nowPlaying ?? `probably ${activity}`,
  ]);
  const [shouldFetchNew, setShouldFetchNew] = useState(true);

  const refetchNp = useCallback(async () => {
    const lastNp = np[np.length - 1];
    const lastNowPlayingData = typeof lastNp === 'string' ? null : lastNp;
    const updatedNowPlayingData = await fetchNowPlaying(spotifyToken);
    console.debug(updatedNowPlayingData, lastNowPlayingData);

    if (
      updatedNowPlayingData &&
      updatedNowPlayingData.uri !== lastNowPlayingData?.uri
    ) {
      console.debug('New now playing data found...', updatedNowPlayingData);
      const color = await getBestTextColor(updatedNowPlayingData.coverArtSrc);
      setNp((prev) => [
        ...prev,
        {
          ...updatedNowPlayingData,
          coverArtColor: color,
        },
      ]);
    }
  }, [np, spotifyToken]);

  useVisibilityChange((isHidden) => {
    if (!isHidden) {
      console.debug('Received focus, refreshing now playing...');
      setShouldFetchNew(true);
    }
  });

  useEffect(() => {
    (async () => {
      if (shouldFetchNew) {
        await refetchNp();
        setShouldFetchNew(false);
      }
    })();
  }, [refetchNp, shouldFetchNew]);

  const npMarkup = np.map((e) => {
    return typeof e === 'string' ? e.split(' ') : nowPlayingMarkup(e);
  });

  return (
    <span>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
        (i) => {
          return (
            <>
              <TextLoop
                interval={np.map((_, i) => (i === np.length - 1 ? -1 : 2000))} // don't transition from the last data back to the initial data
                children={npMarkup.map((e) => e[i] ?? ' ')}
              />{' '}
            </>
          );
        }
      )}
    </span>
  );
});
// TODO: remove react-motion

export default DynamicCurrentStatus;
