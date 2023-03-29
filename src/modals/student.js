const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
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
        required: [true, "Please Enter your Valid mobile Number"],
        length:10
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
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
    },
    board:{
        type:Array,
        required: [true, "Please Select the board"],
        minlength:1
    },
    dob:{
        type:Date,
        required:[true, "Please fill the DOB"]
    },
    standard:{
        type:Number,
        required:[true, "Please Select the standard"]
    },
    profilePic:String,
    updateBy:String,
    updatedDate:Date
});


module.exports = mongoose.model("students", studentSchema)