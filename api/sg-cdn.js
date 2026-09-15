// Edge Runtime - streams large Unity files (1 GB+) without buffering
export const config = { runtime: 'edge' };

const CDN_BASE = 'https://live-assets2.web.stumbleguys.com/unity/0.102/live/125801';

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Range, Content-Type',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges',
      }
    });
  }

  const url = new URL(req.url);
  const p = (url.searchParams.get('p') || '').replace(/\.\./g, '').replace(/^\/+/, '');
  if (!p) return new Response('Missing path', { status: 400 });

  const upstream = `${CDN_BASE}/${p}`;
  const fetchHeaders = {};
  const range = req.headers.get('range');
  if (range) fetchHeaders['Range'] = range;

  let res;
  try {
    res = await fetch(upstream, { headers: fetchHeaders });
  } catch (e) {
    return new Response('CDN fetch error: ' + e.message, { status: 502 });
  }

  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');

  for (const h of [
    'content-type', 'content-encoding', 'content-length',
    'content-range', 'accept-ranges', 'cache-control', 'etag'
  ]) {
    const v = res.headers.get(h);
    if (v) headers.set(h, v);
  }

  return new Response(res.body, { status: res.status, headers });
}