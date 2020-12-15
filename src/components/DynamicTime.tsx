import { FunctionalComponent } from 'preact';

import { useCopyContext } from 'services/copy';

const timeHourMarkup = (hour: number) => {
  const twelveHourTime = hour % 12 || 12; // 0 or 24 becomes 12am
  const timeOfDay = hour < 12 || hour === 24 ? 'AM' : 'PM';
  return `${twelveHourTime}${timeOfDay}`;
};

const DynamicTime: FunctionalComponent = () => {
  const { currentDate } = useCopyContext();
  const timeMarkup = timeHourMarkup(currentDate.getHours());

  return <span>{timeMarkup}</span>;
};

export default DynamicTime;
