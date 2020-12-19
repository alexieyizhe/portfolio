import type { NextApiRequest, NextApiResponse } from 'next';

import { StorageClient, StorageKey } from 'services/_server_';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json');

  const newLocation = req.query['loc'];
  const newTimezone = req.query['tz'];
  if (newLocation && newTimezone) {
    try {
      const client = new StorageClient();
      const tzOk = await client.set(
        StorageKey.CURRENT_IANA_TIMEZONE,
        newTimezone
      );
      const locOk = await client.set(
        StorageKey.CURRENT_IANA_TIMEZONE,
        newTimezone
      );
      client.disconnect();
      res.statusCode = 200;
      res.end(JSON.stringify({ success: !!locOk && !!tzOk }));
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify({ reason: JSON.stringify(e) }));
    }
  } else {
    res.statusCode = 400;
    res.end(
      JSON.stringify({ reason: 'No timezone and/or location provided!' })
    );
  }
}
