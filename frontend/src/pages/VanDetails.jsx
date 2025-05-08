/*

Page with van details and reviews
Author: Kirill Smirnov

*/

/*

Page with van details and reviews
Author: Kirill Smirnov

*/

import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "@/utils/api";
import MainLayout from "@/layouts/MainLayout";
import Title from "@/components/ui/Titles";
import "@/assets/styles/index.css";
import MountainSVG from "@/assets/images/mountain-svg";


const VanDetails = () => {
  const { state } = useLocation();
  const van = state?.van;
  const startDate = state?.startDate;
  const endDate = state?.endDate;
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState("");
  
  // fetching revies for the chosen van
  const fetchReviews = useCallback(async () => {
    if (!van?._id) return;

    setLoadingReviews(true);
    setReviewsError("");

    try {
      const response = await API.get(`/reviews/van/${van._id}`);
      setReviews(response.data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviewsError("Failed to load reviews.");
      setReviewsError("Failed to load reviews.");
    } finally {
      setLoadingReviews(false);
    }
  }, [van]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleBookingClick = () => {
    navigate("/bookings/new", {
      state: { van, startDate, endDate },
    });
  };

  // Render the component
  return (
    <MainLayout>
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
        <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
      </div>

      <section className="m-8 p-4">
        {loadingVan ? (
          <div className="text-center text-lg">Loading van details...</div>
        ) : !van ? (
          <div className="text-center text-lg text-red-500">Van not found.</div>
        ) : (
          <div className="bg-[#dcf2eb] shadow-md rounded-2xl p-6 max-w-4xl mx-auto space-y-6 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {van.manufacturer} {van.model}
            </h2>

            <div className="space-y-4">
              <p><strong>Type:</strong> {van.type}</p>
            
              <p><strong>Color:</strong> {van.color}</p>
              <p><strong>Price:</strong> ${van.price}</p>
              <p><strong>Base Rate:</strong> ${van.baseRate}</p>
              <p><strong>Seats:</strong> {van.seats}</p>
              <p><strong>Beds:</strong> {van.beds}</p>
              {Array.isArray(van.dimension) && van.dimension.length > 0 && (
                <p><strong>Dimensions:</strong> {van.dimension.join("m x ")}m</p>
              )}
              <p><strong>Location:</strong> {van.location}</p>
              <p><strong>Info:</strong> {van.info}</p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleBookingClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-xl"
              >
                Book this Van
              </button>
            </div>
          </div>
        )}

            {/* Reviews Section */}
            <div className="mt-8">
              <Title variant="section" className="mb-6">Customer Reviews</Title>

              {loadingReviews ? (
                <div className="text-center text-lg">Loading reviews...</div>
              ) : reviewsError ? (
                <div className="text-center text-red-500">{reviewsError}</div>
              ) : reviews.length > 0 ? (
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-7xl">
                    {reviews.map((review) => (
                      <ReviewCard
                        key={review._id}
                        username={review.user_id?.username || "Anonymous"}
                        rating={review.rating}
                        review={review.review}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-lg text-gray-500">No reviews yet</div>
              )}
            </div>
        
      </section>
    </MainLayout>
  );
};

export default VanDetails;