const express = require("express");

const { userRegister, loginUser, verifyOTP, logoutUser, getUserProfile } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");


const userRoute = express.Router();


userRoute.route("/register").post(userRegister);

userRoute.route("/login").post(loginUser);

userRoute.route("/verify").post(verifyOTP);

userRoute.route("/logout").post(isAuthenticatedUser, logoutUser);

userRoute.route("/getProfile").get(isAuthenticatedUser, getUserProfile)





module.exports = userRoute;