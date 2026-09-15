// CORS proxy for api.stumbleguys.com - forwards real API calls
export const config = { runtime: 'edge' };
export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.searchParams.get('p') || '/';
  const target = 'https://api.stumbleguys.com' + path;
  const headers = new Headers();
  for (const [k, v] of req.headers.entries()) {
    if (['authorization','content-type','accept','x-requested-with','x-sg-version'].includes(k.toLowerCase())) {
      headers.set(k, v);
    }
  }
  try {
    const upstream = await fetch(target, {
      method: req.method,
      headers,
      body: ['GET','HEAD'].includes(req.method) ? undefined : req.body,
    });
    const respHeaders = new Headers(upstream.headers);
    respHeaders.set('Access-Control-Allow-Origin', '*');
    respHeaders.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    respHeaders.set('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept');
    return new Response(upstream.body, { status: upstream.status, headers: respHeaders });
  } catch (e) {
    return new Response(JSON.stringify({error:'proxy error',message:e.message}), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}