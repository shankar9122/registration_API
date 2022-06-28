const mongoose = require('mongoose');

const loginSession = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: [true, "UserId not valid"]
    },
    mobile: {
        type: Number,
        required: [true, "Please Enter your Number"]
    },
    deleteData: Date,
    status: {
        type: Boolean,
        default: true

    }

});

loginSession.index({ deleteData: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("loginSessions", loginSession);