const express = require('express')
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');

app.use(express.json());

const movies = require('./routes/movies');
const topmovies = require('./routes/topmovies');
const notfound = require('./middleware/NotFoundError')

app.use('/api/v1/movies', movies);
app.use('/api/v1/topmovies', topmovies);
app.use(notfound);

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URI;

const startServer = async () => {
    try {
        const resp = await connectDB(URL)
        // console.log(resp)
        app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServer()