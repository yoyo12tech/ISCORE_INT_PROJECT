// #Task route solution
const express = require('express');
const userModel = require('../Models/user');
const { default: mongoose } = require('mongoose');
const router = express.Router()

const createUser = async (req, res) => {
  const { name, email, age } = req.body; // Destructure the data from the request body
  try {
     const newUser = new userModel({ name, email, age }); // Create a new user
     await newUser.save(); // Save the user
     res.status(201).json(newUser); // Respond with the created user
  } catch (error) {
     res.status(500).json({ message: error.message }); // Handle any errors
  }
};

const getUsers = async (req, res) => {
   //retrieve all users from the database
      try {
        console.log("here")
        const users = await userModel.find(); // Fetch all users from the database
        res.status(200).json(users); // Respond with the list of users
      } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
      }
    };


const updateUser = async (req, res) => {
   //update a user in the database
      const { id } = req.params; // Get the ID from the request parameters
      const { name, email, age } = req.body; // Destructure the updated data from the request body
    
      try {
        // Find the user by ID and update their information
        const updatedUser = await userModel.findByIdAndUpdate(
          id,
          { name, email, age } // The fields to update
        );
        
    
        // Check if the user was found and updated
        if (!updatedUser) { 
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Respond with the updated user data
        res.status(200).json(updatedUser);
      } catch (error) {
        // Handle any errors that may occur
        res.status(400).json({ message: error.message });
      }
    };
    
   
  
const deleteUser = async (req, res) => {
      const { id } = req.params; // Extract the user ID from the request parameters
      try {
        const deletedUser = await userModel.findByIdAndDelete(id); // Find and delete the user
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' }); // User not found
        }
        res.status(200).json({ message: 'User deleted successfully' }); // Respond with success message
      } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
      }
    };


module.exports = {createUser, getUsers, updateUser, deleteUser};
