import { NextApiRequest, NextApiResponse } from 'next';

const authMiddleware = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!req.query['token'] || req.query['token'] !== process.env.API_TOKEN) {
    res.statusCode = 401;
    res.statusMessage = 'Unauthorized';
    res.end();
    return false;
  }

  await handler(req, res);
};

export { authMiddleware };
