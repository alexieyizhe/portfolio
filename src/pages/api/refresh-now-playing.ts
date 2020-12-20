import type { NextApiRequest, NextApiResponse } from 'next';

import { StorageClient } from 'services/_server_';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const client = new StorageClient();
    const { token } = await client.getSpotifyCredentials();
    client.disconnect();

    res.status(200).json({ success: !!token });
  } catch (e) {
    res.status(500).json({ reason: JSON.stringify(e) });
  }
}
