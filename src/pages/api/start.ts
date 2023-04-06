
  

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
    name: body.name,
    ipv4: ipAddress,
    hash: new_uid,
    datenow: Date.now(),
  }

  // hash.update(randomThousand);

  // res.status(200).json({})
  // return
  console.log("method", method)
  switch (method) {

    case 'POST':
      try {

        
        // console.log("hash", hash)
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

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
