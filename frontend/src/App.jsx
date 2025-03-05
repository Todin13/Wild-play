import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './assets/styles/App.css'

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [userrole, setUserrole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleSubmit = async () => { // The event occur while user click the submit button

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, birthdate, contact, email, userrole, password, confirmPw }),
    });

    const data = await response.json();
    
    if(data.error){
      console.log(data.error)
      alert(data.error)
    }else{
      alert(data.message || "Success")
    }
  };

  return (
    <>
      <div>
      <div>Enter Your Name
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <div>Enter Your Username
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div>
      <div>Select Your Dtae of Birth
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      </div>
      <div>Enter Your Contact
      <input
        type="text"
        placeholder="353 111 111 1111"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      </div>
      <div>Enter Your Email
      <input
        type="text"
        placeholder="name@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <div>
        <select value={userrole} onChange={(e) => setUserrole(e.target.value)} required>
          <option value="" disabled>Select Role</option>
          <option value="user">User</option>
          <option value="buisness owner">Buisness Owner</option>
          <option value="guide">Guide</option>
        </select>
      </div>
      <div>Enter Your Password
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <div>Retype your password
      <input
        type="password"
        placeholder="retype password"
        value={confirmPw}
        onChange={(e) => setConfirmPw(e.target.value)}
      />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    </>
  )
}

export default App
