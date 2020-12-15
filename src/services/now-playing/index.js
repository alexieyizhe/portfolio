import { createContext, useContext } from 'react';

const NowPlayingContext = createContext({
  name: 'Test', // name of song or name of podcast
  artist: 'Test', // name of artist or undefined if podcast
  coverArtSrc: 'Test',
  link: 'Test',
});

const useNowPlayingContext = () => useContext(NowPlayingContext);

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

const fetchNowPlaying = async (accessToken) => {
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
    const data = await res.json();

    if (!res.ok)
      throw new Error(`Request error ${res.status}: ${JSON.stringify(data)}`);
    if (res.status === 204) return null; // API returns 204 if nothing is playing

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

  return undefined;
};

export { fetchNowPlaying, useNowPlayingContext, requestNewToken };
export default NowPlayingContext;
