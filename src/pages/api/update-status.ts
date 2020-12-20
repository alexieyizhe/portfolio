import type { NextApiRequest, NextApiResponse } from 'next';

import {
  allowIfAuthorized,
  allowPOSTOnly,
  StorageClient,
  StorageKey,
} from 'services/_server_';

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

      res.status(200).json({ success: !!statusSetOk, status });
    } catch (e) {
      res.status(500).json({ reason: JSON.stringify(e) });
    }
  } else {
    res.status(400).json({ reason: 'No status provided!' });
  }
};

export default allowPOSTOnly(allowIfAuthorized(handler));
