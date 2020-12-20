import { NextApiRequest, NextApiResponse } from 'next';

const allowIfAuthorized = (handler: any) => async (
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

const allowPOSTOnly = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    return;
  }

  await handler(req, res);
};

export { allowIfAuthorized, allowPOSTOnly };
