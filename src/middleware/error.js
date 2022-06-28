// require("../utils/errorHandler")

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 400
    err.message = err.message || "Something went wrong."

    res.status(err.statuscode).json({
        success: false,
        message: err.message
        // message: err.stack

    })
}