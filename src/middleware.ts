// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
// import { get } from '@vercel/edge-config';

const dev = (
    // false &&
    process.env.NODE_ENV !== "production"
)
// const dev = process.env.NODE_ENV !== "production";


// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const { pathname, origin } = req.nextUrl
    const path = req.nextUrl.pathname;
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    // const greeting = await get('greeting');
    // console.log("SESSIONNNNN", session, origin)
    if (!session && !dev) {
          return NextResponse.redirect(`${origin}`)
    }



    // if(path == "/"){
    //     //check if user is admin
    // }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    // matcher: [],
    matcher: [
        '/demo',
        '/bitcity',
        '/trade/history',
        // '/chart/:path*',
        '/api/:path*',
        // '/api/trade-history','/api/account-balance',
        
        // '/api/place-order',
    ],
}