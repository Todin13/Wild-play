/*

utils to hash and compare has string (here password)

*/

const bcrypt = require("bcrypt");
require('dotenv').config({ path: '../.env' });

const saltRounds = parseInt(process.env.HASHING_ROUND, 10) || 10; // Number of hashing rounds

/**
 * Hash a plain text password
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} - The hashed password
 */
const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password");
    }
};

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - The plain text password
 * @param {string} hashedPassword - The hashed password from the database
 * @returns {Promise<boolean>} - True if passwords match, otherwise false
 */
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error("Error comparing passwords");
    }
};

module.exports = { hashPassword, comparePassword };


// Test function to verify hashing works
(async () => {
    const testPassword = "ababa";
    const hashed = await hashPassword(testPassword);
    console.log("Hashed Password:", hashed);
})();
