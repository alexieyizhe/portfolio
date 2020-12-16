import { styled } from 'goober';
import { FunctionalComponent } from 'preact';

import { useCopyContext } from 'services/copy';

type TextGradientInfo = [
  gradientDirection: string,
  gradientFrom: string,
  gradientTo: string
];

const GradientContainer = styled<{ gradient: TextGradientInfo }>('span')`
  color: ${({ gradient }) => gradient[1]};
  background: ${({ gradient }) =>
    `linear-gradient(${gradient[0]}, ${gradient[1]}, ${gradient[2]})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const timeHourMarkup = (hour: number) => {
  const twelveHourTime = hour % 12 || 12; // 0 or 24 becomes 12am
  const timeOfDay = hour < 12 || hour === 24 ? 'AM' : 'PM';
  return `${twelveHourTime}${timeOfDay}`;
};

// TODO: fill this
const timeToColor = (hour: number, time: string): TextGradientInfo => {
  switch (time) {
    case '1AM':
    case '2AM':
    case '3AM':
    case '4AM':
    case '5AM':
      return ['45deg', '#000', '#aaa'];

    case '6AM': // sunrise
      return ['0deg', '#000', '#aaa'];

    case '7AM': // sunrise
      return ['0deg', '#000', '#aaa'];

    case '8AM': // sunrise
      return ['0deg', '#000', '#aaa'];

    case '9AM':
    case '10AM':
      return ['0deg', '#000', '#aaa'];

    case '11AM':
    case '12PM':
    case '1PM':
      return ['0deg', '#000', '#aaa'];

    case '2PM':
    case '3PM':
    case '4PM':
      return ['0deg', '#000', '#aaa'];

    case '5PM': // sunset
      return ['0deg', '#000', '#aaa'];

    case '6PM': // sunset
      return ['0deg', '#000', '#aaa'];

    case '7PM': // sunset
      return ['0deg', '#000', '#aaa'];

    case '8PM':
    case '9PM':
    case '10PM':
      return ['30deg', '#000', '#aaa'];

    case '11PM':
    case '12AM':
      return ['0deg', '#000', '#aaa'];

    default:
      return ['0deg', '#000', '#aaa'];
  }
};

const DynamicTime: FunctionalComponent = () => {
  const { currentDate } = useCopyContext();
  const timeMarkup = timeHourMarkup(currentDate.getHours());
  const gradient = timeToColor(currentDate.getHours(), timeMarkup);

  return (
    <GradientContainer gradient={gradient}>{timeMarkup}</GradientContainer>
  );
};

export default DynamicTime;
