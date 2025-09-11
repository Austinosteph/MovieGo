const Movie = require('../models/Movies');
const { StatusCodes } = require('http-status-codes');

const getAllMovie = async (req, res) => {
	const movies = await Movie.find({});
	res.status(StatusCodes.OK).json({ movies, count: movies.length });
};
const createMovie = async (req, res) => {
	const movie = await Movie.create(req.body);
	res.status(StatusCodes.CREATED).json(movie);
};
const getMovie = async (req, res) => {
	const { id } = req.params;
	const movie = await Movie.findById(id);
	if (!movie) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: 'Movie not found' });
	}
	res.status(StatusCodes.OK).json(movie);
};
const updateMovie = async (req, res) => {
	res.send('updtae movie');
};
const deleteMovie = async (req, res) => {
	res.send('delete movie');
};
module.exports = {
	getAllMovie,
	createMovie,
	getMovie,
	updateMovie,
	deleteMovie,
};
