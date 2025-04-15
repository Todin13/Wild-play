import "../assets/styles/App.css";
import { useUserDetail } from "../hooks/useUser";

function UserDetail() {
  const { user, loading } = useUserDetail();

  return (
    <div>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <ul>
          <li>Name: {user.firstName} {user.lastName}</li>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>Phone: {user.phone}</li>
          <li>Birthdate: {user.birthdate?.split('T')[0]}</li>
          <li>
            Street: {user.billing_address?.street}<br />
            City: {user.billing_address?.city}<br />
            County: {user.billing_address?.county}<br />
            Zip: {user.billing_address?.zip}<br />
            Country: {user.billing_address?.country}<br />
          </li>
          <li>Driver License: {user.driver_license}</li>
        </ul>
      )}
    </div>
  );
}

export default UserDetail;
