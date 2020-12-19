import type { NextApiRequest, NextApiResponse } from 'next';

import { StorageClient } from 'services/_server_';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const client = new StorageClient();
  const { token } = await client.getSpotifyCredentials();
  client.disconnect();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: !!token }));
}
