// from https://css-tricks.com/converting-color-spaces-in-javascript/
const rgbToHsl = ([r, g, b]: number[]) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h: number, s: number, l: number;

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

type Data = Uint8ClampedArray;

type Args = {
  amount: number;
  group: number;
  sample: number;
  /** returns RGBA bytes for an image url; swapped out server-side for sharp */
  getPixels: (src: string) => Promise<Data>;
};
export type ProminentOptions = Partial<Args>;

type Hex = string;
type Input = (Hex | Rgb)[];
type Output = Hex | Rgb | (Hex | Rgb)[];
type Rgb = [r: number, g: number, b: number];

const browserGetPixels = (src: string): Promise<Data> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const img = new Image();

    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      context.drawImage(img, 0, 0);
      resolve(context.getImageData(0, 0, img.width, img.height).data);
    };
    img.onerror = () => reject(Error('Image loading failed.'));
    img.crossOrigin = '';
    img.src = src;
  });

const getArgs = ({
  amount = 3,
  group = 20,
  sample = 10,
  getPixels = browserGetPixels,
}: ProminentOptions = {}): Args => ({
  amount,
  group,
  sample,
  getPixels,
});

const format = (input: Input, args: Args): Output => {
  const list = input.map((val) => {
    return Array.isArray(val) ? val : (val.split(',').map(Number) as Rgb);
  });

  return args.amount === 1 || list.length === 1 ? list[0] : list;
};

const group = (number: number, grouping: number): number => {
  const grouped = Math.round(number / grouping) * grouping;
  return Math.min(grouped, 255);
};

const getProminent = (data: Data, args: Args): Output => {
  const gap = 4 * args.sample;
  const colors: { [key: string]: number } = {};

  for (let i = 0; i < data.length; i += gap) {
    const rgb = [
      group(data[i], args.group),
      group(data[i + 1], args.group),
      group(data[i + 2], args.group),
    ].join();

    colors[rgb] = colors[rgb] ? colors[rgb] + 1 : 1;
  }

  return format(
    Object.entries(colors)
      .sort(([, valA], [, valB]) => (valA > valB ? -1 : 1))
      .slice(0, args.amount)
      .map(([rgb]) => rgb),
    args
  );
};

// from https://github.com/luukdv/color.js
const prominent = async (src: string, opts?: ProminentOptions) => {
  const args = getArgs(opts);
  return getProminent(await args.getPixels(src), args);
};

export const getBestTextColor = async (
  coverArt: string | undefined,
  colorArgs?: ProminentOptions
): Promise<[h: number, s: number, l: number] | undefined> => {
  if (!coverArt) return undefined;

  const colors = (
    (await prominent(coverArt, {
      amount: 3,
      group: 10,
      ...colorArgs,
    })) as number[][]
  ).map(rgbToHsl);

  const saturatedColors = [...colors.filter(([, s]) => s > 10), ...colors];

  return saturatedColors[0] as Rgb;
};
