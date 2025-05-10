import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API from "@/utils/api";
import MainLayout from "@/layouts/MainLayout";
import "@/assets/styles/index.css";

const VanDetails = () => {
  const { van_id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [van, setVan] = useState(state?.van || null);
  const startDate = state?.startDate || null;
  const endDate = state?.endDate || null;

  const [reviews, setReviews] = useState([]);
  const [loadingVan, setLoadingVan] = useState(!state?.van); // fetch if no state
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState("");

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

  const getReviewBackgroundColor = (rating) =>
    rating < 3 ? "bg-red-100" : "bg-green-100";

  return (
    <MainLayout>
      <section className="m-8 p-4">
        {loadingVan ? (
          <div className="text-center text-lg">Loading van details...</div>
        ) : !van ? (
          <div className="text-center text-lg text-red-500">Van not found.</div>
        ) : (
          <div className="bg-[#dcf2eb] shadow-md rounded-2xl p-6 max-w-4xl mx-auto space-y-6 text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Van Details</h2>

            <div className="space-y-4">
              <p><strong>Type:</strong> {van.type}</p>
              <p><strong>Manufacturer:</strong> {van.manufacturer}</p>
              <p><strong>Model:</strong> {van.model}</p>
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
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>

          {loadingReviews ? (
            <div className="text-center text-lg">Loading reviews...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className={`${getReviewBackgroundColor(
                  review.rating
                )} shadow-md rounded-2xl p-4 mb-4`}
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    {review.user_id?.username || "Anonymous"}
                  </span>
                  <span className="text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-bold text-yellow-500">Rating:</span>{" "}
                  {review.rating} / 5
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
