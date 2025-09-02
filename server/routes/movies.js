const express = require('express');
const router = express.Router();

const {
	createMovie,
	deleteMovie,
	getAllMovie,
	updateMove,
	getMovie,
} = require('../controllers/movies');

router.route('/').post(createMovie).get(getAllMovie);
router.route('/:id').get(getMovie).delete(deleteMovie).patch(updateMove);

module.exports = router;
