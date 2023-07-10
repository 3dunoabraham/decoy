import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto';
import { fetchPlayer } from "@/scripts/state/repository/player";
import { Player } from "@/scripts/constants";



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
  // console.table({firstValue,secondValue})
  const hash = crypto.createHash('sha256');
  hash.update(firstValue);
  hash.update(secondValue);
  const hash_digest = hash.digest('hex');
  const playerHash = hash_digest
  let asdasd:any = {
    jwt:jwttoken,
    referral: firstValue,
    name: firstValue,
    attempts: 32,
    ipv4: ipAddress,
    hash: playerHash,
    datenow: Date.now(),
  }
  switch (method) {
    case 'GET':
      try {
        const existingStart = await fetchPlayer(supabase, playerHash)
        if (!existingStart) { throw new Error("Player not found") }
    
        res.status(200).json(existingStart)
      } catch (error) {
        res.status(500).json({ message: 'Player not found' })
      }
      break
    case 'PUT':
      try {
        const existingStart = await fetchPlayer(supabase, playerHash)
        if (!existingStart) { throw new Error("Player not found") }
        if (existingStart) {
          const fieldsToUpdate:any = {
            binancekeys: body.binancekeys
          }
          const { data: theplayer, error } = await supabase
            .from<Player>('player')
            .update(fieldsToUpdate)
            .match({ hash: playerHash })
            .single()
          if (!theplayer) {
            throw new Error()
          }
          res.status(201).json(theplayer)
        }

      } catch (error) {
        res.status(500).json({ message: 'Failed to update player' })
      }
      break
      
      case 'POST':
        try {
  
          
          const { data: existingStart, error: selectError } = await supabase
          .from<Player>('player')
          .select('*')
          .match({ hash: playerHash })
          .single()
  
          if (existingStart) {
            throw new Error
          }
  
          if (!existingStart) {
            const { data: start, error } = await supabase
            .from<Player>('player')
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
            .from<Player>('player')
            .select('*')
            .match({ hash: playerHash })
            .single()
    
            if (!existingStart) {
              throw new Error
              return
            }
    
            if (!!existingStart) {
              const { data: start, error } = await supabase
              .from<Player>('player')
            
            .delete()
            .match({ hash: playerHash })

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
