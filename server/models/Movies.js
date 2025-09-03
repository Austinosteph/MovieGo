const { default: mongoose } = require('mongoose');

const MovieSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		posturl: { type: String, required: true },
		duration: { type: Number, required: true, min: 1 },
		availableSeats: [{ type: String, required: true }],
		dateTowatch: { type: Date, required: true },
		timeTowatch: { type: String, required: true },
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Movie', MovieSchema);
