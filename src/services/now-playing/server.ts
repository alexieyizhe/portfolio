import { StorageClient, StorageKey } from 'services/storage';
import { getBestTextColor, ProminentOptions } from 'services/color';

import { getNowPlaying, TNowPlayingData } from '.';

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

const requestNowPlayingData = async (
  client: StorageClient,
  colorOptions?: ProminentOptions
): Promise<{
  spotifyToken: string;
  nowPlayingData: TNowPlayingData | null;
}> => {
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
  const nowPlayingData = await getNowPlaying(accessToken, colorOptions);

  return {
    nowPlayingData: nowPlayingData ?? null,
    spotifyToken: accessToken,
  };
};

export { requestNowPlayingData };
