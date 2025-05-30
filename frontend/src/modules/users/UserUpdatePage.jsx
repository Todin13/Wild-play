/*

User update pop up
Author: Xiang Yu Oon

*/
import React from "react";
import { useUserUpdate } from "@/hooks/UserHooks";
import { Input, Button, Select, SelectItem, Alert } from "@heroui/react";
import "@/assets/styles/index.css";
import { MapIcon } from "@heroicons/react/24/outline";

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
    error,
    success,
  } = useUserUpdate();

  const handleAddressChange = (e) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-full flex-wrap justify-center items-center md:flex-nowrap gap-4 mb-5 max-w-4xl mx-auto custom-font-input scale-90">
        {error && (
          <div key="danger" className="w-full flex items-center my-3 max-w-4xl">
            <Alert color="danger" title={error} />
          </div>
        )}

        {success && (
          <div key="success" className="w-full flex items-center my-3">
            <Alert color="success" title={success} />
          </div>
        )}
        <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
          <Input
            label="First Name"
            size="lg"
            variant="underlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            size="lg"
            variant="underlined"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
          <Input
            label="Email"
            size="lg"
            variant="underlined"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
          {selectedCode && (
            <Select
              className="w-full"
              label="Select a Country Code"
              size="lg"
              variant="bordered"
              defaultSelectedKeys={[selectedCode]}
              onChange={(e) => setSelectedCode(e.target.value)}
            >
              {countryCodes.map((item) => (
                <SelectItem
                  textValue={`${item.name} ${item.code}`}
                  key={item.code}
                  value={item.code}
                >
                  {item.name}({item.code})
                </SelectItem>
              ))}
            </Select>
          )}
          <Input
            className="w-full"
            label="Phone Number"
            size="lg"
            variant="underlined"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
          <Input
            label="Date of Birth"
            size="lg"
            variant="underlined"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>

        <div
          div
          className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4"
        >
          <Input
            label="Street"
            size="lg"
            variant="underlined"
            type="text"
            name="street"
            value={billingAddress.street || ""}
            onChange={handleAddressChange}
          />
          <Input
            label="City"
            size="lg"
            variant="underlined"
            type="text"
            name="city"
            value={billingAddress.city || ""}
            onChange={handleAddressChange}
          />
          <Input
            label="County"
            size="lg"
            variant="underlined"
            type="text"
            name="county"
            value={billingAddress.county || ""}
            onChange={handleAddressChange}
          />
          <Input
            label="Zip Code"
            size="lg"
            variant="underlined"
            type="text"
            name="zip"
            value={billingAddress.zip || ""}
            onChange={handleAddressChange}
          />
          <Input
            label="Country"
            size="lg"
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
            size="lg"
            variant="underlined"
            type="text"
            value={driverLicense}
            onChange={(e) => setDriverLicense(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
          <Input
            label="Username"
            size="lg"
            variant="underlined"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <Button color="success" size="lg" variant="ghost" type="submit">
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default UserUpdatePage;
