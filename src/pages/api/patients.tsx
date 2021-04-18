// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const handleGetPatients = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization === 'JWT b9f86bd8a29e76c') {
    res.statusCode = 200;
    res.json({ 
      data: [
        {
          id: 1,
          name: 'John Doe',
          birthDate: '1995-05-04',
          phone: '(17) 98154-8437'
        },
        {
          id: 2,
          name: 'Test',
          birthDate: '1995-05-04',
          phone: '(17) 98154-8437'
        },
        {
          id: 3,
          name: 'Lorem Ipsum',
          birthDate: '1995-05-04',
          phone: '(17) 98154-8437'
        }
      ], 
      meta: {} 
    });
  } else {
    res.status(401).json({ data: 'token incorrect' });
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      handleGetPatients(req, res);
      break;
    default:
      res.statusCode = 404;
      res.json({ data: 'not found', meta: {} });
  }
}
