// pages/UserUpdatePage.js

import React from 'react';
import { useUserUpdate } from '../hooks/useUser';

const UserUpdatePage = () => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    selectedCode,
    countryCodes,
    birthdate,
    billingAddress,
    driverLicense,
    username,
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
    setSelectedCode,
    setBirthdate,
    setBillingAddress,
    setDriverLicense,
    setUsername,
    handleSubmit,
  } = useUserUpdate();

  const handleAddressChange = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Update Profile</h2>

      <div>
        <span>First and Last name</span>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <span>Email</span>
        <input
          type="text"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <div>
          <select value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
            {countryCodes.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name} ({item.code})
              </option>
            ))}
          </select>
        </div>
        <input
          type="tel"
          placeholder="123456789"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div>
        <span>Date of Birth</span>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </div>

      <div>
        <label>Enter Your Address</label>
        <div>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={billingAddress.street || ""}
            onChange={handleAddressChange}
          />
          <label>Street</label>
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={billingAddress.city || ""}
            onChange={handleAddressChange}
          />
          <label>City</label>
        </div>
        <div>
          <input
            type="text"
            name="county"
            placeholder="County"
            value={billingAddress.county || ""}
            onChange={handleAddressChange}
          />
          <label>County</label>
        </div>
        <div>
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={billingAddress.zip || ""}
            onChange={handleAddressChange}
          />
          <label>ZIP Code</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={billingAddress.country || ""}
            onChange={handleAddressChange}
          />
          <label>Country</label>
        </div>
      </div>

      <div>
        <span>Driving License ID</span>
        <input
          type="text"
          value={driverLicense}
          onChange={(e) => setDriverLicense(e.target.value)}
        />
      </div>

      <div>
        <span>Username</span>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleSubmit}>Update Profile</button>
      </div>
    </div>
  );
};

export default UserUpdatePage;
