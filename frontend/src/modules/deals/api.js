import API from '@/utils/api';

/**
 * Fetch all deals from the backend
 * Returns array of deal objects
 */
export async function getAllDeals() {
  const response = await API.get('/deals');
  return response.data.deals;
}