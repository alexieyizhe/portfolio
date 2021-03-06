import { access } from 'fs';
import { getBestTextColor, ProminentOptions } from 'services/color';
import { base64Encode } from './utils';

type TGithubStats = {
  numCommitsSinceLastKnownEvent: number;
  reposCommittedTo: { name: string; url: string }[];
};

export const getGithubStats = async (): Promise<TGithubStats | null> => {
  try {
    const BASIC_AUTH = base64Encode(`alexieyizhe:${process.env.GITHUB_TOKEN}`);

    const res = await fetch(
      'https://api.github.com/users/alexieyizhe/events/public?per_page=100&page=1',
      {
        headers: {
          Authorization: `Basic ${BASIC_AUTH}`,
        },
      }
    );

    const data = await res.json();
    if (!res.ok || !data)
      throw new Error(`${res.status} Request Failed: ${JSON.stringify(data)}`);

    const lastKnownEventDate = new Date(data[data.length - 1].created_at);
    const pushEvents = data.filter((event: any) => event.type === 'PushEvent');
    const pushEventRepos = Object.entries<string>(
      pushEvents.reduce((acc: Record<string, string>, curEvent: any) => {
        acc[curEvent.repo.name] = `https://github.com/${curEvent.repo.name}`;
        return acc;
      }, {})
    ).map(([name, url]) => ({ name, url }));

    const numCommitsSinceLastKnownEvent = pushEvents.reduce(
      (acc: number, curEvent: any) => acc + curEvent.payload.size,
      0
    );

    if (numCommitsSinceLastKnownEvent === 0) {
      throw new Error(`No commits since ${lastKnownEventDate.toString()}!`);
    }

    return {
      numCommitsSinceLastKnownEvent,
      reposCommittedTo: pushEventRepos,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export type TNowPlayingData = {
  uri: string;
  type: 'episode' | 'track';
  name: string; // name of song or name of podcast
  artistName?: string; // name of artist or undefined if podcast
  podcastName?: string;
  coverArtSrc: string;
  coverArtColor?: [h: number, s: number, l: number];
  link: string; //  song link, podcast episode link, or playlist link
};

export const isNowPlayingData = (
  status: string | TNowPlayingData
): status is TNowPlayingData =>
  typeof status === 'object' && !!status.name && !!status.coverArtSrc;

export const requestNewSpotifyToken = async () => {
  const ENCODED_CLIENT_INFO = base64Encode(
    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  );

  const reqBody = Object.entries({
    grant_type: 'refresh_token',
    refresh_token: process.env.REFRESH_TOKEN,
  })
    .map(
      ([key, val]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(val as string)}`
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

  if (res.status !== 200 || !res.ok || data.error) {
    throw new Error(`Request error ${res.status}: ${data}`);
  }

  return data;
};

const extractNowPlayingData = (data: any) => {
  const isPlaylist = data?.context?.type === 'playlist';

  switch (data.currently_playing_type as 'track' | 'episode') {
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
        type: 'track' as const,
        uri,
        name,
        artistName,
        link: isPlaylist ? data.context?.external_urls.spotify : spotify,
        images,
      };
    }

    case 'episode': {
      const {
        item: {
          uri,
          name,
          images,
          external_urls: { spotify },
          show: { name: podcastName },
        },
      } = data;

      return {
        type: 'episode' as const,
        uri,
        name,
        podcastName,
        link: isPlaylist ? data.context?.external_urls.spotify : spotify,
        images,
      };
    }
  }
};

export const getNowPlaying = async (
  accessToken: string | null,
  colorOptions?: ProminentOptions
): Promise<TNowPlayingData | null | undefined> => {
  if (!accessToken) return null;

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
    if (res.status === 401) return undefined;
    if (!res.ok)
      throw new Error(`Request error ${res.status}: ${JSON.stringify(res)}`);

    const data = await res.json();
    const np = extractNowPlayingData(data);
    const coverArtSrc = np.images.find((i: any) => i.width === 64)?.url;
    const coverArtColor = await getBestTextColor(coverArtSrc, colorOptions);

    return {
      ...np,
      coverArtSrc,
      coverArtColor,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
