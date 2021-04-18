// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const handleGetUserInfo = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization === 'JWT b9f86bd8a29e76c') {
    res.statusCode = 200;
    res.json({ data: { id: 1, name: 'Bruno Sartori', userName: 'bruno sartori' }, meta: {} });
  } else {
    res.status(401).json({ data: 'token incorrect' });
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      handleGetUserInfo(req, res);
      break;
    default:
      res.statusCode = 404;
      res.json({ data: 'not found', meta: {} });
  }
}
