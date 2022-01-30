const express = require('express')
const router = express.Router();
const { 
    getAllMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    voteMovie,
} = require('../controllers/movies')

router.route('/').get(getAllMovies).post(createMovie);
router.route('/:id').get(getMovie).put(updateMovie).delete(deleteMovie).patch(voteMovie);


module.exports = router;