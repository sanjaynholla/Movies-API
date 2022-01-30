
const customErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({msg: "Something went wrong!!!"})
}

module.exports = customErrorHandler

