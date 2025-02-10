// import mongoose to connect to the database
import mongoose from "mongoose";

// async function to connect to the database
export const connectDB = async () => {
    try {
        // connect to the MongoDB database using the URI from the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // 1 means failure, 0 means success
        process.exit(1);
    }
}