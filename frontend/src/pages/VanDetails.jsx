/*

Page with van details and reviews
Author: Kirill Smirnov

*/

import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "@/utils/api";
import MainLayout from "@/layouts/MainLayout";
import VanCardDetailed from "@/components/ui/VanCardDetailed";
import Title from "@/components/ui/Titles";
import ReviewCard from "@/components/ui/ReviewCard";
import "@/assets/styles/index.css";
import MountainSVG from "@/assets/images/mountain-svg";

const VanDetails = () => {
  const { van_id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [van, setVan] = useState(state?.van || null);
  const startDate = state?.startDate || null;
  const endDate = state?.endDate || null;  
  const [error, setError] = useState("");
  const [loadingVan, setLoadingVan] = useState(!state?.van); // fetch if no state


  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState("");
  

  const fetchVan = useCallback(async () => {
    if (!van_id || van) return;
    setLoadingVan(true);
    try {
      const response = await API.get(`/campers/${van_id}`);
      setVan(response.data.camper);
    } catch (err) {
      console.error("Error fetching van:", err);
      setError("Failed to load van details.");
    } finally {
      setLoadingVan(false);
    }
  }, [van_id, van]);

  const fetchReviews = useCallback(async () => {
    if (!van_id) return;

    setLoadingReviews(true);
    try {
      const response = await API.get(`/reviews/van/${van_id}`);
      setReviews(response.data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews.");
    } finally {
      setLoadingReviews(false);
    }
  }, [van_id]);

  useEffect(() => {
    if (!van) fetchVan();
    fetchReviews();
  }, [fetchVan, fetchReviews]);

  const handleBookingClick = () => {
    navigate("/bookings/new", {
      state: { van, startDate, endDate },
    });
  };

  return (
    <MainLayout>
      <div className="fixed bottom-0 left-0 w-full z-[-1] pointer-events-none transform xl:translate-y-[30%]">
        <MountainSVG className="w-full h-auto object-cover text-mountain-deepgreen" />
      </div>
      <section className="m-8 p-4 max-w-6xl mx-auto">
        {!van ? (
          <Title className="text-center text-lg">Van not found</Title>
        ) : (
          <div className="space-y-8">
            <VanCardDetailed van={van} onBookNow={handleBookingClick} />

            {/* Reviews Section */}
            <div className="mt-8 flex flex-col items-center">
              <Title
                variant="section"
                className=" max-w-xs w-full mb-6 p-2 bg-white/85 border border-gray-200 rounded-lg backdrop-blur-md transition-all duration-200"
              >
                Customer Reviews
              </Title>

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
                <div className="px-3 py-1 text-center text-lg text-gray-500 bg-white/85 border border-gray-200 rounded-lg backdrop-blur-md transition-all duration-200">
                  No reviews yet
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default VanDetails;
