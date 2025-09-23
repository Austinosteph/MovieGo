const axios = require('axios');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

exports.initializePayment = async (req, res) => {
	const { bookingId, email, amount, userId } = req.body;

	try {
		const response = await axios.post(
			'https://api.paystack.co/transaction/initialize',
			{
				email,
				amount: amount * 100, // kobo
				callback_url: 'http://localhost:3000/api/payments/verify',
				metadata: { bookingId, userId },
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const { reference, authorization_url } = response.data.data;

		const payment = new Payment({
			booking: bookingId,
			user: userId,
			reference,
			amount,
			status: 'pending',
		});
		await payment.save();

		res.json({ authorizationUrl: authorization_url, reference });
	} catch (error) {
		console.error(error.response?.data || error.message);
		res.status(500).json({ error: 'Payment initialization failed' });
	}
};

exports.verifyPayment = async (req, res) => {
	const { reference, bookingId } = req.body;

	if (!reference) {
		return res.status(400).json({ error: 'Reference is required' });
	}

	try {
		// Call Paystack verify endpoint
		const response = await axios.get(
			`https://api.paystack.co/transaction/verify/${reference}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
				},
			}
		);

		const data = response.data.data;

		if (data.status === 'success') {
			// Update Payment record
			const payment = await Payment.findOneAndUpdate(
				{ reference },
				{ status: 'success', paidAt: new Date(), gatewayResponse: data },
				{ new: true }
			);

			// Update Booking as confirmed
			await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' });

			return res.json({ message: 'Payment verified', payment });
		} else {
			await Payment.findOneAndUpdate(
				{ reference },
				{ status: 'failed', gatewayResponse: data }
			);
			return res.status(400).json({ error: 'Payment failed' });
		}
	} catch (err) {
		console.error('Verification error:', err.message);
		return res.status(500).json({ error: 'Verification failed' });
	}
};
