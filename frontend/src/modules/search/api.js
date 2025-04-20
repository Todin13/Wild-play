import API from '@/utils/api';

export default async function handler(req, res) {
   
  
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

  // Get all vans with optional filtering
  export const getAllSearch = async () => {
    try {
      const { keyword } = req.query;
      if (!keyword) return res.status(400).json({ error: 'Keyword required' });
      const response = await API.get(`/search?${keyword}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch data', error);
      throw error;
    }
  };
  
  