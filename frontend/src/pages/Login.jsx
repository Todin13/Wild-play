import { useState } from 'react' // Import hook
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import '../assets/styles/App.css' // Import CSS

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => { // The event occur while user click the submit button

        const response = await fetch("http://localhost:5000/login", { // The fetch API 
          method: "POST", // Create omething on db
          headers: { "Content-Type": "application/json" }, // Specifies the request body contain JSON data
          body: JSON.stringify({ username, password }), // Convert the details into JSON format
        });
    
        const data = await response.json(); // The response from server
        
        if(data.error){ // If the is an error
          console.log(data.error) // Print on CLI
          alert(data.error) // Print it on frontend
        }else{
          alert(data.message || "Success") // Else show the success msg
        }
      };

    return(
        <>
            <div>Enter Your Username {/* Ask user to enter the field */}
                <input
                    type="text" // The input type
                    placeholder="Username" // Placeholder will show on the field
                    value={username} // The variable you use to save the answer from user for this field
                    onChange={(e) => setUsername(e.target.value)} // A event that triggered when user enter something, it will change the variable
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
            <button onClick={handleSubmit}>Submit</button>
        </>
    );

}

export default Login;