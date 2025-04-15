// pages/UserUpdatePage.js

import React from 'react';
import { useUserUpdate } from '../hooks/useUser';
import { Input, Button, Select, SelectItem } from "@heroui/react";

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
      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input 
          label="First Name" 
          size='lg' 
          variant="underlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input 
          label="Last Name" 
          size='lg' 
          variant="underlined"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input 
          label="Email" 
          size='lg' 
          variant="underlined"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
      {selectedCode && (
          <Select className="w-full" label="Select a Country Code" size="lg" variant="bordered" defaultSelectedKeys={[selectedCode]} onChange={(e) => setSelectedCode(e.target.value)}>
            {countryCodes.map((item) => (
              <SelectItem textValue={`${item.name} ${item.code}`} key={item.code} value={item.code}>{item.name}({item.code})</SelectItem>
            ))}
          </Select>
        )}
        <Input className="w-full" 
          label="Phone Number" 
          size='lg' 
          variant="underlined"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input label="Date of Birth" size='lg' variant="underlined" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </div>

      <div div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
          <Input 
            label="Street" 
            size='lg' 
            variant="underlined"
            type="text"
            name="street"
            value={billingAddress.street || ""}
            onChange={handleAddressChange}
          />
          <Input 
            label="City" 
            size='lg' 
            variant="underlined"
            type="text"
            name="city"
            value={billingAddress.city || ""}
            onChange={handleAddressChange}
          />
          <Input 
            label="County" 
            size='lg' 
            variant="underlined"
            type="text"
            name="county"
            value={billingAddress.county || ""}
            onChange={handleAddressChange}
          />
          <Input 
            label="Zip Code" 
            size='lg' 
            variant="underlined"
            type="text"
            name="zip"
            value={billingAddress.zip || ""}
            onChange={handleAddressChange}
          />
          <Input 
            label="Country" 
            size='lg' 
            variant="underlined"
            type="text"
            name="country"
            value={billingAddress.country || ""}
            onChange={handleAddressChange}
          />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input 
          label="Driving License ID" 
          size='lg' 
          variant="underlined"
          type="text"
          value={driverLicense}
          onChange={(e) => setDriverLicense(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input 
          label="Username" 
          size='lg' 
          variant="underlined"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <Button color="success" size="lg" variant="ghost" onPress={handleSubmit}>Update Profile</Button>

    </div>
  );
};

export default UserUpdatePage;
