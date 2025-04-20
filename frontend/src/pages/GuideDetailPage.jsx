import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import GuideDetailCard from "@/components/ui/GuideDetail";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useReviews } from "@/hooks/ReviewsHooks";
import ReviewCarousel from "@/modules/reviews/carousel";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const GuideDetailPage = () => {
  const location = useLocation();
  const { guide } = location.state || {};
  const [selectedLocation, setSelectedLocation] = useState(null);

  const firstLocation = guide?.locations?.[0];
  const defaultCenter =
    firstLocation?.lat && firstLocation?.lon
      ? [firstLocation.lat, firstLocation.lon]
      : [48.8566, 2.3522]; // fallback to Paris

  // Fetch reviews using the custom hook
  const { reviews, loading, error } = useReviews("guide", guide?._id);

  return (
    <MainLayout>
      <section className="px-4 lg:px-12 py-12 mx-auto min-w-[95vw]">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-20 lg:justify-center">
          {/* Guide Card */}
          <div className="w-full lg:w-[45%] max-w-[525px]">
            <GuideDetailCard guide={guide} />
          </div>

          {/* Map */}
          {guide.locations && guide.locations.length > 0 && (
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
                  {guide.locations.map((loc, idx) =>
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
                    <button
                      className="text-md text-gray-500 hover:text-gray-800 ml-4 whitespace-nowrap"
                      onClick={() => setSelectedLocation(null)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-voga-title mb-6 text-center ">
            Reviews
          </h2>
          {loading ? (
            <p className="text-center text-xl">Loading reviews...</p>
          ) : error ? (
            <p className="text-red-600 text-xl">{error}</p>
          ) : reviews.length > 0 ? (
            <ReviewCarousel reviews={reviews} /> // Use ReviewCarousel here
          ) : (
            <p className="text-center text-xl">No reviews yet.</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default GuideDetailPage;
