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
  const goToSearchVan = () => {
    navigate('/search-van');
  };

  return {
    goToSearch,
    goToSearchVan,
  };
}

export default useNavigationHooks