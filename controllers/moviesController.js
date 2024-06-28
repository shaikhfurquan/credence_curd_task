
import { handleCatchError } from "../helpers/handleErors.js"
import MoviesModel from "../models/moviesModel.js"


export const addMovie = async (req, res) => {
    try {
        const { name, img, summary } = req.body
        const addMovie = await MoviesModel.create({name , img, summary})
        res.status(201).json({ success: true, response: addMovie })

    } catch (error) {
        handleCatchError(res, "Error while adding the movie", error)
    }
}


export const getAllMovies = async (req, res) => {
    try {

        const getAllMovies = await MoviesModel.find()
        res.status(200).json({ success: true, count: getAllMovies.length, response: getAllMovies })
    } catch (error) {
        handleCatchError(res, "Error while getting the movies", error)
    }
}


export const updateMovie = async (req, res) => {
    try {
        const { movieId } = req.params
        const updatedMovie = await MoviesModel.findByIdAndUpdate(movieId, req.body, { new: true })
        res.status(200).json({ success: true, response: updatedMovie })
    } catch (error) {
        handleCatchError(res, "Error while updating the movie", error)
    }
}


export const deleteMovie = async (req, res) => {
    try {
        const { movieId } = req.params
        await MoviesModel.findByIdAndDelete(movieId)
        res.status(200).json({ success: true, response: "Movie deleted successfully" })
    } catch (error) {
        handleCatchError(res, "Error while deleting the movie", error)
    }
}