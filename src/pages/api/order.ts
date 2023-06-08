
  

  import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto';
import { Start } from './player';

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

  console.log("method", method)
  switch (method) {

    case 'PUT':
      try {

        
        const { data: existingStart, error: selectError } = await supabase
        .from<Start>('player')
        .select('*')
        .match({ hash: new_uid })
        .single()

        if (!existingStart) {
          console.log("user start not found")
          throw new Error
          return
        }


        console.log("existingStart", existingStart)
        let attempts = existingStart.attempts
        if (!attempts) {
          let thenow = Date.now()
          let thediff = (thenow - parseInt(existingStart.datenow))
          console.log("asdasdasd", thediff / 1000 )
          if (thediff / 1000 > 60*3) // 3 minutes
          {

            attempts += ATTEMPTS_PER_CYCLE
            const { data: start, error } = await supabase
            .from<Start>('player')
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
            console.log("no more attempts|dates:", existingStart.datenow, thenow)
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
          .from<Start>('player')
          .select('*')
          .match({ hash: new_uid })
          .single()
  
          if (!existingStart) {
            console.log("user start not found")
            throw new Error
            return
          }
  
  
          console.log("existingStart", existingStart)
          let attempts = existingStart.attempts
          if (!attempts) {
            let thenow = Date.now()
            let thediff = (thenow - parseInt(existingStart.datenow))
            console.log("asdasdasd", thediff / 1000 )
            if (thediff / 1000 > 60*3) // 3 minutes
            {
  
              attempts += ATTEMPTS_PER_CYCLE
              const { data: start, error } = await supabase
              .from<Start>('player')
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
  
          
          const { data: start, error: error2 } = await supabase
          .from<Start>('player')
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
