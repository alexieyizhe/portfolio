import Redis from 'ioredis';

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

  get(key: StorageKey) {
    return this.client.get(key);
  }

  set(key: StorageKey, value: any) {
    return this.client.set(key, value);
  }

  disconnect() {
    this.client.disconnect();
    this.connected = false;
  }
}

export { StorageKey, StorageClient };
