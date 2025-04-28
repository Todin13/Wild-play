import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import TripDetailCard from "@/components/ui/TripDetail";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Button from "@/components/ui/Buttons"; // Import the Button component
import { useDeleteTrip } from "@/hooks/TripHooks"; // Import the delete hook
import useNavigationHooks from "@/hooks/NavigationHooks";
import { useCreateGuideFromTrip } from "@/hooks/GuideHooks";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const TripDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate hook
  const { trip } = location.state || {};
  const { removeTrip, deleteLoading } = useDeleteTrip(); // Destructure the delete hook
  const [selectedLocation, setSelectedLocation] = useState(null);

  const firstLocation = trip?.locations?.[0];
  const defaultCenter =
    firstLocation?.lat && firstLocation?.lon
      ? [firstLocation.lat, firstLocation.lon]
      : [48.8566, 2.3522]; // fallback to Paris

  const { goToCreateTripPage } = useNavigationHooks(); // Access custom navigation hook for trip creation

  const { createFromTrip, creatingFromTripLoading, creatingFromTripError } =
    useCreateGuideFromTrip();

  const handleDeleteTrip = async () => {
    try {
      await removeTrip(trip?._id); // Remove the trip using the delete hook
      alert("Trip deleted successfully!");
      navigate(-1); // Optionally redirect to the trips page
    } catch (error) {
      alert(
        "Error deleting trip: " + (error?.message || "Something went wrong")
      );
    }
  };

  const handleCreatGuide = async () => {
    try {
      await createFromTrip(trip?._id);
      alert("Guide created successfully from this trip!");
    } catch (error) {
      alert(
        "Error deleting trip: " + (error?.message || "Something went wrong")
      );
    }
  };

  const handleUpdateTrip = () => {
    goToCreateTripPage(trip);
  };

  return (
    <MainLayout>
      <section className="px-4 lg:px-12 py-12 mx-auto min-w-[95vw]">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-20 lg:justify-center">
          {/* Trip Card */}
          <div className="w-full lg:w-[45%] max-w-[525px]">
            <TripDetailCard trip={trip} />
          </div>

          {/* Map */}
          {trip.locations && trip.locations.length > 0 && (
            <div className="w-full lg:w-[50%] sticky top-24 h-[50vh] lg:h-[80vh] relative">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg border border-voga-border relative">
                <MapContainer
                  center={defaultCenter}
                  zoom={6}
                  scrollWheelZoom
                  className="h-full w-full z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {trip.locations.map((loc, idx) =>
                    loc.lat && loc.lon ? (
                      <Marker
                        key={idx}
                        position={[loc.lat, loc.lon]}
                        eventHandlers={{
                          click: () => {
                            setSelectedLocation(loc);
                          },
                        }}
                      >
                        <Tooltip
                          direction="top"
                          offset={[0, -10]}
                          opacity={1}
                          className="!bg-white/80 text-emerald-800 font-semibold px-4 py-2 text-lg rounded-xl shadow-lg backdrop-blur-sm border border-emerald-300"
                        >
                          {loc.name}
                        </Tooltip>
                      </Marker>
                    ) : null
                  )}
                </MapContainer>

                {/* Custom Bottom Popup */}
                {selectedLocation && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] h-auto min-h-[15%] max-h-[30%] bg-white/90 backdrop-blur-md shadow-lg rounded-xl px-6 py-4 flex items-center justify-between z-[1000]">
                    <div className="w-full">
                      <h3 className="text-2xl font-bold text-emerald-800">
                        {selectedLocation.name}
                      </h3>
                      <p className="text-lg text-gray-700 italic mb-1">
                        {selectedLocation.section}
                      </p>
                      {selectedLocation.info && (
                        <p className="text-lg text-gray-600">
                          {selectedLocation.info}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => setSelectedLocation(null)}
                    >
                      Close
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <Button
            variant="primary"
            onClick={handleUpdateTrip}
            className="text-2xl py-4 px-8 font-semibold"
          >
            Update Trip
          </Button>

          <Button
            variant="primary"
            onClick={handleCreatGuide}
            className="text-2xl py-4 px-8 font-semibold"
          >
            Create Guide from Trip
          </Button>

          <Button
            variant="primary"
            onClick={handleDeleteTrip}
            disabled={deleteLoading}
            className="text-2xl py-4 px-8 font-semibold"
          >
            {deleteLoading ? "Deleting..." : "Delete Trip"}
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default TripDetailPage;
