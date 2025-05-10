import { useState, useEffect, useCallback } from 'react';
import {
  getAllVans,
  createVan,
  getVanById,
  updateVan,
  deleteVan,
  getVanFilters,
} from '@/modules/vans/api';

export function useVans(filters = {}) {
  const [vans, setVans] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVans = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllVans(filters);
      setVans(response.campers || []);
      setCount(response.count || 0);
    } catch (err) {
      console.error('Error fetching vans:', err);
      setError(err.message || 'Failed to fetch vans');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchVans();
  }, [fetchVans]);

  const addVan = async (vanData) => {
    try {
      const newVan = await createVan(vanData);
      setVans((prev) => [newVan, ...prev]);
      setCount((prev) => prev + 1);
      return newVan;
    } catch (err) {
      throw new Error(err.message || 'Failed to create van');
    }
  };

  const removeVan = async (vanId) => {
    try {
      await deleteVan(vanId);
    } catch (err) {
      throw new Error(err.message || 'Failed to delete van');
    }
  };

  const modifyVan = async (id, vanData) => {
    try {
      const updatedVan = await updateVan(id, vanData);
      setVans((prev) =>
        prev.map((van) => (van.id === id ? updatedVan : van))
      );
      return updatedVan;
    } catch (err) {
      throw new Error(err.message || 'Failed to update van');
    }
  };

  const getVan = async (id) => {
    try {
      return await getVanById(id);
    } catch (err) {
      throw new Error(err.message || 'Failed to fetch van by ID');
    }
  };

  return {
    vans,
    count,
    loading,
    error,
    refetch: fetchVans,
    addVan,
    removeVan,
    modifyVan,
    getVan,
  };
}

export const useTypesVans = () => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const response = await getAllVans({});
        const allVans = response.campers || [];

        const uniqueTypes = new Set();
        const uniqueVans = [];

        for (const van of allVans) {
          if (!uniqueTypes.has(van.type)) {
            uniqueTypes.add(van.type);
            uniqueVans.push(van);
            if (uniqueVans.length === 10) break;
          }
        }

        setVans(uniqueVans);
      } catch (err) {
        console.error('Error fetching vans:', err);
        setError('Failed to fetch vans');
      } finally {
        setLoading(false);
      }
    };

    fetchVans();
  }, []);

  return { vans, loading, error };
};

export const useVanFilters = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getVanFilters();
        setManufacturers(data.manufacturers || []);
        setTypes(data.types || []);
      } catch (err) {
        console.error('Error fetching van filters:', err);
        setError('Failed to load filter options');
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return { manufacturers, types, loading, error };
};
