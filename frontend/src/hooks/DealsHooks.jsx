// /modules/deals/hooks/useDeals.js
import { useState, useEffect } from 'react';
import { getAllDeals } from '@/modules/deals/api';

/**
 * Custom hook to fetch and manage deals.
 * @param {Object} filters - Optional filters for querying deals.
 * @returns {Object} - { deals, loading, error }
 */
export function useDeals(filters = {}) {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const { deals } = await getAllDeals(filters);
        setDeals(deals);
      } catch (err) {
        setError(err.message || 'Failed to fetch deals');
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, [JSON.stringify(filters)]); // safely track filter changes

  return { deals, loading, error };
}
