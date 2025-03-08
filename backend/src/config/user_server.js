const express = require("express"); // Import express to handle HTTP request
const mongoose = require("mongoose"); // Import the Mongoose lib to help manage the MongoDB easily
const cors = require("cors"); // Import CORS to allow React communicate with Express
const User = require("../models/connectUserDB"); // Link the models js
const router = express.Router();

const app = express(); // Initialize express app

const corsOptions = { // Declare a instance to ensure this server can only communicate with the specific React
  origin: "*",// "http://localhost:3000", // Allow all the frontend can commmunicate with this backend (just for deployment)
  methods: ["GET", "POST"], // Which kind of methods you only want to accept, in this condition we only accept read and append
};

app.use(cors(corsOptions)); // Enable the CORS attach the condition we declare above
app.use(express.json()); // Allow the server parse JSON data from the request

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://oscaroon636:Oscar%40636@cluster0.x4ncz.mongodb.net/WildPlay") // The URL of your db
  .then(() => console.log("MongoDB Connected")) // The log will print if connect successfully
  .catch((err) => console.error("MongoDB Connection Error:", err)); // The log will print if connect fail

app.post("/register", async (req, res) => { // This will only listen to the POST request from /register
  try {

    const { name, username, birthdate, contact, email, userrole, driver_license, address, password, confirmPw } = req.body; // Destructure the datas from the request body
    if (!name || !username || !birthdate || !contact || !email || !userrole || !password || !confirmPw) return res.status(400).json({ error: "Please fill in all the field" }); // If one of them missing, print the 400 (Stand for client error) error

    if(password != confirmPw){
        return res.status(400).json({ error: "Password doesn't match with Re-type password" }); // If password doesn't match, print the 400 (Stand for client error) error
    }

    const userCount =  await User.countDocuments(); // Get the amount of users
    const userId = (userCount + 1).toString().padStart(5, '0'); // Enusre the num is fill in 5 digits

    let userPrefix = '';
    
    if(userrole === "user"){ // Give the prefix according diff roles
      userPrefix = 'U';
    }else if(userrole === "service provider"){
      userPrefix = 'S';
    }

    const userNum = userPrefix + userId; // Merge together

    const newUser = new User({ // Create the user instance with all the field you need
      userNum,
      name, 
      username,
      birthdate,
      contact,
      email,
      userrole,
      driver_license,
      address,
      password
    });

    await newUser.save(); // use await to ensire the db is idle to perform our operation, this operation is sav our data into db
    
    res.status(201).json({ message: "User saved successfully!" }); // Print this 201 (Stand for data append successfully) msg if success
  } catch (error) {

    if(error.name == "ValidationError"){ // If the error is validation error
      return res.status(400).json({ 
         error : error.message // return with a 400 (Client Side Error) status with the meesage declare in user model
      });
    }

    res.status(500).json({ error: error.message }); // Print this 500 (Stand fro server error) msg if fail
  }
});
 
app.post("/login", async (req, res) => { // This will only listen to the POST request from /login
  try{ 
    const { username, password } = req.body; // Destructure the datas from the request body

    const user = await User.findOne({ username }); // Find the user with the username in db

    if (!user) {
      return res.status(400).json({ message: 'User not found' }); // Reply this msg if user not found or the field is blank
    }

    if(!password){
      return res.status(400).json({ message: 'User not Please fill all the blank' }); // Passwrd field can't leave blank
    }

    if (password !== user.password) { // Compare password
      return res.status(400).json({ message: 'Invalid password' }); // If password not same reply this message
    }

    res.status(201).json({ message: "User login successfully!" }); // Success message
  }catch (error) {

    res.status(500).json({ error: error.message }); // Print this 500 (Stand fro server error) msg if fail
  }
});

// Start server on port 5000 and print the log msg 
app.listen(5000, () => console.log("Server running on port 5000"));
