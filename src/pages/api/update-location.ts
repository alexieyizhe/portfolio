import type { NextApiRequest, NextApiResponse } from 'next';

import { StorageClient, StorageKey } from 'services/_server_';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json');

  const newLocation = req.query['loc'];
  const newDate = req.query['date'] as string;
  const newTimestamp = req.query['ts'] as string;

  // TODO: add security for these endpoints
  if (newLocation && (newDate || newTimestamp)) {
    try {
      const now = new Date();
      const cur = new Date(newDate ?? Number(newTimestamp));
      const curUTC = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
      );

      // get minutes from milliseconds
      const offsetMins = (cur.getTime() - curUTC.getTime()) / 1000 / 60;
      // some amount of time will have elapsed between sending request and this processing logic.
      // to compensate, we want to round to the closest PAST hour
      // note: there are non-hour interval time zones but that's complex for what we're doing
      const closestOffsetMins = Math.ceil(offsetMins / 60) * 60;

      console.log(
        `Setting new location to ${newLocation} and offset to ${closestOffsetMins}`
      );
      // const client = new StorageClient();
      // const locOk = await client.set(StorageKey.CURRENT_CITY, newLocation);
      // const dateOk = await client.set(
      //   StorageKey.CURRENT_UTC_OFFSET_MINS,
      //   closestOffsetMins
      // );
      // client.disconnect();

      res.statusCode = 200;
      res.end(
        JSON.stringify({
          success: !!true && !!true,
          location: newLocation,
          offset: closestOffsetMins,
          curUTC: curUTC.getTime(),
          cur: cur.getTime(),
          curUTCStr: curUTC.toString(),
          curStr: cur.toString(),
        })
      );
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify({ reason: JSON.stringify(e.msg) }));
    }
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ reason: 'No date and/or location provided!' }));
  }
}
