export const fetchNowPlaying = async (accessToken: string) => {
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
        return {
          uri,
          name,
          artist: artistName,
          link: spotify,
          coverArtSrc: images.find((i) => i.width === 64)?.url,
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
          coverArtSrc: images.find((i) => i.width === 64)?.url,
        };
      }
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};
