const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    number: Number,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    booking: Boolean,
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;