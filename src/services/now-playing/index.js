import { createContext, useContext } from 'react';

const NowPlayingContext = createContext({
  name: 'Test', // name of song or name of podcast
  artist: 'Test', // name of artist or undefined if podcast
  coverArtSrc: 'Test',
  link: 'Test',
});

const useNowPlayingContext = () => useContext(NowPlayingContext);

const fetchNowPlaying = async () => {
  try {
    const res = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    console.log(process.env.ACCESS_TOKEN);

    const isPlaying = res.status === 200; // API returns 204 if nothing is playing

    if (!isPlaying) return null;

    const data = await res.json();
    console.log(data);

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

  return;
};

export { fetchNowPlaying, useNowPlayingContext };
export default NowPlayingContext;
