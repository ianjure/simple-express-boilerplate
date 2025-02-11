// import express to use its functionality
import express from "express";
// import the dotenv package to use environment variables from .env file
import dotenv from "dotenv";
// import path for deployment
import path from "path";

// import the named connectDB function from the config folder
import { connectDB } from "./config/db.js";
// import the user routes from the routes folder
import userRoutes from "./routes/user.route.js";
// import the entity routes from the routes folder
import entityRoutes from "./routes/entity.route.js";

// allows us to use environment variables in the .env file
dotenv.config();

// create an instance of express server
const app = express();
// set the port as environment variable PORT or 5000
const PORT = process.env.PORT || 5000;
// directory path needed for production
const __dirname = path.resolve();

//use EJS as the view engine
app.set("view engine", "ejs");
// set the views directory
app.set("views", path.join(__dirname, "frontend", "views"));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "frontend", "public")));
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// allows us to accept JSON data in the body of the request (req.body)
app.use(express.json());
// use the entity routes with the /api/entity prefix
app.use("/api/entity", entityRoutes);
// use the user routes with the /api/entity prefix
app.use("/", userRoutes);

// code snippet for production deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

// start the server on specified port
app.listen(PORT, () => {
    // connect to the database
    connectDB();
    console.log("Server is running on http://localhost:" + PORT);
});