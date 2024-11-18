import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add global caching headers
  response.headers.set('Cache-Control', 's-maxage=86400')
  
  return response
}