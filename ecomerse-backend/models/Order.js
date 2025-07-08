const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: String,
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String
    },
    total: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
