const express = require('express');
const router = express.Router();

const {
	createBooking,
	deleteBooking,
	getUserBookings,
	getBooking,
} = require('../controllers/bookings');

router.route('/').post(createBooking).get(getUserBookings);
router.route('/:id').get(getBooking).delete(deleteBooking);

module.exports = router;
