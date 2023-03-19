import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';

type AccountBalanceParams = {
  address: string,
  blockTag?: string
}

type BalanceResponse = {
  jsonrpc: string,
  id: number,
  result: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const address = process.env.ETHEREUM_ADDRESS;
  const blockTag = Array.isArray(req.query.blockTag) ? req.query.blockTag[0] : req.query.blockTag || 'latest';

  const params: AccountBalanceParams[] = [{
    address,
    blockTag
  }];

  const requestBody = {
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params,
    id: 1
  };

  const requestOptions: https.RequestOptions = {
    hostname: 'arb1.arbitrum.io',
    port: 443,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const reqPromise = new Promise<BalanceResponse>((resolve, reject) => {
    const req = https.request(requestOptions, (res) => {
      let result = '';

      res.on('data', (data) => {
            console.log("data 1",data)
            result += data;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(result));
        } catch (error) {
            console.log("error 2",result)
          reject(error);
        }
      });
    });

    req.on('error', (err) => {
        console.log("error 3")
      reject(err);
    });

    req.write(JSON.stringify(requestBody));
    req.end();
  });

  try {
    const response = await reqPromise;
    res.status(200).json(response.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}