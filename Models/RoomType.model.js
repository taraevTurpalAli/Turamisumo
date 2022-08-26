const mongoose = require('mongoose');

const roomTypeSchema = mongoose.Schema({
        name: String,
        images: [
                { type: String }
        ],
        price: Number
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

module.exports = RoomType;