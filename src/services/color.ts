// from https://css-tricks.com/converting-color-spaces-in-javascript/
const rgbToHsl = ([r, g, b]: number[]) => {
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

const rgbToHex = (rgb: Rgb): Hex =>
  `#${rgb
    .map((val) => {
      const hex = val.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('')}`;

type Args = {
  amount: number;
  format: string;
  group: number;
  sample: number;
  canvasBuilder: () => any;
  imageClass: any;
};
type ProminentOptions = Partial<Args>;

type Data = Uint8ClampedArray;
type Handler = (data: Data, args: Args) => Output;
type Hex = string;
type Input = (Hex | Rgb)[];
type Item = Url | HTMLImageElement;
type Output = Hex | Rgb | (Hex | Rgb)[];
type Rgb = [r: number, g: number, b: number];
type Url = string;

const browserCanvasBuilder = () => document.createElement('canvas');

const getSrc = (item: Item): string =>
  typeof item === 'string' ? item : item.src;

const getArgs = ({
  amount = 3,
  format = 'array',
  group = 20,
  sample = 10,
  canvasBuilder = browserCanvasBuilder,
  imageClass = Image,
}: ProminentOptions = {}): Args => ({
  amount,
  format,
  group,
  sample,
  canvasBuilder,
  imageClass,
});

const format = (input: Input, args: Args): Output => {
  const list = input.map((val) => {
    const rgb = Array.isArray(val) ? val : (val.split(',').map(Number) as Rgb);
    return args.format === 'hex' ? rgbToHex(rgb) : rgb;
  });

  return args.amount === 1 || list.length === 1 ? list[0] : list;
};

const group = (number: number, grouping: number): number => {
  const grouped = Math.round(number / grouping) * grouping;
  return Math.min(grouped, 255);
};

const getImageData = (src: Url, args: Args): Promise<Data> =>
  new Promise((resolve, reject) => {
    const canvas = args.canvasBuilder();
    const context = <CanvasRenderingContext2D>canvas.getContext('2d');
    const img = new args.imageClass();

    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      context.drawImage(img as any, 0, 0);

      const data = context.getImageData(0, 0, img.width, img.height).data;

      resolve(data);
    };
    img.onerror = () => reject(Error('Image loading failed.'));
    (img as any).crossOrigin = '';
    img.src = src;
  });

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

const processImage = (
  handler: Handler,
  item: Item,
  opts?: ProminentOptions
): Promise<Output> =>
  new Promise((resolve, reject) =>
    getImageData(getSrc(item), getArgs(opts))
      .then((data) => resolve(handler(data, getArgs(opts))))
      .catch((error) => reject(error))
  );

const prominent = (item: Item, opts?: ProminentOptions) =>
  processImage(getProminent, item, opts);

const getBestTextColor = async (
  coverArt: string | undefined,
  colorArgs?: ProminentOptions
): Promise<string> => {
  if (!coverArt) return '#000';

  const colors = (await prominent(coverArt, {
    amount: 3,
    group: 10,
    format: 'array',
    sample: 10,
    ...colorArgs,
  })) as number[][];

  let [bestH, bestS, bestL] = rgbToHsl(colors[0]);
  for (const rgb of colors) {
    const [h, s, l] = rgbToHsl(rgb);
    if (s > 40) {
      [bestH, bestS, bestL] = [h, s, l];
      break;
    }
  }

  // clamp lightness value to preserve both colorfulness and readability
  return `hsl(${bestH}, ${bestS}%, ${Math.max(Math.min(bestL, 40), 30)}%)`;
};

export default prominent;
export { getBestTextColor, rgbToHex, rgbToHsl };
export type { ProminentOptions };
