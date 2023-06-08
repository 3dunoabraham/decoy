import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto';


import { fetchPlayer } from "@/scripts/state/repository/player";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  let firstValue = body.referral
  let secondValue = body.pin
  const hash = crypto.createHash('sha256');
  hash.update(firstValue);
  hash.update(secondValue);
  const hash_digest = hash.digest('hex');
  const playerHash = hash_digest
  switch (method) {    
    case 'POST':
      try {        
        const existingStart = await fetchPlayer(supabase, playerHash)
        if (!existingStart) { throw new Error("Player not found") }
        if (!!existingStart) { res.status(201).json(existingStart) }
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch start' })
      }
      break;
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
