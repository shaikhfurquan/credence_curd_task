import mongoose from "mongoose"
import logger from "../helpers/logger.js"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`);
        logger.info(`Connected to DB successfully ==> ${process.env.DB_URL}${process.env.DB_NAME}`);
        console.log(`Connected to DB successfully ==> ${process.env.DB_URL}${process.env.DB_NAME}`);
    
    } catch (error) {
        logger.error(`Error while connecting to MongoDB: ${error.message}`);
        console.log(`Error while connecting to MongoDB: \n${error.message}`);
        throw error; // Rethrow the error to handle it outside the function
    }
};

export default connectDB;