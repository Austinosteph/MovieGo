const Booking = require('../models/Booking');
const { StatusCodes } = require('http-status-codes');

// Create a new booking
const createBooking = async (req, res) => {
	const {
		movieId,
		title,
		theater,
		dateToWatch,
		timeToWatch,
		seats,
		totalPrice,
	} = req.body;

	const booking = await Booking.create({
		user: req.user.userId,
		movie: movieId,
		title,
		theater,
		dateToWatch,
		timeToWatch,
		seats,
		totalPrice,
		status: 'confirmed',
	});

	res.status(StatusCodes.CREATED).json({
		success: true,
		message: 'Booking confirmed',
		bookingId: booking._id,
	});
};

const getUserBookings = async (req, res) => {
	const bookings = await Booking.find({ user: req.user.userId });
	res.status(StatusCodes.OK).json({ success: true, bookings });
};

// Get a single booking by ID
const getBooking = async (req, res) => {
	const { id } = req.params;
	const booking = await Booking.findById(id);
	if (!booking) {
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: 'Booking not found' });
	}
	res.status(StatusCodes.OK).json(booking);
};

const deleteBooking = async (req, res) => {
	res.send('Delete booking');
};

module.exports = {
	createBooking,
	getUserBookings,
	getBooking,
	deleteBooking,
};
