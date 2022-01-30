const Movies = require('../model/movies')

const getAllMovies = async (req, res) => {
    const {genre, sort} = req.query
    const queryObject = {}
    let selectList = '';
    // console.log(req.query)
    if(genre){
        queryObject.genre = {$regex: genre, $options: 'i'}
    } else {
        selectList = 'name genre'
    }

    let result = Movies.find(queryObject).select(selectList);

    if(sort){
        result = result.sort(sort);
    }

    const movies = await result;

    if(!movies){
        return res.status(404).json({msg:"No data found!!!"})
    }
    
    res.status(200).json({movies, count: movies.length})
}

const getMovie = async (req, res) => {
    const {id} = req.params
    // console.log(id)
    const movies = await Movies.findById({_id: id}).select('name details genre release_date review')
    if(!movies){
        return res.status(404).json({msg:`No data found for ${id}!!!`})
    }
    res.status(200).json({movies})
}

const createMovie = async (req, res) => {
    const movieDetails = req.body;
    // console.log(req.body);
    const movie = await Movies.create(movieDetails);
    res.status(201).json({movie})
}

const updateMovie = async (req, res) => {
    const {id} = req.params
    const movieDetails = req.body;
    const movie = await Movies.findByIdAndUpdate(
        {
            _id: id
        }, 
        movieDetails, 
        {new: true, runValidators: true})
    if(!movie){
        return res.status(404).json({msg: `Can\'t Update as id : ${id} doesn\'t Exist!`})
    }
    res.status(200).json({movie})
}

const deleteMovie = async (req, res) => {
    const {id} = req.params
    const movie = await Movies.findByIdAndDelete({_id: id})
    if(!movie){
        return res.status(404).json({msg: `Can\'t Delete as id : ${id} doesn\'t Exist!`})
    }
    res.status(200).json({msg: `${id} deleted.`})
}

const voteMovie = async (req, res) => {
    const {id} = req.params;
    const movieslist = await Movies.findById({_id: id}).select('upvote downvote');
    if(!movieslist){
        return res.status(404).json({msg: `No data found for id ${id}`})
    }
    let totalUpvotes = movieslist.upvote;
    let totalDownvotes = movieslist.downvote;
    // console.log(`upvotes ${totalUpvotes} downvotes ${totalDownvotes}`);
    const {upvote, downvote} = req.body
    let updateVote = '';
    if(upvote === true){
        updateVote = {
            "upvote" : totalUpvotes + 1
        }
    } else if(downvote === true){
        updateVote = {
            "downvote" : totalDownvotes + 1
        }
    }
    // console.log(key)
    const movies = await Movies.findByIdAndUpdate(
        {
            _id: id
        },
        updateVote,
        {new: true, runValidators: true})
    res.status(200).json({movies});
}


module.exports = { 
    getAllMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    voteMovie
}