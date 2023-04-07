
  

  import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto';

export interface Start {
  id?: number
  name: string
  href?: string
  src?: string
  ipv4?: string
  datenow?: string
  hash?: string
  attempts?: number
  totalAttempts?: number
  goodAttempts?: number
}


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
    name: body.name,
    ipv4: ipAddress,
    hash: new_uid,
    datenow: Date.now(),
  }

  console.log("method", method)
  switch (method) {
    case 'GET':
      try {
        const { data: existingStart, error } = await supabase
          .from<Start>('start')
          .select('*')
          .match({ hash: new_uid })
          .single()
    
        if (error) {
          throw error
        }
    
        res.status(200).json(existingStart)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to fetch start' })
      }
      break
    
      case 'POST':
        try {
  
          
          const { data: existingStart, error: selectError } = await supabase
          .from<Start>('start')
          .select('*')
          .match({ hash: new_uid })
          .single()
  
          if (existingStart) {
            console.log("found")
            throw new Error
            return
          }
          console.log("not found", existingStart, { hash: new_uid })
  
  
          if (!existingStart) {
            const { data: start, error } = await supabase
            .from<Start>('start')
            .insert(asdasd)
            .single()
          if (error) {
            throw error
          }
          res.status(201).json(start)
        }
  
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Failed to create start' })
        }
        break

    
        case 'POST':
          try {
    
            
            const { data: existingStart, error: selectError } = await supabase
            .from<Start>('start')
            .select('*')
            .match({ hash: new_uid })
            .single()
    
            if (!existingStart) {
              console.log("not found")
              throw new Error
              return
            }
            console.log("found", existingStart, { hash: new_uid })
    
    
            if (!!existingStart) {
              const { data: start, error } = await supabase
              .from<Start>('start')
            
            .delete()
            .match({ hash: new_uid })

              .single()
            if (error) {
              throw error
            }
            res.status(201).json(start)
          }
    
          } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Failed to create start' })
          }
          break
      
    default:
      res.setHeader('Allow', ['GET','POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
