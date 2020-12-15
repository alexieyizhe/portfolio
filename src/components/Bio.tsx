import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';
import TextLoop from 'react-text-loop';

import { useCopyContext } from 'services/copy';
import { useNowPlayingContext } from 'services/now-playing';
import { Text } from 'components/core';

const Container = styled('div')`
  margin-top: 1em;

  & span.dynamic {
    font-weight: bold;
  }
`;

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

const timeHourMarkup = (hour: number) => {
  const interpretedHour = hour % 12 || 12; // 0 or 24 becomes 12am
  const timeOfDay = hour < 12 || hour === 24 ? 'AM' : 'PM';
  return `${interpretedHour}${timeOfDay}`;
};

const infoMarkup = ({ name, artist, link, coverArtSrc }: any) => {
  return (
    // todo: this is so ugly
    <>
      {' '}
      and I'm jammin' out to {name} {artist ? ` by ${artist}` : ''}{' '}
      <CoverArt href={link} target="_blank" rel="noopener noreferrer">
        <img src={coverArtSrc} />
      </CoverArt>
    </>
  );
};

const Bio: FunctionalComponent = () => {
  const { taglines, currentDate, talkingPoint } = useCopyContext();
  const nowPlayingData = useNowPlayingContext();

  const currentTime = timeHourMarkup(currentDate.getHours());
  const info = infoMarkup(nowPlayingData);

  return (
    <Container>
      <Text>
        I’m a{' '}
        <span className="dynamic">
          <TextLoop>
            {taglines.map((tl) => (
              <span>{tl}</span>
            ))}
          </TextLoop>
        </span>{' '}
        studying computer science at the University of Waterloo.
      </Text>
      <Text>
        It’s currently <span className="dynamic">{currentTime}</span> for me
        {info}
      </Text>
      <Text>
        Wanna chat about <span className="dynamic">{talkingPoint}</span>? Lets
        talk. You can reach me at{' '}
        <a href="mailto:hi@alexxie.com">hi@alexxie.com</a>.
      </Text>
    </Container>
  );
};

export default Bio;
