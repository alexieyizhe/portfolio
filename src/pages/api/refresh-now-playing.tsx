import { StorageClient } from 'services/_server_';

export default function handler(_, res) {
  const client = new StorageClient();
  client.getSpotifyCredentials();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: true }));
}
