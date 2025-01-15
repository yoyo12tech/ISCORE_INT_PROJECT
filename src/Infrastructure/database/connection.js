// connection.js
const mongoose = require('mongoose');
const MongoURI = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(MongoURI);
    console.log("MongoDB is now connected!");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
