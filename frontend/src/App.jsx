import { BrowserRouter as Router, Link, Route, Routes, useLocation } from "react-router-dom";
import AppRoutes from "@/router/Routes";
import UserDashboard from "@/pages/UserDashboardPage";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  return (
    <div>
      {/* Hide button when on Dashboard */}
      {location.pathname !== "/dashboard" && (
        <nav>
          <Link to="/dashboard">
            <button>Go to Dashboard</button>
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
