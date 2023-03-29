
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const validator = require("validator");
const bcrypt = require("bcrypt")

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
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    address_2: String,
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

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    })
};



module.exports = mongoose.model("users", userSchema);