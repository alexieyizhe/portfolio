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
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
};
