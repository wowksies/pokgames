module.exports = async function(req, res) {
  const p = (req.query.p || '').replace(/\.\./g, '');
  const game = (req.query.game || 'tankstars');
  const cdnMap = {
    tankstars: 'https://785b74a4-e22d-4d31-90ef-92b80679f7e6.gdn.poki.com/34a362fa-4b92-4956-b93f-e02ef0fb6a91/StreamingAssets'
  };
  const base = cdnMap[game] || cdnMap.tankstars;
  const url = `${base}/${p}`;
  try {
    const r = await fetch(url);
    if (!r.ok) return res.status(r.status).end();
    const buf = await r.arrayBuffer();
    const ct = r.headers.get('content-type');
    if (ct) res.setHeader('Content-Type', ct);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(Buffer.from(buf));
  } catch(e) { res.status(502).json({ error: e.message }); }
}