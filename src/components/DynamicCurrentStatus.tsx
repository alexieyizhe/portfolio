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

// TODO: add color and album cover art back
const NowPlayingInfo = styled<
  { color: string } & React.ComponentPropsWithoutRef<'a'>
>('a')`
  position: relative;
  transition: color 1s;
  color: ${({ color }) => color};

  & > img {
    position: relative;
    top: 3px;
    border-radius: 3px;
    width: 20px;
    transition: transform 250ms;
  }

  &:hover > img {
    transform: scale(1.1);
  }
`;

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

  return [...action.split(' '), ...label.split(' ')];
};

const DynamicCurrentStatus: FC = memo(() => {
  const { nowPlaying, activity, spotifyToken } = useSiteContext();
  const [np, setNp] = useState<TNowPlayingData>(nowPlaying);
  const [updatedNp, setUpdatedNp] = useState<TNowPlayingData>(null);

  useEffect(() => {
    (async () => {
      // todo: clean this up
      if (np) {
        setNp({
          ...np,
          coverArtColor: await getBestTextColor(np.coverArtSrc),
        });
      }

      const updatedNowPlayingData = await fetchNowPlaying(spotifyToken);
      console.log(updatedNowPlayingData);

      if (updatedNowPlayingData) {
        getBestTextColor(updatedNowPlayingData.coverArtSrc).then((color) =>
          setUpdatedNp({
            ...updatedNowPlayingData,
            coverArtColor: color,
          })
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markup = np ? nowPlayingMarkup(np) : `probably ${activity}`.split(' ');
  const updatedMarkup = updatedNp ? nowPlayingMarkup(updatedNp) : [];

  return (
    <span>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => {
        return (
          <>
            <TextLoop
              interval={[updatedMarkup.length > 0 ? 3000 : -1, -1]} // don't transition from the updated data back to the initial data
              children={[markup[num] ?? ' ', updatedMarkup[num] ?? ' ']}
            />{' '}
          </>
        );
      })}
    </span>
  );
});
// TODO: remove react-motion

export default DynamicCurrentStatus;
