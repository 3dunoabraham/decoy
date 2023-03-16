// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { get } from '@vercel/edge-config';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const greeting = await get('greeting');
    if (!session) {
        const url = req.nextUrl.clone()
        url.pathname = "/"
        url.search = ""
        return NextResponse.redirect(url)
    }

    // if(path == "/"){
    //     //check if user is admin
    // }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [],
    // matcher: ['/settings'],
}