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
    navigate("/search_page");
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
    navigate("/trips", { state: { trip } });
  };

  /**
   * Navigate to the create trip page with the current trip object passed in state
   */
  const goToCreateTripPage = (trip) => {
    navigate("/plan-trip", { state: { trip } });
  };

  /**
   * Navigate to the guide detail page with the guide object passed in state
   */
  const goToGuideDetail = (guide) => {
    navigate("/guides", { state: { guide } });
  };

  /**
   * Navigate to the guide detail page with the guide object passed in state
   */
  const goToCreateGuidePage = (guide) => {
    navigate("/create-guide", { state: { guide } });
  };

  return {
    goToSearch,
    goToContactUs,
    goToTripDetail,
    goToCreateTripPage,
    goToGuideDetail,
    goToCreateGuidePage,
  };
}

export default useNavigationHooks;
