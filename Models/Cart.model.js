const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    products: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product',
        },
    ],
    mainPrice: {
        type: Number,
        default: 0
    },
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart