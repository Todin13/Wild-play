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
    res.status(500).json({ message: "Error searching for users" }); // Handle server errors
    console.log(error);
  };
}

const updateUser = async (req, res) => {
  try {
    
    const { id } = req.user;
    const { user } = req.params;

    console.log("id", id);
    console.log("user", user);

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

// Delete user controller
const deleteUser = async (req, res) => {
  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return success message
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  }
};


const searchUserByAge = async (req, res) => {
  try {
      const { age } = req.body; // Example :25

      // Calculate the date range
      const currentDate = new Date();
      const maxBirthdate = new Date(currentDate.setFullYear(currentDate.getFullYear() - age)); // Example : 2000 - current month - current day

      // Search for users within the birthdate range
      const users = await User.find({
          birthdate: {$gte: maxBirthdate } // now - 2000
      });

      res.status(200).json(users);console.log(users);
  } catch (error) {
      res.status(500).json({ message: "Error searching for users" });
  }
};

const searchUserByCountry = async (req, res) => {
  try {
      const { country } = req.body;

      const users = await User.find({ "billing_address.country": country });

      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: "Error searching for users" }); // Handle server errors
  }
};

const searchUserByPhone = async (req, res) => {
  try {
    const { phone } = req.body; 

    const users = await User.find({phone: phone });

    res.status(200).json(users);

  }catch(error){
    res.status(500).json({ message: "Error searching for users" }); // Handle server errors
    console.log(error);
  };
}

const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.body; 

    const users = await User.findOne({ "email": email }); 

    res.status(200).json(users);
    
  }catch(error){
    res.status(500).json({ message: "Error searching for users" }); // Handle server errors
    console.log(error);
  };
}



module.exports = {
    registerUser,
    loginUser,
    searchUser,
    updateUser,
    deleteUser,
    searchUserByAge,
    searchUserByCountry,
    searchUserByPhone,
    searchUserByEmail,
};
