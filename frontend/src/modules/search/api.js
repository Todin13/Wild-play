export default async function handler(req, res) {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ error: 'Keyword required' });
  
    try {
      const backendRes = await fetch(
        `http://localhost:5050/api/search?keyword=${encodeURIComponent(keyword)}`
      );
      if (!backendRes.ok) {
        return res.status(backendRes.status).json({ error: backendRes.statusText });
      }
      const data = await backendRes.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  