// import mongoose to create a model
import mongoose from "mongoose";

// create a schema for the users
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    // automatically create fields for when the user instance was created and updated
    timestamps: true
});

// create a model from the schema
const User = mongoose.model("User", userSchema);

// export the model so that it can be used in other files
export default User;