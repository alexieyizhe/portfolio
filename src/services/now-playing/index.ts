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

const getNowPlaying = async (
  accessToken: string,
  colorOptions?: ProminentOptions
) => {
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
            uri,
            name,
            album: { images },
            external_urls: { spotify },
            artists: [{ name: artistName }],
          },
        } = data;
        const coverArtSrc = images.find((i) => i.width === 64)?.url;
        const coverArtColor = await getBestTextColor(coverArtSrc, colorOptions);

        return {
          uri,
          name,
          artist: artistName,
          link: spotify,
          coverArtSrc,
          coverArtColor,
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
        const coverArtSrc = images.find((i) => i.width === 64)?.url;
        const coverArtColor = await getBestTextColor(coverArtSrc, colorOptions);

        return {
          uri,
          name,
          link: spotify,
          coverArtSrc,
          coverArtColor,
        };
      }
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

export type { TNowPlayingData };
export { isNowPlayingData, getNowPlaying };
