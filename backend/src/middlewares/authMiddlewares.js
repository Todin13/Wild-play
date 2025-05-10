/*

Middleware (cookies) to check if the user is logged in
Author: Xiang Yu Oon

*/
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../.env' });

/**
 * Middleware to authenticate the user based on the JWT token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const authenticateUser = (req, res, next) => {
    const token = req.cookies.__wild_app_token;  // Get token from the cookies

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next(); 
    });
};

/**
 * Middleware to check if user is an ADMIN
 */
const isAdmin = (req, res, next) => {
    const { user_type } = req.user;
    if (user_type !== "ADMIN") {
        console.log(req.user);
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

module.exports = { authenticateUser, isAdmin };