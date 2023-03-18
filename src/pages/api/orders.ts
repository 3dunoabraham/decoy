import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import crypto from 'crypto';

type OrderParams = {
  symbol: string,
  recvWindow?: number,
  timestamp?: number
}

function getOrders({ symbol, recvWindow = 5000, timestamp = Date.now() }, apiKey: string, apiSecret: string, callback: Function) {
  const options: https.RequestOptions = {
    hostname: 'api.binance.com',
    port: 443,
    path: '/api/v3/allOrders',
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };
  const params = `symbol=${symbol}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;

  const req = https.request(options, (res) => {
    let result = '';

    res.on('data', (data) => {
      result += data;
    });

    res.on('end', () => {
      callback(JSON.parse(result));
    });
  });

  req.on('error', (err) => {
    callback(err);
  });

  req.write(data);
  req.end();
}

const env_BINANCE_PUBLIC = process.env.BINANCE_PUBLIC
const env_BINANCE_SECRET = process.env.BINANCE_SECRET

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = env_BINANCE_PUBLIC
  const apiSecret = env_BINANCE_SECRET

  const { symbol } = req.query;
    console.log("symbol", symbol)
  getOrders(
    { symbol: symbol as string },
    apiKey,
    apiSecret,
    (result: any) => {
      res.status(200).json(result);
    }
  );
}