import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/']
};

export default function middleware(request) {
  const host = request.headers.get('host')?.toLowerCase().split(':')[0];
  const url = request.nextUrl.clone();

  const map = {
    'footprints.eternalweb3.com': '/footprints.html',
    'hub.eternalweb3.com': '/hub.html',
    'web3.eternalweb3.com': '/web3.html',
    'eternalweb3.com': '/index.html',
    'www.eternalweb3.com': '/index.html'
  };

  const destination = map[host];

  if (destination) {
    url.pathname = destination;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
