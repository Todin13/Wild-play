import { useNavigate } from 'react-router-dom';

/**
 * Custom navigation hooks for common routes
 */
function useNavigationHooks() {
  const navigate = useNavigate();

  /**
   * Navigate to the generic search page
   */
  const goToSearch = () => {
    navigate('/search');
  };

  /**
   * Navigate specifically to the van search page
   */
  const goToContactUs = () => {
    navigate('/contact');
  };

  return {
    goToSearch,
    goToContactUs,
  };
}

export default useNavigationHooks