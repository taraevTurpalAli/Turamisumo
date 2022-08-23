const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    surname: String,
    phone: String,
    login: String,
    password: String,
    age: Number,
    cash: {
        type: Number,
        default: 0
    },
    vip: Boolean,
    isActive: {
        type: Boolean,
        default: false
    },
    startData: String,
    endData: String,
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;