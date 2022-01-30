
const notfound = (req, res) => {
    res.status(404).json({msg: 'No Routes Found!!!'})
}

module.exports = notfound