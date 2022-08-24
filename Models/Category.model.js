const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    productId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;