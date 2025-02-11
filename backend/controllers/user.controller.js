// import mongoose to interact with the database
import mongoose from "mongoose";
// import bcrypt for password encryption
import bcrypt from "bcrypt";

// import the User model from the models folder
import User from "../models/user.model.js";

// Route: GET / - Show the Login Page
export const loginPage = (req, res) => {
    res.render("login");
};

// Route: GET /register - Show the Register Page
export const registerPage = (req, res) => {
    res.render("register");
};

// Route: POST /register - Register the User
export const createUser = async (req, res) => {
    // req.body is the data that is sent with the POST request by the user
    const user = req.body;
    console.log(user);
    // check if any of the fields are missing
    if(!user.username || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    // check if the username already exists in the database
    const existingUser = await User.findOne({ username: user.username });

    if (existingUser) {
        res.status(500).json({ success: false, message: "User already exists. Please choose a different username." });
    } else {
        // number of salt rounds for bcrypt
        const saltRounds = 10;
        // hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        
        // replace the original password with the hashed one
        user.password = hashedPassword;

        // create a new user instance
        const newUser = new User(user);

        try {
            // save the user to the database
            await newUser.save();
            res.status(201).json({ success: true, data: newUser });
        } catch (error) {
            console.error("Error in creating the user: ", error.message);
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    }
};

// Route: POST /login - Login the User
export const loginUser = async (req, res) => {
    // req.body is the data that is sent with the POST request by the user
    const user = req.body;

    // check if any of the fields are missing
    if(!user.username || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    try {
        // check if user exists in the database
        const existingUser = await User.findOne({ username: user.username });

        if (!existingUser) {
            res.status(500).json({ success: false, message: "User does not exists." });
        }

        // compare the plaintext password sent by the user with the hashed password from the database
        const isPasswordMatch = await bcrypt.compare(user.password, existingUser.password);

        if (!isPasswordMatch) {
            res.status(500).json({ success: false, message: "You entered the wrong password." });
        }
        else {
            // redirect user to homepage if all credentials are correct
            res.render("home");
        }
    } catch (error) {
        console.error("Authentication error: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};