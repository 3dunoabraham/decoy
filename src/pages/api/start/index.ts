
  
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


const secret = process.env.NEXTAUTH_SECRET

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  // const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const jwttoken = await getToken({ req, secret, raw: true })
  // console.log("session", session)
  // console.log("JSON Web Token", token)
  // console.log("JSON Web Token", await token.encode())

  const ipAddress:any = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  let firstValue = body.name
  let secondValue = body.secret
  
  const hash = crypto.createHash('sha256');
  console.log("hash values", firstValue, secondValue)
  hash.update(firstValue);
  hash.update(secondValue);
  const hash_digest = hash.digest('hex');
  console.log("hash_digest", hash_digest)

const new_uid = hash_digest
  let asdasd:any = {
    jwt:jwttoken,
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
            return
          }
          console.log(" found", existingStart, { hash: new_uid })
  
  
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
      res.setHeader('Allow', ['GET','POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
