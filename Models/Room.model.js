const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    number: Number,
    roomTypeId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'RoomType'
    },
    booking: Boolean,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;