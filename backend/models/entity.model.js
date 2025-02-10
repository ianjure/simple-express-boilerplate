// import mongoose to create a model
import mongoose from "mongoose";

// create a schema for the entity
const entitySchema = mongoose.Schema({
    attribute1: {
        type: String,
        required: true
    },
    attribute2: {
        type: String,
        required: true
    }
}, {
    // automatically create fields for when the entity instance was created and updated
    timestamps: true
});

// create a model from the schema
const Entity = mongoose.model("Entity", entitySchema);

// export the model so that it can be used in other files
export default Entity;