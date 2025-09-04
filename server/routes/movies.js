const express = require('express');
const router = express.Router();

const {
	createMovie,
	deleteMovie,
	getAllMovie,
	updateMovie,
	getMovie,
} = require('../controllers/movies');
const { UploadMovie } = require('../controllers/upload');

router.route('/uploads').post(UploadMovie);
router.route('/').post(createMovie).get(getAllMovie);
router.route('/:id').get(getMovie).delete(deleteMovie).patch(updateMovie);

module.exports = router;
