import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'localJson.json');

export default (req: NextApiRequest, res: NextApiResponse) => {
  let { method, body: _body } = req;
  let {keyName, ...body} = _body

  switch (method) {
    case 'GET':
      
      break;
    case 'POST':
      try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(data)[keyName];
        const newEntry = { id: parsedData.length + 1, ...body };
        parsedData.push(newEntry);
        fs.writeFileSync(filePath, JSON.stringify({[keyName]:parsedData}));
        res.status(201).json(newEntry);
      } catch (err) {
        res.status(500).json({ message: 'Error writing to data file' });
      }
      break;
    case 'PUT':
      
      break;case 'DELETE':
      
      break;

    default:
      res.setHeader('Allow', ['POST',]);
      res.status(405).json({ message: `Method ${method} not allowed` });
  }
};