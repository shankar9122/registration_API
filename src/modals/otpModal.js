const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    mobile:{
        type:Number,
        required:true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    },
    userId: {
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required: true
    }

    // After 5 minutes it deleted automatically from the database
}, { timestamps: true })

module.exports = mongoose.model('otps', otpSchema);