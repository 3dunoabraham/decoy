
  

  import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto';
import { Player } from '@/scripts/constants';

export interface Order {
  id?: number
  binance_id: number
  symbol?: string
  orderid?: number
  orderListId?: number
  price?: string
  trigger?: string
  qty?: string
  quoteQty?: string
  comission?: string
  comissionAsset?: string
  time?: number
  datenow?: number
  isBuyer?: boolean
  isMaker?: boolean
  isBestMatch?: boolean
  startHash?: string
}
const ATTEMPTS_PER_CYCLE = 3

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  
  const ipAddress:any = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const hash = crypto.createHash('sha256');
  hash.update(ipAddress);
  const new_uid = hash.digest('hex');

  let asdasd:any = {
    symbol: body.symbol,
    price: body.price,
    trigger: body.trigger,
    startHash: new_uid,
    datenow: Date.now(),
  }

  switch (method) {

    case 'PUT':
      try {

        
        const { data: existingStart, error: selectError } = await supabase
        .from<Player>('player')
        .select('*')
        .match({ hash: new_uid })
        .single()

        if (!existingStart) {
          throw new Error
          return
        }


        let attempts = existingStart.attempts
        if (!attempts) {
          let thenow = Date.now()
          let thediff = (thenow - parseInt(existingStart.datenow))
          if (thediff / 1000 > 60*3) // 3 minutes
          {

            attempts += ATTEMPTS_PER_CYCLE
            const { data: start, error } = await supabase
            .from<Player>('player')
            .update({
              attempts: attempts,
              datenow: `${Date.now()}`,
            })
            .match({ hash: new_uid })
            .single()
          if (error) {
            throw error
          }
          // res.status(201).json(start)
          } else {
            throw new Error
            return
          }
        }
          res.status(201).json({success:true})
        
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to add attempts order' })
      }
      break



      case 'POST':
        try {
  
          
          const { data: existingStart, error: selectError } = await supabase
          .from<Player>('player')
          .select('*')
          .match({ hash: new_uid })
          .single()
  
          if (!existingStart) {
            throw new Error
            return
          }
  
  
          let attempts = existingStart.attempts
          if (!attempts) {
            let thenow = Date.now()
            let thediff = (thenow - parseInt(existingStart.datenow))
            if (thediff / 1000 > 60*3) // 3 minutes
            {
  
              attempts += ATTEMPTS_PER_CYCLE
              const { data: start, error } = await supabase
              .from<Player>('player')
              .update({
                attempts: attempts,
                datenow: `${Date.now()}`,
              })
              .match({ hash: new_uid })
              .single()
            if (error) {
              throw error
            }
            // res.status(201).json(start)
            } else {
              throw new Error
              return
            }
          }
          {
            const { data: order, error } = await supabase
            .from<Order>('order')
            .insert(asdasd)
            .single()
            
          if (error) {
            throw error
          }
  
          
          const { data: start, error: error2 } = await supabase
          .from<Player>('player')
          .update({
            attempts: attempts-1,
            totalAttempts: existingStart.totalAttempts+1,
            
          })
          .match({ hash: new_uid })
          .single()
        if (error2) {
          throw error2
        }
        res.status(201).json(order)
  
  
        }
  
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Failed to create order' })
        }
        break


        

    default:
      res.setHeader('Allow', ['POST','PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
