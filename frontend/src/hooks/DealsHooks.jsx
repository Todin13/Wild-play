/*

Link for react and the function linked to the backend for the deals
Author: HERVET Thibaut

*/
import { useState, useEffect, useCallback } from 'react';
import { getAllDeals, addDeal, deleteDeal } from '@/modules/deals/api';

export function useDeals(filters = {}) {
  const [deals, setDeals] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    try {
      const { deals, count } = await getAllDeals(filters);
      setDeals(deals);
      setCount(count);
    } catch (err) {
      setError(err.message || 'Failed to fetch deals');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]); // Ensures effect is triggered correctly

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handleAddDeal = async (dealData) => {
    try {
      const newDeal = await addDeal(dealData);
      setDeals((prev) => [newDeal, ...prev]);
      setCount((prev) => prev + 1);
      return newDeal;
    } catch (err) {
      throw new Error(err.message || 'Failed to add deal');
    }
  };

  const removeDeal = async (dealId) => {
    try {
      await deleteDeal(dealId);
    } catch (err) {
      console.error("Error deleting deal:", err);
      throw new Error(err.message || 'Failed to delete deal');
    }
  };

  return {
    deals,
    count,
    loading,
    error,
    refetch: fetchDeals,
    addDeal: handleAddDeal,
    removeDeal,
  };
}
