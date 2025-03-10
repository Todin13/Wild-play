const { User } = require('../models');

const registerUser = async (req, res) => {

    try{
        const {firstname, lastname, email, phone, user_type, birthdate, billing_address, driver_license, username, password } = req.body;

        const newUser = new User({ // Create the user instance with all the field you need
            firstname,
            lastname, 
            email,
            phone,
            user_type,
            birthdate,
            billing_address,
            driver_license,
            username,
            password
        });
    
        await newUser.save(); // use await to ensire the db is idle to perform our operation, this operation is sav our data into db
        
        res.status(201).json({ message: "User saved successfully!" });
    }catch(error){
        res.status(400).json({ message: error.message });
        console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body; // Destructure data from request body

    // Check if username is provided
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ username }); // Find the user by username

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (password !== user.password) { // ⚠️ Should hash passwords instead of plain-text comparison!
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "User logged in successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle server errors
    console.log(error);
  }
};

module.exports = {
    registerUser,
    loginUser,
};
