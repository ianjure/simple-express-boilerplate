// import mongoose to interact with the database
import mongoose from "mongoose";

// import the Entity model from the models folder
import Entity from "../models/entity.model.js";

// Route: GET /api/entity - Get all Entity Instance
export const getEntity = async (req, res) => {
    try {
        // find all entity instance in the database
        // if you pass {} it will return all entity instance
        // sort by createdAt in descending order
        const entity = await Entity.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: entity });
    } catch (error) {
        console.error("Error in getting entity instance: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Route: POST /api/entity - Create an Entity Instance
export const createEntity = async (req, res) => {
    // req.body is the data that is sent with the POST request by the user
    const entity = req.body;

    // check if any of the fields are missing
    if(!entity.attribute1 || !entity.attribute2) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    // create a new entity instance with the data sent by the user
    const newEntity = new Entity(entity);

    try {
        // save the entity instance to the database
        await newEntity.save();
        res.status(201).json({ success: true, data: newEntity });
    } catch (error) {
        console.error("Error in creating entity instance: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Route: PUT /api/entity/:id - Update an Entity Instance
export const updateEntity = async (req, res) => {
    // :id is a URL parameter (dynamic and can be any value)
    // get the id from the URL - {what you passed in the URL}
    const {id} = req.params;
    // get the updated data from the body of the request
    const entity = req.body;

    // check if id does not exist in the database
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Entity instance not found." });
    }

    try {
        // find the entity instance by id and update it with the new data
        const updatedEntity = await Entity.findByIdAndUpdate(id, entity, { new: true });
        res.status(200).json({ success: true, data: updatedEntity });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Route: DELETE /api/entity/:id - Delete an Entity Instance
export const deleteEntity = async (req, res) => {
    // :id is a URL parameter (dynamic and can be any value)
    // get the id from the URL - {what you passed in the URL}
    const {id} = req.params;

    // check if id does not exist in the database
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Entity instance not found." });
    }

    try {
        // find the entity instance by id and delete it
        await Entity.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Entity instance deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};