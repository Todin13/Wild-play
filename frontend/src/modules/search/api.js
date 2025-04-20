import API from '@/utils/api';

export default async function handler(req, res) {
  const { keyword } = req.query;
  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid search keyword' });
  }

  try {
    
    const response = await API.get('/search', { params: { keyword } });
    return res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.error ||
      err.response?.statusText ||
      err.message ||
      'Internal server error';
    return res.status(status).json({ error: message });
  }
}