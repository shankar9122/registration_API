
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Name can not exceed 30 characters"],
        minLength: [3, "Name should have more than 3 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    mobile: {
        type: Number,
        unique: true,
        required: [true, "Please Enter your mobile Number"]
    },
    gender: {
        type: String,
        required: true
    },
    address_1: {
        type: String,
        required: true
    },
    address_2: {
        type: String,
        required: true
    },
    address_3: String,
    landmark: String,
    pinCode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});


userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    })
};



module.exports = mongoose.model("users", userSchema);