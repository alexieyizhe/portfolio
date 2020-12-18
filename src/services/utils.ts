import { useEffect } from 'react';

export const getRandomItem = <T = unknown>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getDateInZone = (timeZoneIANA: string): Date => {
  const cur = new Date();

  const dateInTimezone = new Date(
    cur.toLocaleString('en-US', {
      timeZone: timeZoneIANA,
    })
  );

  const diff = cur.getTime() - dateInTimezone.getTime();

  return new Date(cur.getTime() - diff);
};

// from https://css-tricks.com/converting-color-spaces-in-javascript/
export const rgbToHsl = ([r, g, b]: number[]) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
};

export const useVisibilityChange = (
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
  }, []);
};
