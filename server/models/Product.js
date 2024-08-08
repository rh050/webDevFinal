const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    productName: String,
    price: Number,
    imageName: String,
});

module.exports = mongoose.model('Product', productSchema);
