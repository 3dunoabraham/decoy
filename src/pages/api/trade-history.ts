import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import crypto from 'crypto';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  if (method != "POST") {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  let symbol = req.body.symbol as string;
  let limit = Number(req.body.limit) || 500;
  const recvWindow = Number(req.body.recvWindow) || 5000;
  const timestamp = Date.now();
  let parsedBody = JSON.parse(req.body)
  const apiKey = parsedBody.binancePublic
  const apiSecret:any = parsedBody.binanceSecret
  limit = parsedBody.limit
  symbol = parsedBody.symbol
  const params = `symbol=${symbol}&limit=${limit}&recvWindow=${recvWindow}&timestamp=${timestamp}`;

  if (!apiSecret) {
    throw new Error('apiSecret is undefined');
  }
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const options: https.RequestOptions = { hostname: 'api.binance.com', port: 443, method: 'GET',
    path: `/api/v3/myTrades?${params}&signature=${signature}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };

  const reqPromise = new Promise<any>((resolve, reject) => {
    const req = https.request(options, (res) => {
      let result = '';
      res.on('data', (data) => { result += data; });
      res.on('end', () => { resolve(JSON.parse(result));});
    });
    req.on('error', (err) => { reject(err); });
    req.end();
  });

  try {
    const response = await reqPromise;
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}