const { hashPassword, comparePassword } = require("../utils/hashUtils");
const { setTokenCookie, clearCookie } = require("../utils/jwtUtils");
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
    setTokenCookie(res, user);

    res.status(200).json({ message: "Login successful!"});
    console.log("Login user:\n", user);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    
    const { id } = req.user;
    const { user } = req.params;

    console.log("test" ,id, user);

    // Ensure user can only update their own profile
    if (user !== id) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(user, updates, { new: true });

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


const searchUsers = async (req, res) => {
  try {
    const { username, country, phone, email, firstName, lastName, user_type, birthdate, street, city, county, zip, driver_license } = req.body;

    let query = {};

    // Handle searching by other fields
    if (username) {
      query.username = username;
    }

    if (firstName) {
      query.firstName = firstName;
    }

    if (lastName) {
      query.lastName = lastName;
    }

    if (email) {
      query.email = email;
    }

    if (phone) {
      query.phone = phone;
    }

    if (user_type) {
      query.user_type = user_type;
    }

    if (birthdate) {
      query.birthdate = birthdate;
    }

    if (street) {
      query["billing_address.street"] = street;
    }

    if (city) {
      query["billing_address.city"] = city;
    }

    if (county) {
      query["billing_address.county"] = county;
    }

    if (zip) {
      query["billing_address.zip"] = zip;
    }

    if (country) {
      query["billing_address.country"] = country;
    }

    if (driver_license) {
      query.driver_license = driver_license;
    }

    // Find users based on the dynamic query
    const users = await User.find(query);

    res.status(200).json(users);
    console.log(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching for users" });
    console.log(error);
  }
};

const searchUserByUsername = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find user by username
    const user = await User.findOne({ username });

    // If no user found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error searching for user" });
    console.log(error);
  }
};


const profile = async (req, res) => {
  try {
    const { id } = req.user;

    const detail = await User.findById( id );

    res.json({ message: "Welcome to your profile!", user: req.user, detail });
    console.log("Getting /profile for user: ", req.user , detail);
    
  }catch(error){
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  };
}

const logout = async (req, res) => {
  try{

    clearCookie(req, res);

    res.status(200).json({ message: "Logout successful" });

  }catch(error){
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  };

};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    searchUsers,
    searchUserByUsername,
    profile,
    logout,
};
