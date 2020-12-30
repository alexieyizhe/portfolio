import { useCallback, useEffect, useState } from 'react';

import { useSiteStore } from 'services/store';

export const base64Encode = (s: string) => Buffer.from(s).toString('base64');

// transition intervals that cause text-loop to keep transitioning to next status, but DO NOT transition from last back to first
export const textLoopIntervals = (len: number) => [
  ...new Array(len - 1).fill(1500),
  -1,
];

export const getRandomItem = <T = unknown>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getShuffledArray = <T = unknown>(arr: T[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export type TVisibilityChangeHandler = (isHidden: boolean) => unknown;
/**
 * A hook into tab visibility changes through an
 * event handler that receives a flag indicating whether
 * the tab has lost or gained focus.
 */
export const useVisibilityChange = (handler: TVisibilityChangeHandler) => {
  useEffect(() => {
    if (process.browser) {
      handler(false);

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

export const onClickListeners = (handler: () => unknown) => ({
  onClick: handler,
  onKeyDown: (e: React.KeyboardEvent) =>
    e.key === 'Enter' ? handler() : undefined,
});

export const useHoverListeners = () => {
  const [isHovering, setHovering] = useState(false);
  return {
    isHovering,
    setHovering,
    listeners: {
      onMouseEnter: useCallback(() => setHovering(true), []),
      onMouseLeave: useCallback(() => setHovering(false), []),
    },
  };
};

export const useStoreFocusListeners = () => {
  const toggleInterest = useSiteStore((state) => state.toggleInterest);

  return {
    onMouseEnter: () => toggleInterest(true),
    onMouseLeave: () => toggleInterest(false),
  };
};
