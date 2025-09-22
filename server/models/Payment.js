const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
	{
		booking: {
			type: mongoose.Types.ObjectId,
			ref: 'Booking',
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		reference: { type: String, required: true, unique: true },
		amount: { type: Number, required: true }, // in naira
		status: {
			type: String,
			enum: ['pending', 'success', 'failed'],
			default: 'pending',
		},
		gatewayResponse: { type: Object },
		paidAt: { type: Date },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
