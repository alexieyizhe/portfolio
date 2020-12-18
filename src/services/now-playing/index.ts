import { StorageKey } from 'services/storage';

export type TNowPlayingData = {
  name: string; // name of song or name of podcast
  artist?: string; // name of artist or undefined if podcast
  coverArtSrc: string;
  link: string;
  token: string;
};

const requestNewToken = async () => {
  try {
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

    if (res.status === 200 && res.ok) {
      return data;
    }
    throw new Error(`Request error ${res.status}: ${data}`);
  } catch (e) {
    console.error(`Encountered error attempting to refresh access token: ${e}`);
  }
};

const fetchNowPlaying = async (accessToken: string) => {
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

    switch (data.currently_playing_type) {
      case 'track': {
        const {
          item: {
            name,
            album: { images },
            external_urls: { spotify },
            artists: [{ name: artistName }],
          },
        } = data;
        return {
          name,
          artist: artistName,
          link: spotify,
          coverArtSrc: images.find((i) => i.width === 64)?.url,
        };
      }
      case 'episode': {
        const {
          item: {
            images,
            external_urls: { spotify },
            show: { name },
          },
        } = data;

        return {
          name,
          link: spotify,
          coverArtSrc: images.find((i) => i.width === 64)?.url,
        };
      }
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

const getNowPlayingData = async (client): Promise<TNowPlayingData> => {
  const accessTokenExpiry = await client.get(StorageKey.ACCESS_TOKEN_EXPIRY);
  console.debug(
    `Existing token expires at ${new Date(
      Number(accessTokenExpiry)
    ).toLocaleString()}`
  );

  if (Number(accessTokenExpiry) < Date.now()) {
    console.debug('Access token expired, requesting new');
    const { access_token } = await requestNewToken();
    await client.set(StorageKey.ACCESS_TOKEN, access_token);
    await client.set(StorageKey.ACCESS_TOKEN_EXPIRY, Date.now() + 3600 * 1000); // spotify tokens expire in an hour
    console.debug(
      `Setting new token ${access_token} expiry to ${new Date(
        Date.now() + 3600 * 1000
      ).toLocaleString()}`
    );
  }

  const accessToken = await client.get(StorageKey.ACCESS_TOKEN);
  const nowPlayingData = await fetchNowPlaying(accessToken);

  return { ...nowPlayingData, token: accessToken };
};

export { getNowPlayingData };
