import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

import { MainImg } from 'assets';
import { useCopyContext, TCopyContextValue } from 'services/copy';

const P = styled('p')`
  color: green;
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
    <>
      <P>
        I’m a <span>{taglines[0]}</span> studying computer science at the
        University of Waterloo. It’s currently {currentTime} for me
        {info}
      </P>
      <P>
        Wanna chat about <span>{talkingPoint}</span>? Lets talk. You can reach
        me at <a href="mailto:hi@alexxie.com">hi@alexxie.com</a>.
      </P>
    </>
  );
};

export default Bio;
