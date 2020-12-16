import { memo, FC, useEffect, useState } from 'react';
import { styled } from 'goober';
import { prominent } from 'color.js';

import { Link } from 'components/core';
import { rgbToHsl } from 'services/utils';
import { useSiteContext } from 'services/site/context';
import { TNowPlayingData } from 'services/now-playing';

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

const getBestTextColor = (colors: number[][]) => {
  let [bestH, bestS, bestL] = rgbToHsl(colors[0]);
  for (const rgb of colors) {
    const [h, s, l] = rgbToHsl(rgb);
    if (s > 40) {
      [bestH, bestS, bestL] = [h, s, l];
      break;
    }
  }

  return `hsl(${bestH}, ${bestS}%, ${bestL > 60 ? bestL * 0.6 : bestL}%)`;
};

const activityMarkup = (activity: string) => `probably ${activity}`;

const nowPlayingMarkup = (
  { name, artist, link, coverArtSrc }: TNowPlayingData,
  color: string
) => {
  const isTrack = !!artist;
  const action = isTrack ? "jammin' out to " : 'listening to ';
  const label = `${name}${isTrack ? ` by ${artist}` : ''}`;

  return (
    <>
      {action}
      <Link href={link} target="_blank" rel="noopener noreferrer" bare>
        <NowPlayingInfo color={color}>
          {label} <img src={coverArtSrc} />
        </NowPlayingInfo>
      </Link>
    </>
  );
};

const DynamicCurrentStatus: FC = memo(() => {
  const { nowPlaying, activity } = useSiteContext();
  const [coverArtColor, setColor] = useState('#000');
  const statusMarkup = nowPlaying
    ? nowPlayingMarkup(nowPlaying, coverArtColor)
    : activityMarkup(activity);

  useEffect(() => {
    (async () => {
      if (nowPlaying) {
        const colors = await prominent(nowPlaying.coverArtSrc, {
          amount: 3,
          group: 20,
          format: 'array',
          sample: 10,
        });
        const bestTextColor = getBestTextColor(colors as number[][]);
        setColor(bestTextColor);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span>{statusMarkup}</span>;
});

export default DynamicCurrentStatus;
