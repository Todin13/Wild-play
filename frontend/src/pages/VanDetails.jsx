/*

Page with van details and reviews
Author: Kirill Smirnov

*/

import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "@/utils/api";
import MainLayout from "@/layouts/MainLayout";
import VanCardDetailed from "@/components/ui/VanCardDetailed";
import Title from "@/components/ui/Titles";
import ReviewCard from "@/components/ui/ReviewCard";
import "@/assets/styles/index.css";

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
      <section className="m-8 p-4 max-w-6xl mx-auto">
        {!van ? (
          <div className="text-center text-lg">Van not found.</div>
        ) : (
          <div className="space-y-8">
            <VanCardDetailed van={van} onBookNow={handleBookingClick}/>

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
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default VanDetails;