import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";

const VanDetails = () => {
  const { state } = useLocation();
  const van = state?.van;
  const startDate = state?.startDate;
  const endDate = state?.endDate;
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://wild-play-api.vercel.app/api/reviews/van/${van._id}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (van) {
      fetchReviews();
    }
  }, [van]);

  const handleBookingClick = () => {
    navigate("/bookings/new", {
      state: { van, startDate, endDate }
    });
  };

  const getReviewBackgroundColor = (rating) => {
    if (rating < 3) return "bg-red-100";  // Red for ratings below 3
    return "bg-green-100";  // Green for ratings 3 and above
  };

  return (
    <MainLayout>
      <section className="m-8 p-4">
        {!van ? (
          <div className="text-center text-lg">Van not found.</div>
        ) : (
          <div className="bg-[#dcf2eb] shadow-md rounded-2xl p-6 max-w-4xl mx-auto space-y-6 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Van Details</h2>

            <div className="space-y-4">
              {van?.type && (
                <p><span className="font-semibold text-gray-700">Type:</span> {van.type}</p>
              )}
              {van?.manufacturer && (
                <p><span className="font-semibold text-gray-700">Manufacturer:</span> {van.manufacturer}</p>
              )}
              {van?.model && (
                <p><span className="font-semibold text-gray-700">Model:</span> {van.model}</p>
              )}
              {van?.color && (
                <p><span className="font-semibold text-gray-700">Color:</span> {van.color}</p>
              )}
              {van?.price != null && (
                <p><span className="font-semibold text-gray-700">Price:</span> ${van.price}</p>
              )}
              {van?.baseRate != null && (
                <p><span className="font-semibold text-gray-700">Base Rate:</span> ${van.baseRate}</p>
              )}
              {van?.seats != null && (
                <p><span className="font-semibold text-gray-700">Seats:</span> {van.seats}</p>
              )}
              {van?.beds != null && (
                <p><span className="font-semibold text-gray-700">Beds:</span> {van.beds}</p>
              )}
              {Array.isArray(van?.dimension) && van.dimension.length > 0 && (
                <p><span className="font-semibold text-gray-700">Dimensions:</span> {van.dimension.join("m x ")}m</p>
              )}
              {van?.location && (
                <p><span className="font-semibold text-gray-700">Location:</span> {van.location}</p>
              )}
              {van?.info && (
                <p><span className="font-semibold text-gray-700">Info:</span> {van.info}</p>
              )}
            </div>

            {/* "Book" button */}
            <div className="mt-6 text-center">
                <button onClick={handleBookingClick} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-xl" >
                    Book this Van
                </button>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>

          {loadingReviews ? (
            <div className="text-center text-lg">Loading reviews...</div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className={`${getReviewBackgroundColor(review.rating)} shadow-md rounded-2xl p-4 mb-4`}>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">{review.user_id.username}</span>
                  <span className="text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-2">
                  <span className="font-bold text-yellow-500">Rating:</span> {review.rating} / 5
                </div>
                <p className="mt-2 text-gray-700">{review.review}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-gray-500">No reviews yet.</div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default VanDetails;
