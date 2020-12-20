import type { NextApiRequest, NextApiResponse } from 'next';

import { authMiddleware, StorageClient, StorageKey } from 'services/_server_';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  const shouldClearStatus = !!req.query['clear'];
  const status = req.query['status'];

  if (status || shouldClearStatus) {
    try {
      console.log(`Updating status to ${status}`);
      const client = new StorageClient();
      const statusSetOk = shouldClearStatus
        ? await client.del(StorageKey.STATUS)
        : await client.set(StorageKey.STATUS, status);
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
};

export default authMiddleware(handler);
