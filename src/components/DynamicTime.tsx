import { FC, useState, useEffect } from 'react';
import TextLoop from 'react-text-loop';

import { useSiteStore } from 'services/store';
import { textLoopIntervals } from 'services/utils';
import GradientText from 'components/GradientText';

type TextGradientInfo = [
  gradientDirection: string,
  gradientFrom: string,
  gradientTo: string
];

const timeToTwelveHour = (hour: number) => {
  const twelveHourTime = hour % 12 || 12; // 0 or 24 becomes 12am
  const timeOfDay = hour < 12 || hour === 24 ? 'AM' : 'PM';
  return `${twelveHourTime}${timeOfDay}`;
};

const timeToGradient = (hour: number, time: string): TextGradientInfo => {
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

    default:
      return [`90deg`, '#000', '#000'];
  }
};

const DynamicTime: FC = () => {
  const { currentDate } = useSiteStore('currentDate');
  const [dates, setDates] = useState<Date[]>([currentDate]);

  useEffect(() => {
    setDates((prev) => {
      const lastDate = prev[prev.length - 1];
      // current date is displayed in UI with a granularity of hours
      const isSameDate = lastDate.getHours() !== currentDate.getHours();

      return isSameDate ? [...prev, currentDate] : prev;
    });
  }, [currentDate]);

  const timeMarkups = dates.map((date) => {
    const hours = date.getHours();
    const timeMarkup = timeToTwelveHour(hours);
    const [angle, fromColor, toColor] = timeToGradient(hours, timeMarkup);
    const gradient = `linear-gradient(${angle}, ${fromColor}, ${toColor})`;

    return (
      <GradientText fallbackColor={fromColor} gradient={gradient}>
        {timeMarkup}
      </GradientText>
    );
  });

  return (
    <TextLoop interval={textLoopIntervals(timeMarkups.length)}>
      {timeMarkups}
    </TextLoop>
  );
};

export default DynamicTime;
