const mongoose = require('mongoose')
const Quote = require('./quote')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    },
    primaryAddress: {
        type: String
    },
    secondaryAddress: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    shippingAddress: {
        type: String
    }
})

userSchema.pre('remove', function(next) {
    Quote.find({ user: this.id }, (err, quotes) => {
        if (err) {
            next(err)
        } else if (quotes.length > 0) {
            next(new Error('This user still has orders'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('User', userSchema)