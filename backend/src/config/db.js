/*

Method to connect and deconnect to db 

*/
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Wild-Play`;

// uncomment to check the uri 
// console.log(url); 

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return; // Prevent multiple connections
    try {
        await mongoose.connect(url);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:\n', error);
        process.exit(1);
    }
};

const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('✅ MongoDB Connection Closed');
    } catch (error) {
        console.error('❌ Error Closing MongoDB Connection:\n', error);
    }
};

module.exports = { connectDB, closeDB };
