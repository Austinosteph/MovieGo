const { StatusCodes } = require('http-status-codes');
const path = require('path');

const UploadMovie = async (req, res) => {
	try {
		if (!req.files || !req.files.image) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				error: 'No image file uploaded',
			});
		}

		const uploadposter = req.files.image;

		const posterpath = path.join(__dirname, '../uploads/', uploadposter.name);

		// Move the uploaded file
		await uploadposter.mv(posterpath);

		return res.status(StatusCodes.OK).json({
			image: { src: `/uploads/${uploadposter.name}` },
		});
	} catch (error) {
		console.error(error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			error: 'Upload failed',
			details: error.message,
		});
	}
};

module.exports = {
	UploadMovie,
};
