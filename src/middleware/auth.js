const jwt=require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncError");
// require("dotenv/config")
const User = require("../modals/userModal");


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    let { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    token = token.split(" ")[1];

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
 
    req.user = await User.findById(decodedData.id);

    next()

})