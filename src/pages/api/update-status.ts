import type { NextApiRequest, NextApiResponse } from 'next';

import {
  allowIfAuthorized,
  StorageClient,
  StorageKey,
} from 'services/_server_';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  const shouldClearStatus = !!req.query['clear'];
  const status = shouldClearStatus ? '' : req.query['status'];

  if (typeof status === 'string') {
    try {
      console.log(`Updating status to ${status}`);
      const client = new StorageClient();
      const statusSetOk = await client.set(StorageKey.STATUS, status);
      client.disconnect();

      res.status(200).json({ success: !!statusSetOk, status });
    } catch (e) {
      res.status(500).json({ reason: JSON.stringify(e) });
    }
  } else {
    res.status(400).json({ reason: 'No status provided!' });
  }
};

export default allowIfAuthorized(handler);
