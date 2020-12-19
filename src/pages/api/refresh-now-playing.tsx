import { StorageClient } from 'services/_server_';

export default async function handler(_, res) {
  const client = new StorageClient();
  const { token } = await client.getSpotifyCredentials();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: !!token }));
}
