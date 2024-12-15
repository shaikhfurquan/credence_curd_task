
import { handleCatchError } from "../helpers/handleErors.js"
import logger from "../helpers/logger.js"
import MoviesModel from "../models/moviesModel.js"


export const addMovie = async (req, res) => {
    try {
        const { name, img, summary } = req.body;
        const addMovie = await MoviesModel.create({ name, img, summary });

        // Success log
        logger.info(`Movie added successfully: ${name}`);
        res.status(201).json({ success: true, response: addMovie });
    } catch (error) {
        // Error log
        logger.error(`Error while adding the movie: ${error.message}`);
        handleCatchError(res, "Error while adding the movie", error);
    }
};


export const getAllMovies = async (req, res) => {
    try {

        const getAllMovies = await MoviesModel.find()
        logger.info('Fetched all movies');
        res.status(200).json({ success: true, count: getAllMovies.length, response: getAllMovies })
    } catch (error) {
        logger.error(`Error while fetching all the movies: ${error.message}`);
        handleCatchError(res, "Error while getting the movies", error)
    }
}


export const updateMovie = async (req, res) => {
    try {
        const { movieId } = req.params
        const updatedMovie = await MoviesModel.findByIdAndUpdate(movieId, req.body, { new: true })
        logger.info(`Movie updated successfully`)
        res.status(200).json({ success: true, response: updatedMovie })
    } catch (error) {
        logger.error(`Error while updating the movie: ${error.message}`);
        handleCatchError(res, "Error while updating the movie", error)
    }
}


export const deleteMovie = async (req, res) => {
    try {
        const { movieId } = req.params
        await MoviesModel.findByIdAndDelete(movieId)
        logger.info(`Movie deleted successfully`)
        res.status(200).json({ success: true, response: "Movie deleted successfully" })
    } catch (error) {
        logger.error(`Error while deleting the movie: ${error.message}`);
        handleCatchError(res, "Error while deleting the movie", error)
    }
}