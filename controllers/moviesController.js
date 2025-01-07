import { handleCatchError } from "../helpers/handleErors.js";
import logger from "../helpers/logger.js";
import MoviesModel from "../models/moviesModel.js";
import redisClient from "../config/redisClient.js"; // Import the Redis client

// Add a new movie
export const addMovie = async (req, res) => {
    try {
        const { name, img, summary } = req.body;

        // Create a new movie document in MongoDB
        const addMovie = await MoviesModel.create({ name, img, summary });

        // Clear the Redis cache for all movies after adding a new movie
        await redisClient.del('allMovies');

        // Success log
        logger.info(`Movie added successfully: ${name}`);
        res.status(201).json({ success: true, response: addMovie });
    } catch (error) {
        // Error log
        logger.error(`Error while adding the movie: ${error.message}`);
        handleCatchError(res, "Error while adding the movie", error);
    }
};

// Get all movies (with caching)
export const getAllMovies = async (req, res) => {
    try {
        const cacheKey = 'allMovies';

        // Check if the data exists in Redis cache
        const cachedMovies = await redisClient.get(cacheKey);

        if (cachedMovies) {
            // If the movies data exists in the cache, return it
            console.log('Data fetched from Redis cache');
            logger.info('Fetched all movies from Redis cache');
            return res.status(200).json({ success: true, count: JSON.parse(cachedMovies).length, response: JSON.parse(cachedMovies) });
        }

        // If not in cache, fetch movies from MongoDB
        const getAllMovies = await MoviesModel.find();

        // Store the fetched movies in Redis cache for future use
        await redisClient.set(cacheKey, JSON.stringify(getAllMovies), 'EX', 3600); // Cache for 1 hour

        console.log('Data fetched from MongoDB and cached');
        logger.info('Fetched all movies from MongoDB and cached');
        res.status(200).json({ success: true, count: getAllMovies.length, response: getAllMovies });
    } catch (error) {
        logger.error(`Error while fetching all the movies: ${error.message}`);
        handleCatchError(res, "Error while getting the movies", error);
    }
};

// Update a movie
export const updateMovie = async (req, res) => {
    try {
        const { movieId } = req.params;

        // Update movie in MongoDB by ID
        const updatedMovie = await MoviesModel.findByIdAndUpdate(movieId, req.body, { new: true });

        // If the movie wasn't found
        if (!updatedMovie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        // Clear the Redis cache for all movies after updating
        await redisClient.del('allMovies');

        // Success log
        logger.info(`Movie updated successfully`);
        res.status(200).json({ success: true, response: updatedMovie });
    } catch (error) {
        logger.error(`Error while updating the movie: ${error.message}`);
        handleCatchError(res, "Error while updating the movie", error);
    }
};

// Delete a movie
export const deleteMovie = async (req, res) => {
    try {
        const { movieId } = req.params;

        // Delete the movie from MongoDB by ID
        const deletedMovie = await MoviesModel.findByIdAndDelete(movieId);

        // If the movie wasn't found
        if (!deletedMovie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        // Clear the Redis cache for all movies after deleting
        await redisClient.del('allMovies');

        // Success log
        logger.info(`Movie deleted successfully`);
        res.status(200).json({ success: true, response: "Movie deleted successfully" });
    } catch (error) {
        logger.error(`Error while deleting the movie: ${error.message}`);
        handleCatchError(res, "Error while deleting the movie", error);
    }
};
