import type { NextApiRequest, NextApiResponse } from 'next';

import { StorageClient, StorageKey } from 'services/_server_';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json');

  const status = req.query['status'];

  if (status) {
    try {
      const client = new StorageClient();
      const statusSetOk = await client.set(StorageKey.STATUS, status);
      client.disconnect();
      res.statusCode = 200;
      res.end(JSON.stringify({ success: !!statusSetOk, status }));
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify({ reason: JSON.stringify(e) }));
    }
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ reason: 'No status provided!' }));
  }
}
