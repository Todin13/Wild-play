import { Link } from "react-router-dom";
import { useUserDashboard } from "../hooks/useUser";

function UserDashboard() {
  const { isLoggedIn, handleLogout } = useUserDashboard();

  return (
    <div>
      <h2>User Dashboard</h2>
      {isLoggedIn ? (
        <div>
          <Link to="/profile">
            <button>Go to Profile</button>
          </Link>
          <Link to="/update">
            <button>Go to Update Personal Info</button>
          </Link>
          <Link to="/pwupd">
            <button>Renew Password</button>
          </Link>
          <Link to="/userTable">
            <button>User Table</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/register">
            <button>Go to Register</button>
          </Link>
          <Link to="/login">
            <button>Go to Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
