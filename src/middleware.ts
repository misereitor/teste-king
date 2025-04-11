'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
const { SECRET_KEY } = process.env;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/nao-autorizado', request.url));
  }
  try {
    const jwtKey = new TextEncoder().encode(SECRET_KEY);
    await jwtVerify(token, jwtKey);
    return NextResponse.next();
  } catch (err) {
    console.error('Token inválido:', err);
    return NextResponse.redirect(new URL('/nao-autorizado', request.url));
  }
}
export const config = {
  matcher: ['/home/:path*', '/perfil/:path*']
};
