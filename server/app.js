const express = require('express');
require('dotenv').config();

const app = express();

// routers
// const authRouter = require('./routes/auth');
const movieRouter = require('./routes/movies');

app.get('/', (req, res) => {
	res.send('<h1>Movie API</h1><a href="/api/v1/movies">movie route</a>');
});

// routes
// app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movies', movieRouter);

const port = process.env.PORT || 3000;
const start = async () => {
	try {
		app.listen(port, () => console.log(`Server is listening port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};
start();
