const { hashPassword, comparePassword } = require("../utils/hashUtils");
const { generateToken } = require("../utils/jwtUtils");
const { User } = require('../models');

const registerUser = async (req, res) => {

    try{
        const {firstname, lastname, email, phone, user_type, birthdate, billing_address, driver_license, username, password } = req.body;

        // Hash password
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            firstname,
            lastname, 
            email,
            phone,
            user_type,
            birthdate,
            billing_address,
            driver_license,
            username,
            password: hashedPassword
        });
    
        await newUser.save(); // use await to ensire the db is idle to perform our operation, this operation is saving our data into db
        
        res.status(201).json({ message: "User saved successfully! Please log in for further possibility" });
        console.log("Adding a new user:\n", newUser);
    }catch(error){
        res.status(400).json({ message: error.message });
        console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure data from request body

    // Check if email or password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all the fields" });
    }

    const user = await User.findOne({ email }); // Find the user by username

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({ message: "Login successful!", token });
    console.log("Login user:\n", user);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  }
};

const searchUser = async (req, res) => {
  try {
    const { username } = req.body; // Destructure data from request body

    // Check if username provided
    if(!username){
      return res.status(400).json({ message: "Please fill in all the fields" });
    }

    const user = await User.findOne({ username }); // Find the user by username

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({message: "User found:", user});
    console.log("User found:", user);

  }catch(error){
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  };
}

const updateUser = async (req, res) => {
  try {
    
    const user = req.user._id;
    const { id } = req.params;

    // Ensure user can only update their own profile
    if (user !== id) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });

  }catch(error){
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  };
}

const deleteUser = async (req, res) => {
  try {

  }catch(error){
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  };
}

module.exports = {
    registerUser,
    loginUser,
    searchUser,
    updateUser,
    deleteUser,
};
