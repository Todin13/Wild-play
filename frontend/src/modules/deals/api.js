import API from '@/utils/api';


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

export async function addDeal(dealData) {
  const response = await API.post('/deals', dealData);
  return response.data;
}


export async function deleteDeal(dealId) {
  console.log("Deleting deal with ID:", dealId);
  const response = await API.delete(`/deals/${dealId}`);
  return response.data;
}
