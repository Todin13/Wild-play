/*

Utility using jsonwebtoken like the generation of a new token with user information

*/
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../.env' });

/**
 * Generate JWT Token for a user
 * @param {Object} user - User object (must include id and user_type)
 * @returns {string} - JWT token
 */
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, user_type: user.user_type }, // Payload
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Token expires in 1 days
    );
};

module.exports = { generateToken };
