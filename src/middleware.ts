import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const dev = (process.env.NODE_ENV !== "production")

export async function middleware(req: NextRequest) {
    console.log("qwe")
    const { origin } = req.nextUrl
    console.log("asd", origin)
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session && !dev) {
          return NextResponse.redirect(`${origin}`)
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        // '/',
        '/trade/history',
        '/trade/history',
        '/api/account-balance',
        '/api/order',
        '/api/place-order',
        '/api/player',
        '/api/strat',
        '/api/trade-history',
        '/api/users',
    ],
}