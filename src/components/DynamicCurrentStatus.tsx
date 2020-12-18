import { memo, FC, useEffect, useState } from 'react';
import { styled } from 'goober';
import { prominent } from 'color.js';
import { TransitionMotion, spring } from 'react-motion';

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

const NowPlayingInfo = styled<{ color: string }>('span')`
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
  const action = isTrack ? "jammin' out to " : 'listening to ';
  const label = `${name}${isTrack ? ` by ${artist}` : ''}`;

  return (
    <>
      {action}
      <Link href={link} target="_blank" rel="noopener noreferrer" bare>
        <NowPlayingInfo color={coverArtColor}>
          {label} <img src={coverArtSrc} />
        </NowPlayingInfo>
      </Link>
    </>
  );
};

const DynamicCurrentStatus: FC = memo(() => {
  const { nowPlaying, activity } = useSiteContext();
  const [np, setNp] = useState<TNowPlayingDataWithColor>({
    ...nowPlaying,
    coverArtColor: '#000',
  });
  const [otherNp, setOtherNp] = useState<TNowPlayingDataWithColor>({
    ...nowPlaying,
    coverArtColor: '#000',
  });
  const [items, setItems] = useState(['a', 'b']);

  useEffect(() => {
    (async () => {
      setNp({
        ...np,
        coverArtColor: await getBestTextColor(np.coverArtSrc),
      });

      const data = await fetchNowPlaying(np.token);

      setTimeout(() => {
        getBestTextColor(
          'https://i.scdn.co/image/ab67616d00004851f1b41c8370eca6d344394533'
        ).then((color) =>
          setOtherNp({
            name: 'study abroad',
            artist: 'Crucial Star',
            link: 'https://open.spotify.com/track/6O4S5bDDOrhnHcVkwyAx1L',
            coverArtSrc:
              'https://i.scdn.co/image/ab67616d00004851f1b41c8370eca6d344394533',
            token: nowPlaying.token,
            coverArtColor: color,
          })
        );
      }, 2000);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusMarkup = np ? nowPlayingMarkup(np) : `probably ${activity}`;

  return (
    <span>
      {"jammin' out to "}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <>
          <TextLoop
            interval={[3000, -1]}
            children={[
              np.name.split(' ')[num],
              otherNp.name.split(' ')[num] ?? ' ',
            ]}
          />{' '}
        </>
      ))}
      {/* <TransitionMotion
        willEnter={() => ({ opacity: 0 })}
        styles={items.map((item) => ({
          key: item,
          style: { opacity: 1 },
        }))}
      >
        {(interpolatedStyles) => (
          <div>
            {interpolatedStyles.map((config) => {
              console.log(config.key, config.style);
              return (
                <div
                  key={config.key}
                  style={{ ...config.style }}
                  onClick={() => setItems(['a', 'b', 'c'])}
                >
                  {config.key}
                </div>
              );
            })}
          </div>
        )}
      </TransitionMotion> */}
    </span>
  );
});

export default DynamicCurrentStatus;
