import { BrowserRouter as Router, Link, useLocation  } from "react-router-dom";
import AppRoutes from "./router/Routes";

function Location(){
    const location = useLocation();

    if (location.pathname !== "/") {
        return null;
    }

    return(
        <div>
            <Link to="/register">
                <button>Go to Register</button>
            </Link>
            <Link to="/login">
                <button>Go to Login</button>
            </Link>
        </div>
    );
}

function App() {
    return (
      <Router>
        <div>
          <Location />
          <AppRoutes />
        </div>
      </Router>
    );
  }

export default App;