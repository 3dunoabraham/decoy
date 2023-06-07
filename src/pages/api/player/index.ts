
  
import { getToken } from "next-auth/jwt"
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


const nextSecret = process.env.NEXTAUTH_SECRET

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req
  const jwttoken = await getToken({ req, secret:nextSecret, raw: true })
  const ipAddress:any = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let firstValue = body.referral || query.referral
  let secondValue = body.pin || query.pin
  const hash = crypto.createHash('sha256');
  hash.update(firstValue);
  hash.update(secondValue);
  const hash_digest = hash.digest('hex');
  const new_uid = hash_digest
  let asdasd:any = {
    jwt:jwttoken,
    name: body.name,
    attempts: 32,
    ipv4: ipAddress,
    hash: new_uid,
    datenow: Date.now(),
  }
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
    
      case 'PUT':
        try {
  
          
          const { data: existingStart, error: selectError } = await supabase
          .from<Start>('start')
          .select('*')
          .match({ hash: new_uid })
          .single()
  
          if (!existingStart) {
            console.log("not found")
            throw new Error
          }
  
          if (existingStart) {
            const fieldsToUpdate:any = {
              binancekeys: body.binancekeys
            }
            const { data: start, error } = await supabase
            .from<Start>('start')
            .update(fieldsToUpdate)
            .match({ hash: new_uid })
            .single()
          if (error) {
            throw error
          }
          res.status(201).json(start)
        }
  
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Failed to put start' })
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
          }
  
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

    
        case 'DELETE':
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
      res.setHeader('Allow', ['GET','POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
