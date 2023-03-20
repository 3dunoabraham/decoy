import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import crypto from 'crypto';
import { DEFAULT_TOKENS_ARRAY_UPPER } from '@/components/scripts/constants';

type AccountBalanceParams = {
  recvWindow?: number,
  timestamp?: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const recvWindow = Number(req.query.recvWindow) || 5000;
  const timestamp = Date.now();

  const apiKey = process.env.BINANCE_PUBLIC;
  const apiSecret = process.env.BINANCE_SECRET;

  const params = `recvWindow=${recvWindow}&timestamp=${timestamp}`;
  if (!apiSecret) {
    throw new Error('apiSecret is undefined');
  }
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');

  const options: https.RequestOptions = {
    hostname: 'api.binance.com',
    port: 443,
    path: `/api/v3/account?${params}&signature=${signature}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };

  const reqPromise = new Promise<any>((resolve, reject) => {
    const req = https.request(options, (res) => {
      let result = '';

      res.on('data', (data) => {
        result += data;
      });

      res.on('end', () => {
        resolve(JSON.parse(result));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });

  try {
    // const tokenList = ['BTC', 'ETH', 'LINK', 'FTM', "AAVE"];
    const tokenList = DEFAULT_TOKENS_ARRAY_UPPER
    
    const response = await reqPromise;

    if (response.balances) {
      const filteredBalances = response.balances.filter((balance) => tokenList.includes(balance.asset));
      response.balances = filteredBalances;
    }
    
    res.status(200).json(response);
      } catch (error) {
    res.status(500).json({ error: error.message });
  }
}