import "../assets/styles/App.css";
import { useProfile } from "../hooks/useUser";

export default function Profile() {
  const { user, error } = useProfile();

  return (
    <div>
      <h2>Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && user.detail ? (
        <ul>
          <li>Name: {user.detail.firstName} {user.detail.lastName}</li>
          <li>Username: {user.detail.username}</li>
          <li>Email: {user.detail.email}</li>
          <li>Phone: {user.detail.phone}</li>
          <li>Birthdate: {user.detail.birthdate.split('T')[0]}</li>
          <li>
            Street: {user.detail.billing_address.street}<br />
            City: {user.detail.billing_address.city}<br/>
            County: {user.detail.billing_address.county}<br/>
            Zip: {user.detail.billing_address.zip}<br/>
            Country: {user.detail.billing_address.country}<br/>
          </li>
          <li>Driver License: {user.detail.driver_license}</li>
        </ul>
      ) : (
        !error && <p>Loading profile...</p>
      )}
    </div>
  );
}
