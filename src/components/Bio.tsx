import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

import { useCopyContext, TCopyContextValue } from 'services/copy';

const Container = styled('div')`
  margin-top: 1em;

  font-size: 18px;
  color: green;

  & span.dynamic {
    font-weight: bold;
  }
`;

const timeHourMarkup = (hour: number) => {
  const interpretedHour = hour % 12 || 12; // 0 or 24 becomes 12am
  const timeOfDay = hour < 12 || hour === 24 ? 'AM' : 'PM';
  return `${interpretedHour}${timeOfDay}`;
};

const infoMarkup = (info: TCopyContextValue['additionalInfo']) => {
  switch (info.type) {
    case 'activity':
      return `; if you can’t reach me right now, there’s a good chance I’m ${info.content}`;
    case 'now-playing':
      return ` and I'm jammin' out to ${info.name} by ${info.by}`;
  }
};

const Bio: FunctionalComponent = () => {
  const {
    taglines,
    currentDate,
    additionalInfo,
    talkingPoint,
  } = useCopyContext();

  const currentTime = timeHourMarkup(currentDate.getHours());
  const info = infoMarkup(additionalInfo);

  return (
    <Container>
      <p>
        I’m a <span className="dynamic">{taglines[0]}</span> studying computer
        science at the University of Waterloo.
      </p>
      <p>
        It’s currently <span className="dynamic">{currentTime}</span> for me
        {info}
      </p>
      <p>
        Wanna chat about <span className="dynamic">{talkingPoint}</span>? Lets
        talk. You can reach me at{' '}
        <a href="mailto:hi@alexxie.com">hi@alexxie.com</a>.
      </p>
    </Container>
  );
};

export default Bio;
