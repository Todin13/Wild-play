const mongoose = require("mongoose"); // Import the Mongoose lib to help manage the MongoDB easily

const userSchema = new mongoose.Schema({ // This is the part what you your schema look like
  name: {
    type: String, // The field type
    required: [true, "Name is required"], // Name is required, if not the web will give the error message 
    minlength: [3, "Name must atleast 3 characters long"], // Name can't shorter than 3 characters, if not the web will give the error message 
    maxlength: [50, "Name can't exceed 50 characters long"] // Name can't longer than 50 characters, if not the web will give the error message 
  },
  username: {
    type: String, // The field type
    required: [true, "Username is required"], // Userame is required, if not the web will give the error message 
    minlength: [3, "Username must atleast 3 characters long"], // Username can't shorter than 3 characters, if not the web will give the error message
    maxlength: [20, "Name can't exceed 20 characters long"] // Username can't longer than 20 characters, if not the web will give the error message
  },
  birthdate: {
    type: String, // The field type
    required: [true, "Date is required"] // Date is required, if not the web will give the error message  
  },
  contact: {
    type: String, // The field type
    required: [true, "Contact Number is required"], // Contact is required, if not the web will give the error message  
    match: [/^353 \d{3} \d{3} \d{4}$/, "Contact Number format error"] // Contact must follow with ireland format, if not the web will give the error message
  },
  email: {
    type: String, // The field type
    required: [true, "Email is required"], // Email is required, if not the web will give the error message 
    ///^[a-zA-Z0-9._%+/$^&*#\-\[\]{}] stand for accept every characters, numbers, symbol
    //+@[a-zA-Z0-9.-] follow with @ (the symbol must contain in email), after it is accept every characters, number and . - as this part can be a company name
    //+\.[a-zA-Z]{2,}$/ follow with a . then end with atleast 2 characters like com, org, ie and this should be the end, not accept any other character include space
    match: [/^[a-zA-Z0-9._%+/$^&*#\-\[\]{}]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email format error"] // Email must follow with the format, if not the web will give the error message
  },
  userrole: {
    type: String, // The field type
    required: [true, "Userrole is required"] // Role is required, if not the web will give the error message  
  },
  password: {
    type: String, // The field type
    required: [true, "Password is required"], // Password is required, if not the web will give the error message 
    //(?=.*[a-z]) stand for atleast one lowercase letter
    //(?=.*[A-Z]) stand for atleast one uppercase letter
    //(?=.*\d) stand for atleast one number
    //(?=(.*[@$!%*?&] stand for atleast one symbol
    // [A-Za-z\d@$!%*?&]{8,} stand for password can build by any character and atleast 8 characters
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=(.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{8,}$/, "Password atleast contain 8 characters with atleast 1 lowercase, 1 uppercase, 1 symbol and 1 number"] // Password format error, if not the web will give the error message 
  },
});

const User = mongoose.model("User", userSchema, 'User'); // Define a model object to let server.js use it, the model format is follow by ("model name", schema name, 'collection name in ur db')

module.exports = User; // Export it to let other file communicate with it

