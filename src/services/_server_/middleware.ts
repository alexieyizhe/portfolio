import { NextApiRequest, NextApiResponse } from 'next';

const allowIfAuthorized = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!req.query['token'] || req.query['token'] !== process.env.API_TOKEN) {
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    return;
  }

  await handler(req, res);
};

export { allowIfAuthorized };
