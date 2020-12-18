import Redis from 'ioredis';
import { createCanvas, Image as CanvasImage } from 'canvas';

import { requestNewToken, getNowPlaying } from 'services/now-playing';

const SERVER_SIDE_COLOR_OPTIONS = {
  canvasBuilder: () => createCanvas(64, 64),
  imageClass: CanvasImage,
};

const getNowPlayingDataServerSide = async (accessToken: string) =>
  getNowPlaying(accessToken, SERVER_SIDE_COLOR_OPTIONS);

/**
 * ----- STORAGE SERVICE ----
 */
enum StorageKey {
  ACCESS_TOKEN = 'access-token',
  ACCESS_TOKEN_EXPIRY = 'access-token-expiry',
  CURRENT_IANA_TIMEZONE = 'current-iana-tz',
  STATUS = 'custom-status',
}

class StorageClient {
  private client: Redis.Redis;
  connected = false;

  constructor() {
    this.client = new Redis(
      'redis://:e22f6050ce1449d7962e9f7edd053940@us1-apparent-grouper-31548.lambda.store:31548',
      {
        enableAutoPipelining: true,
      }
    );
    this.connected = true;
  }

  async getSpotifyCredentials(): Promise<{
    token: string | null;
    expiry: number;
  }> {
    try {
      const accessTokenExpiry = Number(
        await this.client.get(StorageKey.ACCESS_TOKEN_EXPIRY)
      );

      if (accessTokenExpiry < Date.now()) {
        console.debug(
          `Access token expired, requesting new and setting token expiry to ${new Date(
            Date.now() + 3600 * 1000
          ).toLocaleString()}`
        );

        const { access_token } = await requestNewToken();
        const newExpiry = Date.now() + 3600 * 1000; // spotify tokens expire in an hour

        await this.client.set(StorageKey.ACCESS_TOKEN, access_token);
        await this.client.set(StorageKey.ACCESS_TOKEN_EXPIRY, newExpiry);

        return { token: access_token, expiry: newExpiry };
      }

      const accessToken = await this.client.get(StorageKey.ACCESS_TOKEN);

      return { token: accessToken, expiry: accessTokenExpiry };
    } catch (e) {
      console.error(e);
      return { token: null, expiry: -1 };
    }
  }

  async getTimezone() {
    try {
      return (
        (await this.client.get(StorageKey.CURRENT_IANA_TIMEZONE)) ??
        'America/Toronto'
      );
    } catch {
      return 'America/Toronto';
    }
  }

  async getStatus() {
    try {
      return await this.client.get(StorageKey.STATUS);
    } catch {
      return null;
    }
  }

  disconnect() {
    this.client.disconnect();
    this.connected = false;
  }
}

export { StorageKey, StorageClient, getNowPlayingDataServerSide };
