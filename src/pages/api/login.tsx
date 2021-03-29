// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const handleSignIn = (req: NextApiRequest, res: NextApiResponse) => {
  const { userName, password } = req.body;
  if (userName === 'bruno sartori' && password === 'bukassas9') {
    res.statusCode = 200;
    res.json({ data: 'success', meta: {} });
  } else {
    res.statusCode = 401;
    res.json({ data: 'login or password incorrect', meta: {}});
  }
};

const handleGetLoginInfo = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json({ data: { userName: 'bruno sartori' }, meta: {} });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return handleSignIn(req, res);
    case 'GET':
      return handleGetLoginInfo(req, res);
    default:
      res.statusCode = 404;
      res.json({ data: 'not found', meta: {} });
  }
}
