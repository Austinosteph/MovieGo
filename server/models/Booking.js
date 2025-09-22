const { default: mongoose } = require('mongoose');

const BookingSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
		movie: { type: mongoose.Types.ObjectId, ref: 'Movie', required: true },
		title: { type: String, required: true },
		theater: { type: String, required: true },
		dateToWatch: { type: String, required: true },
		timeToWatch: { type: String, required: true },
		paymentstatus: {
			type: String,
			enum: ['pending', 'success', 'failed'],
			default: 'pending',
		},
		seats: {
			type: [{ type: String, required: true }],
			validate: [(arr) => arr.length > 0, 'Please select at least one seat'],
		},
		totalPrice: { type: Number, required: true },
		status: {
			type: String,
			enum: ['pending', 'confirmed', 'cancelled'],
			default: 'pending',
		},
		bookedAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);
