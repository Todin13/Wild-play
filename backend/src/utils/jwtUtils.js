/*

Utility using jsonwebtoken like the generation of a new token with user information
Author: Xiang Yu Oon

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

/**
 * @param {Object} res - Express response object
 * @param {Object} user - The user object (for creating the token)
 */
const setTokenCookie = (res, user) => {

    const token = generateToken(user);

    // Set the JWT token as a cookie
    res.cookie("__wild_app_token", token, {
        httpOnly: false,      
        secure: true, 
        sameSite: "none", // Prevent CORS issue
    });
};

const clearCookie = (req, res) => {
    res.cookie("__wild_app_token", "", {
        httpOnly: false,      
        secure: true, 
        sameSite: "none",
        maxAge: 0        // Immediately expires the cookie
    });
};

module.exports = { setTokenCookie, clearCookie};
