import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Movie name is required"]
    },
    img: {
        type: String,
        required: [true, "Movie image is required"]
    },
    summary: {
        type: String,
        required: [true, "Movie summary is required"]
    }
}, { timestamps: true });


const MoviesModel = mongoose.model("Movie" , moviesSchema)

export default MoviesModel