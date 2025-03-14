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

/**
 * Set JWT as an HTTP-only cookie
 * @param {Object} res - Express response object
 */
const setTokenCookie = (res) => {
    // Set the JWT token as a cookie
    res.cookie("token", token, {
        httpOnly: true,       // Makes the cookie inaccessible to JavaScript (for security)
        secure: process.env.NODE_ENV === "production",  // Only send cookie over HTTPS if in production
        maxAge: 24 * 60 * 60 * 1000,  // Expire in 1 day
        sameSite: "Strict" // For security
    });
};

module.exports = { generateToken, setTokenCookie };
