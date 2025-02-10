// import express to use its Router class
import express from "express";

// import the controllers from the controller folder
import { getEntity, createEntity,
         updateEntity, deleteEntity } from "../controllers/entity.controller.js";

// create a new router
const router = express.Router();

// ENTITY: define the routes and the controllers to handle the requests
router.get("/", getEntity);
router.post("/", createEntity);
router.put("/:id", updateEntity);
router.delete("/:id", deleteEntity);

// export using default so we can import it with any name in other files
export default router;