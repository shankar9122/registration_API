const jwt=require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
// require("dotenv/config")
const User = require("../modals/userModal");
const ErrorHandler = require("../utils/errorHandler");


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    let { token } = req.headers;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
 
    req.user = await User.findById(decodedData.id);

    next()

})