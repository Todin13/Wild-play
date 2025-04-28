import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import GuideDetailCard from "@/components/ui/GuideDetail";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useReviews } from "@/hooks/ReviewsHooks";
import ReviewCarousel from "@/modules/reviews/carousel";
import ReviewForm from "@/components/ui/ReviewForm";
import Button from "@/components/ui/Buttons";
import CreateTripFromGuideButton from "@/modules/trips/CreateTripButton";
import { useUserDashboard } from "@/hooks/UserHooks";
import { useDeleteGuide } from "@/hooks/GuideHooks";
import { useNavigate } from "react-router-dom"; // Add this import at the top

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
  const [showReviewForm, setShowReviewForm] = useState(false); // State to control the visibility of the review form modal
  const { remove, deletingGuideLoading, deletingGuideError } = useDeleteGuide();
  const firstLocation = guide?.locations?.[0];
  const defaultCenter =
    firstLocation?.lat && firstLocation?.lon
      ? [firstLocation.lat, firstLocation.lon]
      : [48.8566, 2.3522]; // fallback to Paris

  const navigate = useNavigate();

  // Fetch reviews using the custom hook
  const { reviews, reviewsLoading, reviewsError } = useReviews(
    "guide",
    guide?._id
  );
  const { user } = useUserDashboard();

  const handleDeleteGuide = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this guide? This action cannot be undone."
      )
    ) {
      try {
        await remove(guide._id); // Delete the guide
        alert("Guide deleted successfully.");
        navigate(-1);
      } catch (error) {
        alert(deletingGuideError || "Failed to delete the guide.");
      }
    }
  };

  return (
    <MainLayout>
      <section className="px-4 lg:px-12 py-12 mx-auto min-w-[95vw]">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-20 lg:justify-center">
          {/* Guide Card */}
          <div className="w-full lg:w-[45%] max-w-[525px]">
            <GuideDetailCard guide={guide} />
            {/* Button to Delete Guide */}
            {user && guide?.user_id && guide?.user_id.__id === user.id && (
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="primary"
                  onClick={handleDeleteGuide}
                  disabled={deletingGuideLoading}
                  className="text-3xl py-6 px-10 font-semibold"
                >
                  {deletingGuideLoading ? "Deleting..." : "Delete Guide"}
                </Button>
              </div>
            )}
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

        {/* Reviews Section */}
        <div className="mt-36">
          <h2 className="text-3xl font-semibold text-voga-title mb-6 text-center ">
            Reviews
          </h2>
          {reviewsLoading ? (
            <p className="text-center text-xl">Loading reviews...</p>
          ) : reviewsError ? (
            <p className="text-red-600 text-xl">{reviewsError}</p>
          ) : reviews.length > 0 ? (
            <ReviewCarousel reviews={reviews} /> // Use ReviewCarousel here
          ) : (
            <p className="text-center text-xl">No reviews yet.</p>
          )}
        </div>

        {/* Button to show Review Form */}
        {user && (
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="primary"
              onClick={() => setShowReviewForm(true)}
              className="text-3xl py-6 px-10 font-semibold"
            >
              Add Your Review
            </Button>

            <CreateTripFromGuideButton guideId={guide?._id} />
          </div>
        )}
      </section>

      {/* Pop-up Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[1000]">
          {/* Review Form Modal */}
          <ReviewForm
            type="guide"
            id={guide?._id}
            setShowReviewForm={setShowReviewForm}
          />
        </div>
      )}
    </MainLayout>
  );
};

export default GuideDetailPage;
