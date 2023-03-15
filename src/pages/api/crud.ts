import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'localJson.json');

export default (req: NextApiRequest, res: NextApiResponse) => {
  let { method, body: _body } = req;
  let {keyName, ...body} = _body

  switch (method) {
    case 'GET':
      try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(data);
        res.status(200).json(parsedData);
      } catch (err) {
        res.status(500).json({ message: 'Error reading data file' });
      }
      break;
    case 'POST':
      try {
        const data = fs.readFileSync(filePath, 'utf-8');
        let allData = JSON.parse(data)
        const parsedData = keyName in allData ? JSON.parse(data)[keyName] : []
        const newEntry = { id: parsedData.length + 1, ...body };
        parsedData.push(newEntry);
        fs.writeFileSync(filePath, JSON.stringify({...allData,...{[keyName]:parsedData}}));
        res.status(201).json(newEntry);
      } catch (err) {
        res.status(500).json({ message: 'Error writing to data file' });
      }
      break;
    case 'PUT':
      try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        const parsedData = jsonData[keyName];
        const entryIndex = parsedData.findIndex((entry) => entry.id === body.id);
        if (entryIndex !== -1) {
          parsedData[entryIndex] = { ...body };
          fs.writeFileSync(filePath, JSON.stringify({...jsonData,...{[keyName]:parsedData}}));
          res.status(200).json(parsedData[entryIndex]);
        } else {
          res.status(404).json({ message: 'Entry not found' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Error writing to data file' });
      }
      break;
    case 'DELETE':
      try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        const parsedData = jsonData[keyName];
        if (body.id) {
          const entryIndex = parsedData.findIndex((entry) => entry.id === body.id);
          if (entryIndex !== -1) {
            const deletedEntry = parsedData[entryIndex];
            parsedData.splice(entryIndex, 1);
            fs.writeFileSync(filePath, JSON.stringify({...jsonData,...{[keyName]:parsedData}}));
            res.status(200).json(deletedEntry);
          } else {
            res.status(404).json({ message: 'Entry not found' });
          }
        } else {
          fs.writeFileSync(filePath, JSON.stringify({...jsonData,...{[keyName]:[]}}));
          res.status(200).json({ message: 'All entries deleted: '+keyName });
        }
      } catch (err) {
        res.status(500).json({ message: 'Error writing to data file' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} not allowed` });
  }
};