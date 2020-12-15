import Redis from 'ioredis';

export enum StorageKey {
  ACCESS_TOKEN = 'access-token',
  ACCESS_TOKEN_EXPIRY = 'access-token-expiry',
  CURRENT_IANA_TIMEZONE = 'current-iana-tz',
}

export const createStorageClient = () =>
  new Redis(
    'redis://:e22f6050ce1449d7962e9f7edd053940@us1-apparent-grouper-31548.lambda.store:31548',
    {
      enableAutoPipelining: true,
    }
  );
