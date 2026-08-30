module.exports = async function handler(req, res) {
  const { path } = req.query;
  const pathStr = Array.isArray(path) ? path.join('/') : (path || '');
  const cdnUrl = `https://785b74a4-e22d-4d31-90ef-92b80679f7e6.gdn.poki.com/34a362fa-4b92-4956-b93f-e02ef0fb6a91/StreamingAssets/${pathStr}`;
  try {
    const response = await fetch(cdnUrl);
    if (!response.ok) { return res.status(response.status).end(); }
    const buffer = await response.arrayBuffer();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const ct = response.headers.get('content-type');
    if (ct) res.setHeader('Content-Type', ct);
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}