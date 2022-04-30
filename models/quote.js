const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    gallons: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalDue: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
<<<<<<< HEAD
        ref: 'User'
=======
        ref: ''
>>>>>>> 5d573747b35512a272ccedc9598e2078f4750dd0
    }
})

module.exports = mongoose.model('Quote', quoteSchema)