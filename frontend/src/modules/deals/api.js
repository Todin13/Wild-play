import API from '@/utils/api';

/**
 * Fetch all deals from the backend with optional filters
 * @param {Object} filters - optional filters like van_id, discount, minDiscount, maxDiscount, start_date, end_date
 * @returns {Object} - { deals: [], count: number }
 */
export async function getAllDeals(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  const response = await API.get(`/deals?${params.toString()}`);
  return {
    deals: response.data.deals,
    count: response.data.count,
  };
}

/**
 * Add a new deal
 * @param {Object} dealData - deal data to be added
 * @returns {Object} - created deal
 */
export async function addDeal(dealData) {
  const response = await API.post('/deals', dealData);
  return response.data;
}


/**
 * Delete a deal by ID
 * @param {string} dealId - ID of the deal to be deleted
 */
export async function deleteDeal(dealId) {
  const response = await API.delete(`/deals/${dealId}`);
  return response.data;
}