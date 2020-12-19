import { useEffect } from 'react';

const getRandomItem = <T = unknown>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

/**
 * Compute current Date in the time zone provided by offset mins
 */
export const getDateFromOffset = (offsetMins: string): Date => {
  const offsetMinsNum = Number(offsetMins);

  console.log(offsetMins);
  const now = new Date();
  const curUTC = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  );
  curUTC.setMinutes(curUTC.getMinutes() + offsetMinsNum);
  console.log(curUTC.toString());
  return curUTC;
};

/**
 * Compute a Date set to the current time in a time zone string
 * @param timeZoneIANA IANA time zone string
 */
const getDateInZone = (timeZoneIANA: string): Date => {
  const cur = new Date();
  const dateInTimezone = new Date(
    cur.toLocaleString('en-US', {
      timeZone: timeZoneIANA,
    })
  );
  const diff = cur.getTime() - dateInTimezone.getTime();
  return new Date(cur.getTime() - diff);
};

/**
 * A hook into tab visibility changes through an
 * event handler that receives a flag indicating whether
 * the tab has lost or gained focus
 */
const useVisibilityChange = (
  visibilityChangeHandler: (isHidden: boolean) => void
) => {
  useEffect(() => {
    if (process.browser) {
      const [hidden, CHANGE_EVENT_NAME] =
        typeof document.hidden !== 'undefined'
          ? ['hidden', 'visibilitychange']
          : typeof (document as any).msHidden !== 'undefined'
          ? ['msHidden', 'msvisibilitychange']
          : typeof (document as any).webkitHidden !== 'undefined'
          ? ['webkitHidden', 'webkitvisibilitychange']
          : [undefined, undefined];

      if (hidden && CHANGE_EVENT_NAME) {
        const onVisibilityChange = () =>
          visibilityChangeHandler(document[hidden]);

        document.addEventListener(CHANGE_EVENT_NAME, onVisibilityChange, false);
        return () =>
          document.removeEventListener(
            CHANGE_EVENT_NAME,
            onVisibilityChange,
            false
          );
      }
    }
  }, [visibilityChangeHandler]);
};

export { getRandomItem, getDateInZone, useVisibilityChange };
