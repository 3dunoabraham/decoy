
  

  import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto';
import { Start } from './start';

export interface Order {
  id?: number
  binance_id: number
  symbol?: string
  orderid?: number
  orderListId?: number
  price?: string
  qty?: string
  quoteQty?: string
  comission?: string
  comissionAsset?: string
  time?: number
  isBuyer?: boolean
  isMaker?: boolean
  isBestMatch?: boolean
  startHash?: string
}


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  
  const ipAddress:any = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // console.log("ipAddress", ipAddress)
  // res.status(200).json({ IPv4: ipAddress });
  const hash = crypto.createHash('sha256');
  hash.update(ipAddress);
  // hash.update(body.name);
  const new_uid = hash.digest('hex');

  let asdasd:any = {
    symbol: body.symbol,
    price: body.price,
    startHash: new_uid,
  }

  // hash.update(randomThousand);

  // res.status(200).json({})
  // return
  console.log("method", method)
  switch (method) {

    case 'POST':
      try {

        
        const { data: existingStart, error: selectError } = await supabase
        .from<Start>('start')
        .select('*')
        .match({ hash: new_uid })
        .single()

        if (!existingStart) {
          console.log("user start not found")
          throw new Error
          return
        }


        console.log("existingStart", existingStart)
        if (!existingStart.attempts) {
          let thenow = Date.now()
          let thediff = (thenow - parseInt(existingStart.datenow))
          console.log("asdasdasd", thediff / 1000 )
          if (thediff / 1000 > 60*3) // 3 minutes
          {

            const { data: start, error } = await supabase
            .from<Start>('start')
            .update({
              attempts: 2,
              datenow: `${Date.now()}`,
            })
            .match({ hash: new_uid })
            .single()
          if (error) {
            throw error
          }
          res.status(201).json(start)
          } else {
            console.log("no more attempts|dates:", existingStart.datenow, thenow)
            throw new Error
            return
          }
        }
        {
          console.log("order", asdasd)
          const { data: order, error } = await supabase
          .from<Order>('order')
          .insert(asdasd)
          .single()
          
        if (error) {
          throw error
        }
        res.status(201).json(order)

        
        const { data: start, error: error2 } = await supabase
        .from<Start>('start')
        .update({
          attempts: existingStart.attempts-1,
          // datenow: `${Date.now()}`,
        })
        .match({ hash: new_uid })
        .single()
      if (error2) {
        throw error2
      }
      res.status(201).json(start)


      }

      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to create order' })
      }
      break

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
