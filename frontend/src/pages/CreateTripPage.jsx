import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useAddTrip } from "@/hooks/TripHooks";
import "@/assets/styles/index.css";

const CreateTripPage = () => {
  const [tripData, setTripData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    locations: [{ name: "", section: "", lat: 0, lon: 0, info: "" }],
    notes: [],
    van_id: "",
    van_booked: false,
  });

  const { addTrip, loading, error } = useAddTrip();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...tripData.locations];
    updated[index][name] = value;
    setTripData((prev) => ({ ...prev, locations: updated }));
  };

  const addLocation = () => {
    setTripData((prev) => ({
      ...prev,
      locations: [
        ...prev.locations,
        { name: "", section: "", lat: 0, lon: 0, info: "" },
      ],
    }));
  };

  const removeLocation = (index) => {
    if (tripData.locations.length > 1) {
      const updated = [...tripData.locations];
      updated.splice(index, 1);
      setTripData((prev) => ({ ...prev, locations: updated }));
    }
  };

  const addNote = () => {
    setTripData((prev) => ({ ...prev, notes: [...prev.notes, ""] }));
  };

  const handleNoteChange = (e, index) => {
    const updated = [...tripData.notes];
    updated[index] = e.target.value;
    setTripData((prev) => ({ ...prev, notes: updated }));
  };

  const removeNote = (index) => {
    const updated = [...tripData.notes];
    updated.splice(index, 1);
    setTripData((prev) => ({ ...prev, notes: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTrip(tripData);
      alert("Trip created successfully!");
    } catch (err) {
      alert("Failed to create trip.");
    }
  };

  return (
    <MainLayout>
      <div className="w-full max-w-5xl mx-auto p-10 bg-white rounded-3xl shadow-xl border border-gray-300 space-y-10">
        <h2 className="text-3xl font-bold text-center text-voga-title">
          Create New Trip
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trip Title */}
          <input
            name="title"
            value={tripData.title}
            onChange={handleInputChange}
            placeholder="Trip Title"
            className="w-full p-4 border rounded-lg"
            required
          />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6">
            <input
              type="date"
              name="start_date"
              value={tripData.start_date}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg"
              required
            />
            <input
              type="date"
              name="end_date"
              value={tripData.end_date}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg"
              required
            />
          </div>

          {/* Van Booked */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="van_booked"
              checked={tripData.van_booked}
              onChange={(e) =>
                setTripData({ ...tripData, van_booked: e.target.checked })
              }
            />
            Van Booked
          </label>

          {/* Locations */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-voga-title">
              Locations
            </h3>
            {tripData.locations.map((location, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex-1 border p-4 rounded-lg space-y-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={location.name}
                      onChange={(e) => handleLocationChange(e, index)}
                      placeholder="Name"
                      className="p-3 border rounded"
                      required
                    />
                    <input
                      name="section"
                      value={location.section}
                      onChange={(e) => handleLocationChange(e, index)}
                      placeholder="Section"
                      className="p-3 border rounded"
                      required
                    />
                    <input
                      type="number"
                      name="lat"
                      value={location.lat}
                      onChange={(e) => handleLocationChange(e, index)}
                      placeholder="Latitude"
                      className="p-3 border rounded"
                      required
                    />
                    <input
                      type="number"
                      name="lon"
                      value={location.lon}
                      onChange={(e) => handleLocationChange(e, index)}
                      placeholder="Longitude"
                      className="p-3 border rounded"
                      required
                    />
                  </div>
                  <input
                    name="info"
                    value={location.info}
                    onChange={(e) => handleLocationChange(e, index)}
                    placeholder="Optional Info"
                    className="w-full p-3 border rounded"
                  />
                </div>

                {tripData.locations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLocation(index)}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addLocation}
              className="px-4 py-2 bg-voga-accent text-white rounded hover:bg-voga-accent-dark"
            >
              Add Location
            </button>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-voga-title">Notes</h3>
            {tripData.notes.map((note, index) => (
              <div key={index} className="flex items-center gap-4">
                <textarea
                  value={note}
                  onChange={(e) => handleNoteChange(e, index)}
                  className="w-full p-4 border rounded-lg"
                  placeholder={`Note ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeNote(index)}
                  className="text-red-500 font-bold hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addNote}
              className="px-4 py-2 bg-voga-accent text-white rounded hover:bg-voga-accent-dark"
            >
              Add Note
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-xl font-semibold bg-voga-accent text-white rounded-lg hover:bg-voga-accent-dark"
            >
              {loading ? "Creating..." : "Create Trip"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-center font-medium">
              {error.message}
            </div>
          )}
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateTripPage;
