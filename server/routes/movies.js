const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticaton');
const {
	createMovie,
	deleteMovie,
	getAllMovie,
	updateMovie,
	getMovie,
} = require('../controllers/movies');
const { UploadMovie } = require('../controllers/upload');

router.route('/').get(getAllMovie);

router.use(authenticateUser);
router.route('/uploads').post(UploadMovie);
router.route('/').post(createMovie);
router.route('/:id').get(getMovie).delete(deleteMovie).patch(updateMovie);

module.exports = router;
