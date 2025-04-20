import { useState, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useAddTrip } from "@/hooks/TripHooks";
import "@/assets/styles/index.css";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationPicker = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const CreateTripPage = () => {
  const mapRef = useRef(null);

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

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MainLayout>
      <div className="w-full min-w-[95%] p-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:h-[calc(100vh-4rem)]">
          {/* Form Section */}
          <div
            className="w-full lg:w-[45%] bg-white p-8 rounded-3xl shadow-xl border border-gray-300 space-y-8 overflow-y-auto"
            style={{ maxHeight: "100%" }}
          >
            <h2 className="text-3xl font-bold text-center text-voga-title">
              Create New Trip
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <input
                name="title"
                value={tripData.title}
                onChange={handleInputChange}
                placeholder="Trip Title"
                className="w-full p-4 border rounded-lg"
                required
              />

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
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-voga-title">
                    Locations
                  </h3>
                  <button
                    type="button"
                    className="text-blue-500 underline text-sm block lg:hidden"
                    onClick={scrollToMap}
                  >
                    Go to Map
                  </button>
                </div>

                {tripData.locations.map((location, index) => (
                  <div key={index} className="flex gap-4 items-center relative">
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

                    {/* Close button (X) on the right */}
                    {tripData.locations.length > 1 && (
                      <div
                        onClick={() => removeLocation(index)}
                        className="absolute top-0 right-0 text-red-500 font-bold cursor-pointer text-xl"
                      >
                        ×
                      </div>
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
                <h3 className="text-2xl font-semibold text-voga-title">
                  Notes
                </h3>
                {tripData.notes.map((note, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 justify-center relative"
                  >
                    <textarea
                      value={note}
                      onChange={(e) => handleNoteChange(e, index)}
                      className="w-full p-4 border rounded-lg"
                      placeholder={`Note ${index + 1}`}
                    />
                    <div
                      onClick={() => removeNote(index)}
                      className="absolute top-0 right-0 text-red-500 font-bold cursor-pointer text-xl"
                    >
                      ×
                    </div>
                  </div>
                ))}
                <div>
                  <button
                    type="button"
                    onClick={addNote}
                    className="px-4 py-2 bg-voga-accent text-white rounded hover:bg-voga-accent-dark"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 text-xl font-semibold bg-voga-accent text-white rounded-lg hover:bg-voga-accent-dark"
                >
                  {loading ? "Creating..." : "Create Trip"}
                </button>
              </div>

              {error && (
                <div className="text-red-600 text-center font-medium">
                  {error.message}
                </div>
              )}
            </form>
          </div>

          {/* Map Section */}
          <div className="w-full lg:w-[60%] h-[500px] lg:h-full rounded-3xl overflow-hidden border shadow-md relative z-0">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <LocationPicker
                onSelect={(latlng) => {
                  const updated = [...tripData.locations];
                  const lastIndex = updated.length - 1;
                  updated[lastIndex].lat = latlng.lat;
                  updated[lastIndex].lon = latlng.lng;
                  setTripData((prev) => ({ ...prev, locations: updated }));
                }}
              />
              {tripData.locations.map((loc, idx) =>
                loc.lat && loc.lon ? (
                  <Marker key={idx} position={[loc.lat, loc.lon]} />
                ) : null
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateTripPage;
