import express from 'express'
import { addMovie, deleteMovie, getAllMovies, updateMovie } from '../controllers/moviesController.js'

const moviesRouter = express.Router()


moviesRouter.post('/add', addMovie)
moviesRouter.get('/get-all', getAllMovies)
moviesRouter.put('/update/:movieId', updateMovie)
moviesRouter.delete('/delete/:movieId', deleteMovie)


export default moviesRouter