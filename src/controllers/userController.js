const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../modals/userModal");
const sendToken = require("../utils/jwtToken");
const OTPModal = require("../modals/otpModal")
const LoginSession = require("../modals/loginSession");
const sendMail = require("../utils/sendMail")


exports.userRegister = catchAsyncError(async (req, res, next) => {

    const { name, email, gender, mobile, address_1,password, address_2, address_3, landmark, pinCode, city, state } = req.body;

    const user = await User.findOne({ mobile: mobile });

    if (user) {
        return next(new ErrorHandler("User is already exist.", 400))
    }

    let result = await User.create({
        name,
        email,
        gender,
        mobile,
        address_1,
        address_2,
        address_3,
        landmark,
        pinCode,
        city,
        state,
        password
    });

    sendToken(result, 200, res, "Registered Successfully")

});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
      }

    const user = await User.findOne({ mobile: mobile }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Please Create your account first.", 400))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    await LoginSession.create({
        userId: user._id,
        mobile: user.mobile,
        deleteData: new Date(Date.now() + 5 * 60 * 1000),
    });
    

    sendToken(user, 200, res, "Registered Successfully")

});


exports.verifyOTP = catchAsyncError(async (req, res, next) => {
    const { otp, mobile } = req.body;

    if (!otp || !mobile) {
        return next(new ErrorHandler("Please fill all fields.", 400))
    }

    const user = await User.findOne({ mobile: mobile });
    if (!user) {
        return next(new ErrorHandler("User not found.", 400))
    }

    let loginSession = await LoginSession.findOne({ mobile: mobile });

    const otpHolder = await OTPModal.find({ mobile: mobile });

    if (otpHolder.length === 0) {
        return next(new ErrorHandler("You use an Expired OTP!", 400))
    }
    const rightOtpFind = otpHolder[otpHolder.length - 1];

    if (rightOtpFind.mobile == mobile && rightOtpFind.otp == otp) {
        loginSession.deleteData = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            await loginSession.save();

        await OTPModal.deleteMany({
            mobile: rightOtpFind.mobile
        });

        return sendToken(user, 200, res);
    } else {
        next(new ErrorHandler("Please Enter valid OTP.", 400))
    }
});


exports.getUserProfile = catchAsyncError(async (req, res, next) => {

    res.status(200).json({
        success: true,
        result: req.user
    });
})



exports.logoutUser = catchAsyncError(async (req, res, next) => {
    let loginSession = await LoginSession.findOne({ mobile: req.user.mobile });

    loginSession.deleteData = new Date(Date.now());

    await loginSession.save()

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
    }).json({ success: true, message: "Logged out successfully" });
})
