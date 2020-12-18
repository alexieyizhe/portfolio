import Redis from 'ioredis';

import { requestNewToken } from 'services/now-playing';

enum StorageKey {
  ACCESS_TOKEN = 'access-token',
  ACCESS_TOKEN_EXPIRY = 'access-token-expiry',
  CURRENT_IANA_TIMEZONE = 'current-iana-tz',
  STATUS = 'custom-status',
}

const FALLBACK_TIMEZONE = 'America/Toronto';

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

  async getSpotifyCredentials(): Promise<{ token: string; expiry: number }> {
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
  }

  async getTimezone() {
    try {
      return (
        (await this.client.get(StorageKey.CURRENT_IANA_TIMEZONE)) ??
        FALLBACK_TIMEZONE
      );
    } catch {
      return FALLBACK_TIMEZONE;
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

export { StorageKey, StorageClient };
