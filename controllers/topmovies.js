const Movies = require('../model/movies')

const getTopMovies = async (req, res) => {
    const movies = await Movies.find({}).sort({upvote: -1}).limit(10)
    if(!movies){
        return res.status(404).json({msg:"No data found!!!"})
    }
    res.status(200).json({movies, count: movies.length})
}

module.exports = { 
    getTopMovies
}