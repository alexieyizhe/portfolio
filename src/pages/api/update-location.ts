import type { NextApiRequest, NextApiResponse } from 'next';

import {
  allowIfAuthorized,
  allowPOSTOnly,
  StorageClient,
  StorageKey,
} from 'services/_server_';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  const newLocation = req.query['loc'];
  const newISODate = req.query['isoDate'] as string;

  if (newLocation && newISODate) {
    try {
      const [hourDiff, minDiff] = [
        Number(newISODate.slice(-6, -3)),
        Number(newISODate.slice(-2)),
      ];

      // get minutes from milliseconds
      const offsetMins = hourDiff * 60 + minDiff;

      console.log(
        `Setting new location to ${newLocation} and offset to ${offsetMins}`
      );
      const client = new StorageClient();
      const locOk = await client.set(StorageKey.CURRENT_CITY, newLocation);
      const dateOk = await client.set(
        StorageKey.CURRENT_UTC_OFFSET_MINS,
        offsetMins
      );
      client.disconnect();

      res.status(200).json({
        success: !!locOk && !!dateOk,
        location: newLocation,
        offset: offsetMins,
      });
    } catch (e) {
      res.status(500).json({ reason: JSON.stringify(e.msg) });
    }
  } else {
    res.status(400).json({ reason: 'No date and/or location provided!' });
  }
};

export default allowPOSTOnly(allowIfAuthorized(handler));
