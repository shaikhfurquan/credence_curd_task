
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`)
        console.log(`connected to DB successully ==> ${process.env.DB_URL}${process.env.DB_NAME}`);
    } catch (error) {
        console.log(`Error while connecting to Mongo DB: \n ${error.message}`);
    }
}

export default connectDB    