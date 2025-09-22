const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static('./uploads'));

// routers
const authRouter = require('./routes/auth');
const movieRouter = require('./routes/movies');
const bookingRouter = require('./routes/bookings');
const paymentRouter = require('./routes/payment');

//database & authentication
const connectDB = require('./db/Connect');
const authenticateUser = require('./middleware/authenticaton');

app.get('/', (req, res) => {
	res.send('<h1>Movie API</h1><a href="/api/v1/movies">movie route</a>');
});

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movie', authenticateUser, movieRouter);
app.use('/api/v1/booking', authenticateUser, bookingRouter);
app.use('/api/v1/payment', paymentRouter);

//start server with database
const port = process.env.PORT || 3000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server is listening port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};
start();
