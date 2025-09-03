const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ error: 'Please provide name, email, and password' });
	}

	try {
		const user = await User.create({ name, email, password });
		res.status(201).json({ user });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(400).json({ error: 'Email already in use' });
		}
		res.status(400).json({ error: error.message });
	}
};
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ error: 'Email and password are required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ error: 'Invalid credentials' });
		}

		const isPasswordCorrect = await user.comparePassword(password);
		if (!isPasswordCorrect) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ error: 'Invalid credentials' });
		}

		const token = user.createJWT();
		res.status(StatusCodes.OK).json({
			user: { name: user.name },
			token,
		});
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: 'Something went wrong, please try again.' });
	}
};

module.exports = { register, login };
