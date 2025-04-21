import React, { useState, useEffect } from 'react';
import { addDeal } from '@/modules/deals/api';
import API from '@/utils/api';

export default function DealForm({ onSuccess }) {
  const [vans, setVans] = useState([]);
  const [form, setForm] = useState({
    van_id: '',
    discount: '',
    start_date: '',
    end_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Fetch vans list on mount
  useEffect(() => {
    async function loadVans() {
      try {
        const res = await API.get('/campers');
        setVans(res.data?.campers || []);
      } catch (err) {
        console.error('Failed to load vans', err);
      }
    }
    loadVans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      await addDeal(form);
      setSuccessMsg('Deal successfully added!');
      setForm({ van_id: '', discount: '', start_date: '', end_date: '' });
      onSuccess?.(); // Notify parent if needed
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create deal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow-md max-w-xl">
      <h2 className="text-xl font-semibold">Create a New Deal</h2>

      <div>
        <label className="block mb-1 font-medium">Van</label>
        <select
          name="van_id"
          value={form.van_id}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select a van</option>
          {vans.map((van) => (
            <option key={van._id} value={van._id}>
              {van.manufacturer} {van.model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Discount (%)</label>
        <input
          type="number"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          required
          min={1}
          max={100}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Start Date</label>
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">End Date</label>
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {successMsg && <p className="text-green-600">{successMsg}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-deepgreen text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        {loading ? 'Saving...' : 'Add Deal'}
      </button>
    </form>
  );
}
