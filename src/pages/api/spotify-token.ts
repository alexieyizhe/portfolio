import type { NextApiRequest, NextApiResponse } from 'next';

import { StorageClient } from 'services/_server_';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    console.log(`Getting credentials...`);
    const client = new StorageClient();
    const spotifyData = await client.getSpotifyCredentials();
    client.disconnect();

    res.status(200).json(spotifyData);
  } catch (e) {
    res.status(500).json({ reason: JSON.stringify(e) });
  }
};

export default handler;
