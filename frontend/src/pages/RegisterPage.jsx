import { useState, useEffect } from "react";
import { useRegister } from "../hooks/useUser";
import "../assets/styles/App.css";
import { Input, Button, Select, SelectItem } from "@heroui/react";

export default function Register() {
  const { handleRegister, loading, error, countryCodes, selectedCode, setSelectedCode } = useRegister();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phone, setPhone] = useState([]);
  const [birthdate, setBirthdate] = useState("");
  const [billing_address, setBillingAddress] = useState({
    street: "", city: "", county: "", zip: "", country: ""
  });
  const [driver_license, setDriverLicense] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  useEffect(() => {
    setPhone([selectedCode, phoneNumber]);
  }, [selectedCode, phoneNumber]);

  const handleChange = (e) => {
    setBillingAddress({
      ...billing_address,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPw) {
      alert("Password doesn't match");
      return;
    }

    const userData = {
      firstName, lastName, email, phone,
      user_type: "USER",
      birthdate, billing_address, driver_license, username, password
    };

    handleRegister(userData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input label="First Name" size='lg' variant="underlined" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <Input label="Last Name" size='lg' variant="underlined" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input label="Email" size='lg' variant="underlined" type="text"  value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Select className="w-full" label="Select a Country Code" size="lg" variant="bordered" defaultSelectedKeys={["+353"]} onChange={(e) => setSelectedCode(e.target.value)}>
          {countryCodes.map((item) => (
            <SelectItem textValue={`${item.name} ${item.code}`} key={item.code} value={item.code}>{item.name}({item.code})</SelectItem >
          ))}
        </Select>
        <Input className="w-full" label="Phone Number" size='lg' variant="underlined" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input label="Date of Birth" size='lg' variant="underlined" type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input label="Street" size='lg' variant="underlined" type="text" name="street" value={billing_address.street} onChange={handleChange} />
        <Input label="City" size='lg' variant="underlined" type="text" name="city" value={billing_address.city} onChange={handleChange} />
        <Input label="County" size='lg' variant="underlined" type="text" name="county" value={billing_address.county} onChange={handleChange} />
        <Input label="Zip Code" size='lg' variant="underlined" type="text" name="zip" value={billing_address.zip} onChange={handleChange} />
        <Input label="Country" size='lg' variant="underlined" type="text" name="country" value={billing_address.country} onChange={handleChange} />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input label="Driving License ID" size='lg' variant="underlined" type="text" value={driver_license} onChange={e => setDriverLicense(e.target.value)} />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input label="Username" size='lg' variant="underlined" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap mt-4 mb-4 gap-4">
        <Input label="Password" size='lg' variant="underlined" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <inInput label="Confirm Password" size='lg' variant="underlined"put type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
      </div>

      <Button color="success" size="lg" variant="ghost" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}