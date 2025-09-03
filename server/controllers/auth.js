const User = require('../models/User');

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

module.exports = { register };
