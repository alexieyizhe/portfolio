import { memo, FC } from 'react';
import { styled } from 'goober';

import { useSiteContext } from 'services/site/context';

type TextGradientInfo = [
  gradientDirection: string,
  gradientFrom: string,
  gradientTo: string
];

const GradientContainer = styled<{ gradient: TextGradientInfo }>('span')`
  color: ${({ gradient }) => gradient[1]};
  background: ${({ gradient }) =>
    `linear-gradient(${gradient[0]}, ${gradient[1]}, ${gradient[2]})`};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const timeHourMarkup = (hour: number) => {
  const twelveHourTime = hour % 12 || 12; // 0 or 24 becomes 12am
  const timeOfDay = hour < 12 || hour === 24 ? 'AM' : 'PM';
  return `${twelveHourTime}${timeOfDay}`;
};

const timeToColor = (hour: number, time: string): TextGradientInfo => {
  switch (time) {
    case '1AM':
    case '2AM':
    case '3AM':
    case '4AM':
    case '5AM':
      return [`${40 + hour * 2}deg`, '#062B79', '#477792'];

    case '6AM': // sunrise
      return ['35deg', '#477792', '#5995B7'];

    case '7AM': // sunrise
      return ['200deg', '#5995B7', '#FF8C18'];

    case '8AM': // sunrise
      return ['210deg', '#5995B7', '#FFCE32'];

    case '9AM':
    case '10AM':
    case '11AM':
    case '12PM':
    case '1PM':
    case '2PM':
    case '3PM':
    case '4PM':
      return [`${140 + hour * 3}deg`, '#FFCE32', '#45B6F7'];

    case '5PM': // sunset
      return ['120deg', '#5995B7', '#FF8C18'];

    case '6PM': // sunset
      return ['120deg', '#5995B7', '#D36C50'];

    case '7PM': // sunset
      return ['145deg', '#477792', '#A8131C'];

    case '8PM':
      return ['120deg', '#2D1D7A', '#5995B7'];

    case '9PM':
    case '10PM':
      return [`${110 + hour * 2}deg`, '#2D1D7A', '#5995B7'];

    case '11PM':
    case '12AM':
      return [`${110 + hour * 2}deg`, '#271F3F', '#062B79'];
  }
};

const DynamicTime: FC = memo(() => {
  const { currentDate } = useSiteContext();
  const timeMarkup = timeHourMarkup(currentDate.getHours());
  const gradient = timeToColor(currentDate.getHours(), timeMarkup);

  return (
    <GradientContainer gradient={gradient}>{timeMarkup}</GradientContainer>
  );
});

export default DynamicTime;
