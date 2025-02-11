// import express to use its Router class
import express from "express";

// import the controllers from the controller folder
import { loginUser, createUser } from "../controllers/user.controller.js";

// create a new router
const router = express.Router();

// ENTITY: define the routes and the controllers to handle the requests
router.get("/", loginPage);
router.get("/register", registerPage);
router.post("/login", loginUser);
router.post("/register", createUser);

// export using default so we can import it with any name in other files
export default router;