import sharp from 'sharp';

import { getNowPlaying } from 'services/api';

// there's no DOM canvas server-side, so decode cover art with sharp instead
const getPixels = async (src: string): Promise<Uint8ClampedArray> => {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Cover art fetch failed: ${res.status}`);

  const data = await sharp(Buffer.from(await res.arrayBuffer()))
    .ensureAlpha()
    .raw()
    .toBuffer();

  return new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength);
};

export const getNowPlayingDataServerSide = async (accessToken: string | null) =>
  getNowPlaying(accessToken, { getPixels });
