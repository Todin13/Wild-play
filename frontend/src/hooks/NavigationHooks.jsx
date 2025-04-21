import { useNavigate } from "react-router-dom";

/**
 * Custom navigation hooks for common routes
 */
function useNavigationHooks() {
  const navigate = useNavigate();

  /**
   * Navigate to the generic search page
   */
  const goToSearch = () => {
    navigate("/search");
  };

  /**
   * Navigate specifically to the van search page
   */
  const goToContactUs = () => {
    navigate("/contact");
  };

  /**
   * Navigate to the trip detail page with the trip object passed in state
   */
  const goToTripDetail = (trip) => {
    navigate("/trips", { state: { trip: { trip } } });
  };

  /**
   * Navigate to the create trip page with the current trip object passed in state
   */
  const goToCreateTripPage = (trip) => {
    navigate("/plan-trip", { state: { trip } }); // Assuming /create-trip is the path for creating a trip
  };

  return {
    goToSearch,
    goToContactUs,
    goToTripDetail,
    goToCreateTripPage, // Include goToCreateTripPage in the returned object
  };
}

export default useNavigationHooks;
