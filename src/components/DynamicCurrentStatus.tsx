import { memo, FC, useEffect, useState, useMemo } from 'react';
import { styled } from 'goober';
import { prominent } from 'color.js';

import { Link } from 'components/core';
import { rgbToHsl } from 'services/utils';
import { useSiteContext } from 'services/site/context';
import { TNowPlayingData } from 'services/now-playing';
import TextLoop from 'react-text-loop';

type TNowPlayingDataWithColor = TNowPlayingData & { coverArtColor: string };

const fetchNowPlaying = async (accessToken: string) => {
  try {
    const res = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 204) return null; // API returns 204 if nothing is playing

    const data = await res.json();
    if (!res.ok)
      throw new Error(`Request error ${res.status}: ${JSON.stringify(data)}`);

    switch (data.currently_playing_type) {
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
          coverArtSrc: images.find((i) => i.width === 64)?.url,
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
          coverArtSrc: images.find((i) => i.width === 64)?.url,
        };
      }
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

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
}: TNowPlayingDataWithColor) => {
  const isTrack = !!artist;
  const action = isTrack ? "jammin' out to" : 'listening to';
  const label = `${name}${isTrack ? ` by ${artist}` : ''}`;

  console.log(coverArtColor);
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

const Container = styled('div')<{ color: string }>`
  color: ${({ color }) => color};
`;

const DynamicCurrentStatus: FC = memo(() => {
  const { nowPlaying, activity, spotifyToken } = useSiteContext();
  const [np, setNp] = useState<JSX.Element[][]>([
    nowPlaying
      ? nowPlayingMarkup(nowPlaying)
      : (`probably ${activity}`.split(' ') as any),
  ]);

  useEffect(() => {
    (async () => {
      // todo: clean this up
      // if (nowPlaying) {
      //   const col = await getBestTextColor(nowPlaying.coverArtSrc);
      //   console.log(col);
      //   setNp((prev) => [
      //     ...prev,
      //     nowPlayingMarkup({
      //       ...nowPlaying,
      //       coverArtColor: col,
      //     }),
      //   ]);
      // }

      const updatedNowPlayingData = await fetchNowPlaying(spotifyToken);
      console.log(updatedNowPlayingData);

      if (
        updatedNowPlayingData &&
        updatedNowPlayingData.name !== nowPlaying?.name
      ) {
        getBestTextColor(updatedNowPlayingData.coverArtSrc).then((color) =>
          setNp((prev) => [
            ...prev,
            nowPlayingMarkup({
              ...updatedNowPlayingData,
              coverArtColor: color,
            }),
          ])
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(np);
  return (
    <span>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
        (i) => {
          return (
            <>
              <TextLoop
                interval={np.map((_, i) => (i === np.length - 1 ? -1 : 500))} // don't transition from the last data back to the initial data
                children={np.map((e) => e?.[i] ?? ' ')}
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
