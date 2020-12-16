import { FunctionalComponent } from 'preact';
import { styled } from 'goober';
import { useCopyContext } from 'services/copy';
import { TNowPlayingData } from 'services/now-playing';
import { useEffect, useState } from 'react';
import { prominent } from 'color.js';
import { rgbToHsl } from 'services/utils';

const CoverArt = styled('a')`
  position: relative;
  top: 3px;
  width: 18px;

  & > img {
    border-radius: 3px;
    width: 20px;
    transition: transform 100ms;

    &:hover {
      transform: scale(1.1);
    }
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
  const action = isTrack ? "jammin' out" : 'listening to';
  const label = `${name}${isTrack ? ` by ${artist}` : ''}`;

  return (
    <>
      {action} to{' '}
      <span style={{ transition: 'color 1000ms', color }}>{label}</span>{' '}
      <CoverArt href={link} target="_blank" rel="noopener noreferrer">
        <img src={coverArtSrc} />
      </CoverArt>
    </>
  );
};

const DynamicCurrentStatus: FunctionalComponent = () => {
  const { nowPlaying, activity } = useCopyContext();
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
};

export default DynamicCurrentStatus;
