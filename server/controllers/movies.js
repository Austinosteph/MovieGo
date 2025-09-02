const getAllMovie = async (req, res) => {
	res.send('All  movie');
};
const createMovie = async (req, res) => {
	res.send('create movie');
};
const getMovie = async (req, res) => {
	res.send('get movie by id');
};
const updateMove = async (req, res) => {
	res.send('updtae movie');
};
const deleteMovie = async (req, res) => {
	res.send('delete movie');
};
module.exports = {
	getAllMovie,
	createMovie,
	getMovie,
	updateMove,
	deleteMovie,
};
