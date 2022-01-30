const express = require('express')
const router = express.Router();
const { 
    getTopMovies
} = require('../controllers/topmovies')

router.route('/').get(getTopMovies)

module.exports = router