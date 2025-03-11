import { useState } from 'react' // Import hook
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import '../assets/styles/App.css' // Import CSS

function Register() {

  // All the local variables
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [userrole, setUserrole] = useState("");
  const [driver_license, setDriverLicense] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleSubmit = async () => { // The event occur while user click the submit button

    const response = await fetch("http://localhost:5000/register", { // The fetch API 
      method: "POST", // Create omething on db
      headers: { "Content-Type": "application/json" }, // Specifies the request body contain JSON data
      body: JSON.stringify({ name, username, birthdate, contact, email, userrole, driver_license, address, password, confirmPw }), // Convert the details into JSON format
    });

    const data = await response.json(); // The response from server
    
    if(data.error){ // If the is an error
      console.log(data.error) // Print on CLI
      alert(data.error) // Print it on frontend
    }else{
      alert(data.message || "Success") // Else show the success msg
    }
  };

  return (
    <>
      <div>
      <div>Enter Your Name {/* Ask user to enter the field */}
      <input
        type="text" // The input type 
        placeholder="Name" // Placeholder will show on the field 
        value={name} // The variable you use to save the answer from user for this field
        onChange={(e) => setName(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <div>Enter Your Username {/* Ask user to enter the field */}
      <input
        type="text" // The input type
        placeholder="Username" // Placeholder will show on the field
        value={username} // The variable you use to save the answer from user for this field
        onChange={(e) => setUsername(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <div>Select Your Dtae of Birth {/* Ask user to enter the field */}
      <input
        type="date" // The input type
        value={birthdate} // The variable you use to save the answer from user for this field
        onChange={(e) => setBirthdate(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <div>Enter Your Contact {/* Ask user to enter the field */}
      <input
        type="text" // The input type
        placeholder="353 111 111 1111" // Placeholder will show on the field
        value={contact} // The variable you use to save the answer from user for this field
        onChange={(e) => setContact(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <div>Enter Your Email {/* Ask user to enter the field */}
      <input
        type="text" // The input type
        placeholder="name@gmail.com" // Placeholder will show on the field
        value={email} // The variable you use to save the answer from user for this field
        onChange={(e) => setEmail(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <div>
        <select value={userrole} onChange={(e) => setUserrole(e.target.value)} required> {/* This is a slect box to let user select the roles */}
          <option value="" disabled>Select Role</option> {/* First option is act as a placeholder without any value */}
          <option value="user">User</option> {/* Second option */}
          <option value="service provider">Service Provider</option> {/* Third option */}
        </select>
      </div>
      <div>Enter Your Driver Lincense ID {/* Ask user to enter the field */}
      <input
        type="text" // The input type
        placeholder="123456789" // Placeholder will show on the field
        value={driver_license} // The variable you use to save the answer from user for this field
        onChange={(e) => setDriverLicense(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <div>Enter Your Biling Address {/* Ask user to enter the field */}
      <input
        type="text" // The input type
        value={address} // The variable you use to save the answer from user for this field
        onChange={(e) => setAddress(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <div>Enter Your Password {/* Ask user to enter the field */}
      <input
        type="password" // The input type
        placeholder="password" // Placeholder will show on the field
        value={password} // The variable you use to save the answer from user for this field
        onChange={(e) => setPassword(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <div>Retype your password {/* Ask user to enter the field */}
      <input
        type="password" // The input type
        placeholder="retype password" // Placeholder will show on the field
        value={confirmPw} // The variable you use to save the answer from user for this field
        onChange={(e) => setConfirmPw(e.target.value)} // A event that triggered when user enter something, it will change the variable
      />
      </div>
      <button onClick={handleSubmit}>Submit</button> {/* When user click submit it will trigger the backend */}
    </div>
    </>
  )
}

export default Register
