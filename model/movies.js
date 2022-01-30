const mongoose = require('mongoose')

const MoviesSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 2
    },
    details: {
        type: String,
        required: [true, 'Details is required'],
        minlength: 2
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minlength: 2
    },
    release_date: {
        type: Date,
        default: Date.now()
    },
    reviews: {
        type: String,
        required: [true, 'Review is required'],
        minlength: 2
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Movies_List', MoviesSchema)