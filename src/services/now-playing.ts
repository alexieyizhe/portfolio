import { getBestTextColor, ProminentOptions } from 'services/color';

type TNowPlayingData = {
  uri: string;
  name: string; // name of song or name of podcast
  artist?: string; // name of artist or undefined if podcast
  coverArtSrc: string;
  coverArtColor: string;
  link: string;
};

const isNowPlayingData = (
  status: string | TNowPlayingData
): status is TNowPlayingData =>
  typeof status === 'object' && !!status.name && !!status.coverArtSrc;

const requestNewToken = async () => {
  const ENCODED_CLIENT_INFO = Buffer.from(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  ).toString('base64');

  const reqBody = Object.entries({
    grant_type: 'refresh_token',
    refresh_token: process.env.REFRESH_TOKEN,
  })
    .map(
      ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    )
    .join('&');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${ENCODED_CLIENT_INFO}`,
    },
    body: reqBody,
  });

  const data = await res.json();

  if (res.status !== 200 && res.ok) {
    throw new Error(`Request error ${res.status}: ${data}`);
  }

  return data;
};

const extractNowPlayingData = (data: any) => {
  switch (data.currently_playing_type) {
    case 'track': {
      const {
        item: {
          uri,
          name,
          album: { images },
          external_urls: { spotify },
          artists: [{ name: artistName }],
        },
      } = data;

      return {
        uri,
        name,
        artist: artistName,
        link: spotify,
        images,
      };
    }
    case 'episode': {
      const {
        item: {
          uri,
          images,
          external_urls: { spotify },
          show: { name },
        },
      } = data;

      return {
        uri,
        name,
        link: spotify,
        images,
      };
    }
  }
};

const getNowPlaying = async (
  accessToken: string,
  colorOptions?: ProminentOptions
): Promise<TNowPlayingData | null> => {
  try {
    const res = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 204) return null; // API returns 204 if nothing is playing

    const data = await res.json();
    if (!res.ok)
      throw new Error(`Request error ${res.status}: ${JSON.stringify(data)}`);

    const { uri, name, artist, link, images } = extractNowPlayingData(data);
    const coverArtSrc = images.find((i: any) => i.width === 64)?.url;
    const coverArtColor = await getBestTextColor(coverArtSrc, colorOptions);

    return {
      uri,
      name,
      artist,
      link,
      coverArtSrc,
      coverArtColor,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export type { TNowPlayingData };
export { isNowPlayingData, requestNewToken, getNowPlaying };
