import { useEffect } from 'react';

// transition intervals that cause text-loop to keep transitioning to next status, but DO NOT transition from last back to first
const textLoopIntervals = (len: number) => [
  ...new Array(len - 1).fill(1500),
  -1,
];

const getRandomItem = <T = unknown>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const getShuffledArray = <T = unknown>(arr: T[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

/**
 * Compute current Date in the time zone provided by offset mins
 */
const getDateFromOffset = (offsetMins: string): Date => {
  const offsetMinsNum = Number(offsetMins);

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
  return curUTC;
};

type TVisibilityChangeHandler = (isHidden: boolean) => unknown;
/**
 * A hook into tab visibility changes through an
 * event handler that receives a flag indicating whether
 * the tab has lost or gained focus.
 */
const useVisibilityChange = (handler: TVisibilityChangeHandler) => {
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
        const onVisibilityChange = () => handler((document as any)[hidden]);

        document.addEventListener(CHANGE_EVENT_NAME, onVisibilityChange, false);
        return () =>
          document.removeEventListener(
            CHANGE_EVENT_NAME,
            onVisibilityChange,
            false
          );
      }
    }
  }, [handler]);
};

export type { TVisibilityChangeHandler };
export {
  textLoopIntervals,
  getRandomItem,
  getShuffledArray,
  getDateFromOffset,
  useVisibilityChange,
};
