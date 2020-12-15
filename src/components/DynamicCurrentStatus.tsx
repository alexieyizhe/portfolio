import { FunctionalComponent } from 'preact';
import { styled } from 'goober';
import { useCopyContext } from 'services/copy';
import { TNowPlayingData } from 'services/now-playing';

const CoverArt = styled('a')`
  position: relative;
  top: 3px;
  width: 18px;

  & > img {
    border-radius: 3px;
    width: 18px;
    transition: transform 100ms;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const activityMarkup = (activity: string) => `probably ${activity}`;

const nowPlayingMarkup = ({
  name,
  artist,
  link,
  coverArtSrc,
}: TNowPlayingData) => {
  const isTrack = !!artist;
  const action = isTrack ? "jammin' out" : 'listening to';
  const label = `${name}${isTrack ? ` by ${artist}` : ''}`;

  return (
    <>
      {action} to {label}
      <CoverArt href={link} target="_blank" rel="noopener noreferrer">
        <img src={coverArtSrc} />
      </CoverArt>
    </>
  );
};

const DynamicCurrentStatus: FunctionalComponent = () => {
  const { nowPlaying, activity } = useCopyContext();
  const statusMarkup = nowPlaying
    ? nowPlayingMarkup(nowPlaying)
    : activityMarkup(activity);

  return <span>{statusMarkup}</span>;
};

export default DynamicCurrentStatus;
