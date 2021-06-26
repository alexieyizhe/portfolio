import Redis from 'ioredis';

import { requestNewSpotifyToken } from 'services/api';

export enum StorageKey {
  ACCESS_TOKEN = 'access-token',
  ACCESS_TOKEN_EXPIRY = 'access-token-expiry',
  CURRENT_UTC_OFFSET_MINS = 'current-utc-offset-mins',
  CURRENT_CITY = 'current-city',
  STATUS = 'custom-status',
}

const FALLBACK_OFFSET = '-300';
const FALLBACK_CITY = 'Waterloo';

export class StorageClient {
  private client: Redis.Redis;
  connected = false;

  constructor() {
    this.client = new Redis(
      'redis://:e22f6050ce1449d7962e9f7edd053940@us1-apparent-grouper-31548.upstash.io:31548',
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

      if (accessTokenExpiry <= Date.now()) {
        const { access_token } = await requestNewSpotifyToken();
        const newExpiry = Date.now() + 1800 * 1000; // spotify tokens expire in an hour, pre-emptively refresh access token

        console.log(`Token expired, new with expiry ${newExpiry.toString()}`);
        await this.client.set(StorageKey.ACCESS_TOKEN, access_token);
        await this.client.set(StorageKey.ACCESS_TOKEN_EXPIRY, newExpiry);

        return { token: access_token ?? null, expiry: newExpiry };
      }

      const accessToken = await this.client.get(StorageKey.ACCESS_TOKEN);

      return { token: accessToken ?? null, expiry: accessTokenExpiry };
    } catch (e) {
      console.error(e);
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

  async get(key: StorageKey, fallbackValue = null) {
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

  disconnect() {
    this.client.disconnect();
    this.connected = false;
  }
}
