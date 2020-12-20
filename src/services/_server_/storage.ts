import Redis from 'ioredis';

import { requestNewToken } from 'services/now-playing';

enum StorageKey {
  ACCESS_TOKEN = 'access-token',
  ACCESS_TOKEN_EXPIRY = 'access-token-expiry',
  CURRENT_UTC_OFFSET_MINS = 'current-utc-offset-mins',
  CURRENT_CITY = 'current-city',
  STATUS = 'custom-status',
}

const FALLBACK_OFFSET = '-300';
const FALLBACK_CITY = 'Waterloo';

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
        const { access_token } = await requestNewToken();
        const newExpiry = Date.now() + 3600 * 1000; // spotify tokens expire in an hour

        console.debug(`Token expired, new with expiry ${newExpiry.toString()}`);
        await this.client.set(StorageKey.ACCESS_TOKEN, access_token);
        await this.client.set(StorageKey.ACCESS_TOKEN_EXPIRY, newExpiry);

        return { token: access_token, expiry: newExpiry };
      }

      const accessToken = await this.client.get(StorageKey.ACCESS_TOKEN);

      return { token: accessToken, expiry: accessTokenExpiry };
    } catch {
      return { token: null, expiry: -1 };
    }
  }

  async getTimezoneOffset() {
    try {
      return (
        (await this.client.get(StorageKey.CURRENT_UTC_OFFSET_MINS)) ??
        FALLBACK_OFFSET
      );
    } catch {
      return FALLBACK_OFFSET;
    }
  }

  async getCurrentCity() {
    try {
      return (await this.client.get(StorageKey.CURRENT_CITY)) ?? FALLBACK_CITY;
    } catch {
      return FALLBACK_CITY;
    }
  }

  async get(key: StorageKey, fallbackValue?: any) {
    try {
      return await this.client.get(key);
    } catch {
      return fallbackValue;
    }
  }

  async set(key: StorageKey, value: any) {
    try {
      return await this.client.set(key, value);
    } catch {
      return null;
    }
  }

  async del(key: StorageKey) {
    return this.client.del(key);
  }

  disconnect() {
    this.client.disconnect();
    this.connected = false;
  }
}

export { StorageKey, StorageClient };
